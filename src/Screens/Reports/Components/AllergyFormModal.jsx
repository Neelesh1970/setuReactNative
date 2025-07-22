import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton, CustomInputBox } from "../../SOS/Components";
import axios from "axios";
import { API_URI_PHR, API_URL_AUTH } from "@env";
import { getItem } from "../../../Utils/utils";
import ImagePicker from "react-native-image-crop-picker";
import ToastService from "../../../Utils/ToastService";
import { Buffer } from "buffer";
import CustomDropdown from "./CustomDropdown";

const AllergyFormModal = ({ showModal, setShowModal, fetchData, editItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    allergen: "",
    severity: "",
    reaction: "",
    iconURL: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const severityOptions = ["High", "Medium", "Low"];

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        allergen: editItem.allergen || "",
        severity: editItem.severity || "",
        reaction: editItem.reaction || "",
        iconURL: editItem.iconURL || "",
      });
      if (editItem.iconURL) {
        setSelectedImage({ uri: editItem.iconURL });
      }
    } else {
      setFormData({
        name: "",
        allergen: "",
        severity: "",
        reaction: "",
        iconURL: "",
      });
      setSelectedImage(null);
    }
  }, [editItem]);

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData({
      name: "",
      allergen: "",
      severity: "",
      reaction: "",
      iconURL: "",
    });
    setSelectedImage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Allergy name is required";
    if (!formData.allergen.trim()) newErrors.allergen = "Allergen is required";
    if (!formData.severity) newErrors.severity = "Severity is required";
    if (!formData.reaction.trim()) newErrors.reaction = "Reaction is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageSelection = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
      });

      if (image) {
        setSelectedImage({
          uri: image.path,
          mime: image.mime,
          data: await getBase64FromUri(image.path),
        });
      }
    } catch (err) {
      if (err.message !== "User cancelled image selection") {
        console.error("Error picking image:", err);
        ToastService.showError("Error", "Failed to select image");
      }
    }
  };

  const getBase64FromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Get only the base64 part
      };
      reader.readAsDataURL(blob);
    });
  };

  const uploadImage = async () => {
    if (!selectedImage || selectedImage.uri === editItem?.iconURL) {
      return editItem?.iconURL || "";
    }

    try {
      setImageUploading(true);
      const { mime, data } = selectedImage;

      const getUrl = `${API_URL_AUTH}/jobs/api/v1/get-upload-url?fileName=${Date.now()}.jpg&fileType=${mime}`;
      const response = await axios.get(getUrl);
      const { uploadURL, downloadURL } = response.data;

      const binaryData = Buffer.from(data, "base64");

      const uploadResponse = await axios.put(uploadURL, binaryData, {
        headers: {
          "Content-Type": mime,
        },
      });

      if (uploadResponse.status === 200) {
        return downloadURL;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      // Upload image only when submitting
      let iconURL = "";
      if (selectedImage) {
        iconURL = await uploadImage();
      }

      const payload = {
        ...formData,
        iconURL,
        userId,
      };

      if (editItem) {
        await axios.put(
          `${API_URI_PHR}/allergies-reports/${editItem.id}`,
          payload
        );
        ToastService.showSuccess("Success!", "Allergy updated successfully");
      } else {
        await axios.post(`${API_URI_PHR}/allergies-reports`, payload);
        ToastService.showSuccess("Success!", "Allergy created successfully");
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error submitting allergy:", error);
      ToastService.showError(
        "Error!",
        error?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBody}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeIconBtn} onPress={closeModal}>
            <Ionicons name="close-sharp" size={s(24)} color="#0F45B1" />
          </TouchableOpacity>

          <Text style={styles.title}>
            {editItem ? "Edit Allergy Details" : "Add Allergy Details"}
          </Text>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formBody}>
              <CustomInputBox
                label="Allergy Name"
                placeholder="Eg. Peanuts"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                error={errors.name}
              />
              <CustomInputBox
                label="Allergen"
                placeholder="Eg. Food"
                value={formData.allergen}
                onChangeText={(text) => handleChange("allergen", text)}
                error={errors.allergen}
              />

              <CustomDropdown
                label="Severity"
                options={severityOptions}
                selectedValue={formData.severity}
                onSelect={(value) => handleChange("severity", value)}
                error={errors.severity}
                placeholder="Select severity"
              />

              <CustomInputBox
                label="Reaction"
                placeholder="Eg. Swelling"
                value={formData.reaction}
                onChangeText={(text) => handleChange("reaction", text)}
                error={errors.reaction}
                multiline
                numberOfLines={2}
              />

              {/* Image Upload Section */}
              <View style={styles.imageUploadContainer}>
                <Text style={styles.label}>Allergy Image (Optional)</Text>
                {selectedImage ? (
                  <View style={styles.imagePreviewContainer}>
                    <TouchableOpacity onPress={handleImageSelection}>
                      <Image
                        source={{ uri: selectedImage.uri }}
                        style={styles.imagePreview}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <View style={styles.imageActions}>
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={handleImageSelection}
                        disabled={imageUploading || loading}
                      >
                        <Ionicons
                          name="camera-outline"
                          size={s(20)}
                          color="#1C57A5"
                        />
                        <Text style={styles.imageActionText}>Change</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={removeImage}
                        disabled={imageUploading || loading}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={s(20)}
                          color="#D03C3C"
                        />
                        <Text style={styles.imageActionText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    {imageUploading && (
                      <View style={styles.uploadingOverlay}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text style={styles.uploadingText}>Uploading...</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleImageSelection}
                    disabled={imageUploading || loading}
                  >
                    <Ionicons
                      name="cloud-upload-outline"
                      size={s(24)}
                      color="#1C57A5"
                    />
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.btnBody}>
            <CustomButton
              title={editItem ? "Update" : "Add"}
              onPress={handleSubmit}
              loading={loading || imageUploading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AllergyFormModal;

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: ms(20),
  },
  modalBox: {
    padding: ms(16),
    paddingTop: vs(20),
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxHeight: "95%",
    borderRadius: s(8),
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  closeIconBtn: {
    position: "absolute",
    padding: ms(10),
    right: s(10),
    top: s(10),
    zIndex: 1,
  },
  title: {
    fontSize: s(16),
    color: "#1C57A5",
    fontWeight: "600",
    marginBottom: vs(10),
  },
  scrollView: {
    width: "100%",
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: vs(20),
  },
  formBody: {
    marginVertical: vs(20),
    width: "100%",
  },
  btnBody: {
    width: "100%",
  },

  label: {
    fontSize: s(14),
    fontWeight: "600",
    marginBottom: ms(6),
    color: "#0F45B1",
  },

  errorText: {
    color: "#FF4D4D",
    fontSize: s(12),
    marginTop: ms(4),
  },
  // Image upload styles
  imageUploadContainer: {
    marginBottom: ms(16),
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: ms(12),
    borderWidth: 1,
    borderColor: "#1C57A5",
    borderRadius: s(8),
    backgroundColor: "#F5F9FF",
    gap: s(8),
  },
  uploadButtonText: {
    color: "#1C57A5",
    fontSize: s(14),
    fontWeight: "500",
  },
  imagePreviewContainer: {
    position: "relative",
    borderRadius: s(8),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  imagePreview: {
    width: "100%",
    height: vs(150),
  },
  imageActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: vs(8),
    backgroundColor: "#F5F5F5",
  },
  imageActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
  },
  imageActionText: {
    fontSize: s(12),
    fontWeight: "500",
  },
  uploadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: s(8),
  },
  uploadingText: {
    color: "#FFFFFF",
    fontSize: s(12),
  },
});
