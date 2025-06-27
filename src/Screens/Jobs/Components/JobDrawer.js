import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icons } from "../../../assets/icons/Icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "react-native-ui-datepicker";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import { Buffer } from "buffer";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSkillList } from "../../../features/jobs/jobsSlice";
import ImagePicker from "react-native-image-crop-picker";
import { ms, s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

const JobDrawer = ({
  onClose,
  onSave,
  fetchData,
  onDelete,
  formData,
  setFormData,
  handleCreate,
  skillLoading,
  skillSearch,
  setSkillSearch,
  mode,
}) => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.user);
  const { modalVisible, modalSection, create, skillList } = useSelector(
    (state) => state.jobs
  );
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [selectedField, setSelectedField] = useState(null);
  const [selected, setSelected] = useState();
  const [invalidFields, setInvalidFields] = useState([]);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [duplicateSkillError, setDuplicateSkillError] = useState(false);
  const [openSkillBox, setOpenSkillBox] = useState(false);

  // Function to validate fields
  const validateFields = () => {
    const invalid = [];
    modalSection.fields.forEach((field) => {
      if (modalSection.field === "profile" && field.field === "imageUrl") {
        return;
      }

      if (field.field === "phone_number") {
        const phoneNumber = formData[field.field].toString().trim();
        if (!/^\d{10}$/.test(phoneNumber)) {
          invalid.push(field.field);
        }
      } else if (
        !formData[field.field] ||
        formData[field.field].toString().trim() === ""
      ) {
        invalid.push(field.field);
      }
    });

    setInvalidFields(invalid);
    return invalid.length === 0;
  };

  // Handle Save button click
  const handleSave = () => {
    const isValid = validateFields();
    if (isValid) {
      if (create) {
        handleCreate(formData);
      } else {
        onSave();
      }
      setSelectedImageUri(null);
    }
  };

  // Handle input change
  const handleInputChange = (field, text) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        modalSection.fields.find((f) => f.field === field)?.keyboardType ===
        "numeric"
          ? text === ""
            ? ""
            : isNaN(Number(text))
            ? prev[field]
            : Number(text)
          : text,
    }));

    if (invalidFields.includes(field)) {
      setInvalidFields((prev) => prev.filter((f) => f !== field));
    }
  };

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        includeBase64: true,
      });

      if (image) {
        setImageUploading(true);
        const { mime, data } = image;

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
          console.log("Image uploaded successfully!", downloadURL);
          setSelectedImageUri(image.path);
          setFormData((prev) => ({
            ...prev,
            imageUrl: downloadURL,
          }));
          setImageUploading(false);
        } else {
          console.error("Image upload failed", uploadResponse);
        }
      }
    } catch (err) {
      if (err.message === "User cancelled image selection") {
        console.log("User cancelled the picker");
      } else {
        console.error("Error picking or uploading document:", err);
      }
      setImageUploading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setInvalidFields([]);
      setDuplicateSkillError(false);
    }
  }, [modalVisible]);

  const handleDateChange = (field, date) => {
    if (date) {
      const adjustedDate = new Date(date);
      adjustedDate.setHours(12, 0, 0, 0); // Set to midday to avoid timezone shifts
      const formattedDate = adjustedDate.toISOString().split("T")[0];

      setFormData((prev) => ({
        ...prev,
        [field]: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    setSelectedField(null);
  };

  const checkDuplicateSkill = (skillName) => {
    if (profileData.skills && Array.isArray(profileData.skills)) {
      const isDuplicate = profileData.skills.some(
        (skill) =>
          skill.skillName.toLowerCase().trim() ===
          skillName.toLowerCase().trim()
      );
      setDuplicateSkillError(isDuplicate);
      return isDuplicate;
    }
    return false;
  };

  const handleSkillInput = (text) => {
    if (!text) {
      dispatch(setSkillList([]));
    }
    setSkillSearch(text);
  };

  const handleProfilePhotoDelete = async () => {
    const requestBody = {
      imageUrl: "",
    };

    try {
      const response = await axios.patch(
        `${API_URL_AUTH}/jobs/api/v1/applicant/${profileData?.id}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Photo deleted successfully!");
        setSelectedImageUri(null);
        onClose();
        fetchData();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDeleteResume = () => {
    Alert.alert(
      "Delete Resume",
      "Are you sure you want to remove your photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleProfilePhotoDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  console.log("image url::", profileData?.imageUrl);

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <View style={styles.profile_bg}>
                  <Image source={modalSection?.icon} style={styles.icon} />
                </View>
              </View>
              <View style={styles.detailsMid}>
                <Text style={styles.modalTitle}>{modalSection?.title}</Text>
                <Text
                  style={{
                    fontSize: s(11),
                  }}
                >
                  {create ? "Add" : mode} {modalSection?.subTitle}
                </Text>
              </View>

              <View style={styles.actionRight}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    onClose();
                    setOpenSkillBox(false);
                    dispatch(setSkillList([]));
                    setSkillSearch("");
                  }}
                >
                  <MaterialIcons name="close" size={s(26)} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {modalSection?.fields.map((field, index) => (
              <View key={index} style={styles.inputBody}>
                {field?.type === "camera" ? (
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      style={[
                        styles.cameraBody,
                        invalidFields.includes(field.field) &&
                          styles.imageError,
                      ]}
                      onPress={handleImageUpload}
                    >
                      {imageUploading ? (
                        <View style={styles.loadingImg}>
                          <ActivityIndicator size="small" color="#1C57A5" />
                        </View>
                      ) : (
                        <Image
                          source={
                            selectedImageUri
                              ? { uri: selectedImageUri }
                              : formData?.imageUrl
                              ? { uri: formData.imageUrl }
                              : Icons.job_cameras
                          }
                          style={styles.cameraImg}
                        />
                      )}
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: s(20),
                      }}
                    >
                      <TouchableOpacity onPress={handleImageUpload}>
                        <Text style={styles.cameraText}>
                          {imageUploading
                            ? "Please wait..."
                            : selectedImageUri || formData?.imageUrl
                            ? "Change Photo"
                            : "Add your photo"}
                        </Text>
                      </TouchableOpacity>
                      {formData?.imageUrl && !selectedImageUri && (
                        <TouchableOpacity onPress={confirmDeleteResume}>
                          <Text style={styles.cameraText}>Remove Photo</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : field?.type === "dropdown" ? (
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={formData[field.field] || ""}
                      onValueChange={(itemValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.field]: itemValue,
                        }))
                      }
                      style={styles.picker}
                      dropdownIconColor={"#444"}
                    >
                      <Picker.Item
                        label={`Select ${field?.label}`}
                        style={styles.pickerItem}
                        value=""
                      />
                      {field.options?.map((option, idx) => (
                        <Picker.Item
                          key={idx}
                          label={option}
                          style={styles.pickerItem}
                          value={option}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : field?.type === "searchDropdown" ? (
                  <>
                    {openSkillBox ? (
                      <View>
                        <TextInput
                          placeholder={"Search Skill"}
                          placeholderTextColor="#666666"
                          style={styles.skillInput}
                          value={skillSearch}
                          // onChangeText={(text) => setSkillSearch(text)}
                          autoFocus={true}
                          onChangeText={(text) => handleSkillInput(text)}
                        />

                        {skillLoading ? (
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              paddingBottom: vs(30),
                              marginTop: vs(10),
                            }}
                          >
                            <ActivityIndicator size="small" color="#1C57A5" />
                          </View>
                        ) : (
                          <View style={styles.skillListBox}>
                            {skillList.map((skill) => (
                              <TouchableOpacity
                                key={skill?.id}
                                onPress={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.field]: skill?.name,
                                  }));
                                  setSkillSearch("");
                                  checkDuplicateSkill(skill?.name);
                                  setOpenSkillBox(false);
                                }}
                              >
                                <Text style={styles.skillItem}>
                                  {skill?.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setOpenSkillBox(true);
                            if (mode === "Edit") {
                              setSkillSearch(formData[field.field]);
                            }
                          }}
                        >
                          <Text
                            style={[
                              styles.input,
                              invalidFields.includes(field.field) &&
                                styles.invalidInput,
                              { color: "#666666" },
                            ]}
                          >
                            {formData[field.field]
                              ? formData[field.field]
                              : `${mode} Skills`}
                          </Text>
                        </TouchableOpacity>
                        {modalSection.field === "skills" &&
                          field.field === "skillName" &&
                          duplicateSkillError && (
                            <Text
                              style={{
                                color: "red",
                                fontSize: s(9),
                              }}
                            >
                              Skill name already exists.
                            </Text>
                          )}
                      </View>
                    )}
                  </>
                ) : field.type === "date" ? (
                  <>
                    <View>
                      <TouchableOpacity
                        onPress={() => setSelectedField(field.field)}
                        style={[
                          styles.input,
                          invalidFields.includes(field.field) &&
                            styles.invalidInput,
                        ]}
                      >
                        <Text
                          style={{
                            color: "#666666",
                            fontSize: s(12),
                          }}
                        >
                          {formData?.[field.field]
                            ? new Date(
                                formData[field.field]
                              ).toLocaleDateString()
                            : "Select Joining Date"}
                        </Text>
                      </TouchableOpacity>

                      {selectedField === field.field && (
                        <DateTimePicker
                          mode="single"
                          date={
                            formData[field.field]
                              ? new Date(formData[field.field])
                              : selected
                          }
                          onChange={({ date }) =>
                            handleDateChange(field.field, date)
                          }
                        />
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    <TextInput
                      placeholder={field?.label}
                      placeholderTextColor="#666666"
                      style={[
                        styles.input,
                        invalidFields.includes(field.field) &&
                          styles.invalidInput,
                      ]}
                      value={
                        formData?.[field.field]
                          ? String(formData[field.field])
                          : ""
                      }
                      keyboardType={
                        field?.keyboardType === "numeric"
                          ? "numeric"
                          : "default"
                      }
                      onChangeText={(text) =>
                        handleInputChange(field.field, text)
                      }
                    />
                  </>
                )}

                {field?.note && <Text style={styles.note}>{field?.note}</Text>}
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  modalSection?.field === "profile" && {
                    backgroundColor: "#ccc",
                  },
                ]}
                onPress={() => {
                  if (mode === "Edit") {
                    onDelete();
                    onClose();
                  } else {
                    onClose();
                  }
                }}
                disabled={modalSection?.field === "profile"}
              >
                <Text style={styles.deleteText}>
                  {mode === "Edit" ? "Delete" : "Cancel"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  (imageUploading || duplicateSkillError || openSkillBox) && {
                    backgroundColor: "#444",
                  },
                ]}
                onPress={handleSave}
                disabled={imageUploading || duplicateSkillError || openSkillBox}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default JobDrawer;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: ms(20),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profile_bg: {
    padding: ms(10),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#BABABA",
  },
  detailsMid: {
    flex: 1,
    paddingTop: 2,
    marginLeft: s(10),
  },
  icon: {
    width: ms(24),
    height: ms(24),
  },
  modalTitle: {
    fontSize: s(15),
    fontWeight: "bold",
  },
  cameraBody: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: vs(8),
    paddingBottom: vs(12),
  },
  cameraImg: {
    height: ms(70),
    width: ms(70),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loadingImg: {
    height: ms(70),
    width: ms(70),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: {
    color: "#8C8C8C",
    fontSize: s(11),
    // marginTop: 8,
  },
  inputBody: {
    marginBottom: vs(12),
  },
  input: {
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 8,
    padding: 10,
    color: "#000",
    fontSize: s(12),
  },
  invalidInput: {
    borderColor: "#e6483c",
  },
  note: {
    color: "#8C8C8C",
    fontSize: s(11),
    marginTop: vs(4),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: vs(9),
    gap: s(10),
  },
  deleteButton: {
    padding: s(9),
    borderRadius: 8,
    flex: 1,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  saveButton: {
    backgroundColor: "#1C57A5",
    padding: s(9),
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  deleteText: {
    color: "#1C57A5",
    fontWeight: "bold",
    fontSize: s(12),
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(12),
  },
  closeButton: {
    position: "absolute",
    right: ms(10),
    top: ms(10),
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: s(10),
    height: vs(45),
    justifyContent: "center",
  },
  picker: {
    color: "#666",
    fontSize: s(12),
  },

  pickerItem: {
    fontSize: s(12),
  },
  imageError: {
    borderWidth: 1,
    borderColor: "#e6483c",
  },
  skillInput: {
    borderWidth: 1,
    borderColor: "#BABABA",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: ms(10),
    color: "#000",
    fontSize: s(12),
  },
  skillListBox: {
    paddingHorizontal: s(10),
    // paddingVertical: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#ccc",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  skillItem: {
    fontSize: s(12),
    fontWeight: width <= 400 ? 500 : "bold",
    color: "#555",
    paddingVertical: vs(3),
  },
});
