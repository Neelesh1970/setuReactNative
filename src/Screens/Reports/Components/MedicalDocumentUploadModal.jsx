import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "../../SOS/Components";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { API_URI_PHR, API_URL_AUTH } from "@env";
import { getItem } from "../../../Utils/utils";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";
import ToastService from "../../../Utils/ToastService";

const MedicalDocumentUploadModal = ({ showModal, setShowModal, fetchData }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [step, setStep] = useState(1);
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const typeEnumMap = {
    Allergy: "allergy",
    "CT Scan": "ctScan",
    Immunization: "immunization",
    "Lab Report": "labReport",
    Medication: "medication",
    MRI: "mri",
    Sonography: "sonography",
    "Stress Test": "stressTest",
    "X-Ray": "xRay",
    Others: "others",
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedType(null);
    setDocumentName("");
    setFileUri(null);
    setFileName(null);
    setStep(1);
    setIsLoading(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleProceed = () => {
    if (!selectedType) {
      ToastService.showError("Error", "Please select a document type");

      return;
    }
    if (selectedType) {
      setStep(2);
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      if (res && res.length > 0) {
        const file = res[0];
        setFileUri(file.uri);
        setFileName(file.name);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error("Error picking document:", err);
        ToastService.showError("Error", "Failed to select document");
      }
    }
  };

  const handleSave = async () => {
    if (!documentName || !fileUri || !selectedType) {
      ToastService.showError(
        "Error",
        "Please fill all fields and select a file"
      );

      return;
    }

    try {
      setIsLoading(true);

      // First get the upload URL
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const getUrlResponse = await axios.get(
        `${API_URL_AUTH}/jobs/api/v1/get-upload-url`,
        {
          params: {
            fileName: fileName,
            fileType: fileUri.split(".").pop(),
          },
        }
      );

      const { uploadURL, downloadURL } = getUrlResponse.data;

      // Read and upload the file
      const fileData = await RNFS.readFile(fileUri, "base64");
      const binaryData = Buffer.from(fileData, "base64");

      await axios.put(uploadURL, binaryData, {
        headers: {
          "Content-Type":
            DocumentPicker.types[fileUri.split(".").pop()] ||
            "application/octet-stream",
        },
      });

      // Save document metadata
      const response = await axios.post(`${API_URI_PHR}/medical-documents`, {
        documentName: documentName,
        documentUrl: downloadURL,
        type: typeEnumMap[selectedType],
        userId: parseInt(userId),
      });

      if (response.status === 201) {
        ToastService.showSuccess("Success", "Document uploaded successfully");

        fetchData();
        closeModal();
      }
    } catch (error) {
      console.error("Upload error:", error);
      ToastService.showError("Error", "Failed to upload document");
    } finally {
      setIsLoading(false);
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

          {step === 1 ? (
            <>
              <Text style={styles.title}>
                What type of document you want to upload?
              </Text>

              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.gridBody}>
                  <UploadType
                    title="Allergy"
                    iconName="alert-circle-outline"
                    isSelected={selectedType === "Allergy"}
                    onPress={() => handleTypeSelect("Allergy")}
                  />
                  <UploadType
                    title="CT Scan"
                    iconName="scan-outline"
                    isSelected={selectedType === "CT Scan"}
                    onPress={() => handleTypeSelect("CT Scan")}
                  />
                  <UploadType
                    title="Immunization"
                    iconName="shield-checkmark-outline"
                    isSelected={selectedType === "Immunization"}
                    onPress={() => handleTypeSelect("Immunization")}
                  />
                  <UploadType
                    title="Lab Report"
                    iconName="flask-outline"
                    isSelected={selectedType === "Lab Report"}
                    onPress={() => handleTypeSelect("Lab Report")}
                  />
                  <UploadType
                    title="Medication"
                    iconName="medkit-outline"
                    isSelected={selectedType === "Medication"}
                    onPress={() => handleTypeSelect("Medication")}
                  />
                  <UploadType
                    title="MRI"
                    iconName="pulse-outline"
                    isSelected={selectedType === "MRI"}
                    onPress={() => handleTypeSelect("MRI")}
                  />
                  <UploadType
                    title="Sonography"
                    iconName="radio-outline"
                    isSelected={selectedType === "Sonography"}
                    onPress={() => handleTypeSelect("Sonography")}
                  />
                  <UploadType
                    title="Stress Test"
                    iconName="fitness-outline"
                    isSelected={selectedType === "Stress Test"}
                    onPress={() => handleTypeSelect("Stress Test")}
                  />
                  <UploadType
                    title="X-Ray"
                    iconName="body-outline"
                    isSelected={selectedType === "X-Ray"}
                    onPress={() => handleTypeSelect("X-Ray")}
                  />
                  <UploadType
                    title="Others"
                    iconName="document-text-outline"
                    isSelected={selectedType === "Others"}
                    onPress={() => handleTypeSelect("Others")}
                  />
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <Text style={styles.title}>Upload Document</Text>
              <Text style={styles.selectedTypeText}>
                Category: {selectedType}
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Document Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter document name"
                  value={documentName}
                  onChangeText={setDocumentName}
                />
              </View>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleDocumentSelection}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="#1C57A5" />
                ) : (
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={s(40)}
                      color="#1C57A5"
                    />
                    <Text style={styles.uploadText}>
                      {fileName ? fileName : "Click to upload document"}
                    </Text>
                    <Text style={styles.uploadHint}>
                      Supports: PDF, JPG, PNG
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          <View style={styles.btnBody}>
            <CustomButton
              title="Cancel"
              onPress={closeModal}
              type="secondary"
              disabled={isLoading}
            />
            {step === 1 ? (
              <CustomButton title="Proceed" onPress={handleProceed} />
            ) : (
              <CustomButton
                title={isLoading ? "Uploading..." : "Save"}
                onPress={handleSave}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const UploadType = ({ iconName, title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.cardBody, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={s(20)} color="#0F45B1" />
      </View>
      <Text style={styles.primaryText} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

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
    right: s(5),
    top: s(5),
    zIndex: 1,
  },
  title: {
    fontSize: s(15),
    color: "#1C57A5",
    fontWeight: "600",
    marginBottom: vs(12),
    paddingRight: s(20),
  },
  selectedTypeText: {
    fontSize: s(14),
    color: "#1C1C1C",
    marginBottom: vs(20),
    alignSelf: "flex-start",
    fontWeight: 600,
  },
  scrollView: {
    width: "100%",
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: vs(20),
  },
  gridBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
    flex: 1,
  },
  btnBody: {
    flexDirection: "row",
    gap: s(10),
    marginTop: vs(10),
  },
  cardBody: {
    borderWidth: 1,
    paddingHorizontal: s(6),
    paddingVertical: vs(7),
    borderColor: "#1C57A5",
    flexDirection: "row",
    width: "47%",
    borderRadius: s(8),
    alignItems: "center",
    gap: s(8),
    overflow: "hidden",
  },
  selectedCard: {
    backgroundColor: "#EFF6FC",
  },
  iconWrapper: {
    backgroundColor: "#EFF6FC",
    alignSelf: "flex-start",
    padding: ms(3),
    borderRadius: s(6),
    borderWidth: s(1),
    borderColor: "#1C57A5",
  },
  primaryText: {
    fontSize: s(12),
    fontWeight: 600,
    color: "#1C57A5",
    flexShrink: 1,
  },
  inputContainer: {
    width: "100%",
    marginBottom: vs(20),
  },
  inputLabel: {
    fontSize: s(12),
    color: "#1C1C1C",
    marginBottom: vs(5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#1C57A5",
    borderRadius: s(8),
    padding: ms(10),
    fontSize: s(14),
  },
  uploadBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#1C57A5",
    borderRadius: s(8),
    borderStyle: "dashed",
    padding: vs(30),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vs(10),
  },
  uploadText: {
    fontSize: s(14),
    color: "#1C57A5",
    marginTop: vs(10),
    fontWeight: "500",
    textAlign: "center",
  },
  uploadHint: {
    fontSize: s(12),
    color: "#6B6B6B",
    marginTop: vs(5),
  },
});

export default MedicalDocumentUploadModal;
