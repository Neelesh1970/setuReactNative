import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, ScrollView } from "react-native";

import { ms, vs, s } from "react-native-size-matters";

import { useDispatch } from "react-redux";
import { postUserHealthProfile } from "../../../features/sos/userHealthProfileSlice";
import ToastService from "../../../Utils/ToastService";
import CustomInputBox from "./CustomInputBox";
import CustomButton from "./CustomButton";

const HealthProfileFormModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyNotes, setEmergencyNotes] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/i;

    if (!bloodGroup.trim()) {
      tempErrors.bloodGroup = "Blood Group is required";
    } else if (!bloodGroupRegex.test(bloodGroup.trim().toUpperCase())) {
      tempErrors.bloodGroup =
        "Invalid Blood Group. Use formats like A+, B-, AB+, O-";
    }

    if (!allergies.trim()) {
      tempErrors.allergies = "Please enter any known allergies or write 'None'";
    }

    if (!medicalConditions.trim()) {
      tempErrors.medicalConditions =
        "Please specify any medical conditions or write 'None'";
    }

    if (!medications.trim()) {
      tempErrors.medications =
        "List medications you're currently taking or write 'None'";
    }

    if (!emergencyNotes.trim()) {
      tempErrors.emergencyNotes = "Emergency Notes cannot be empty";
    }

    setInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleTextChange = (setter, field) => (text) => {
    setter(text);
    if (inputErrors[field]) {
      setInputErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBloodGroupChange = (text) => {
    let formatted = text.toUpperCase().replace(/[^ABO+-]/g, "");
    if (formatted.length > 3) {
      formatted = formatted.slice(0, 3);
    }
    setBloodGroup(formatted);
    if (inputErrors.bloodGroup) {
      setInputErrors((prev) => ({ ...prev, bloodGroup: "" }));
    }
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setButtonLoading(true);

    try {
      await dispatch(
        postUserHealthProfile({
          bloodGroup,
          allergies,
          medicalConditions,
          medications,
          emergencyNotes,
        })
      );
      ToastService.showSuccess("Success!", "Profile created successfully!");
      onClose();
    } catch (error) {
      ToastService.showError(
        "Error!",
        error?.message || "Something Went Wrong!"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.primaryText, { marginBottom: vs(20) }]}>
            Complete your profile to start using the SOS feature.
          </Text>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formBody}>
              <CustomInputBox
                label="Blood Group"
                placeholder="Eg: A+"
                value={bloodGroup}
                onChangeText={handleBloodGroupChange}
                error={inputErrors.bloodGroup}
                maxLength={3}
              />
              <CustomInputBox
                label="Allergies"
                placeholder="Eg: Penicillin, Peanuts, Dust"
                value={allergies}
                onChangeText={handleTextChange(setAllergies, "allergies")}
                error={inputErrors.allergies}
              />
              <CustomInputBox
                label="Medical Conditions"
                placeholder="Eg: Diabetes, Hypertension"
                value={medicalConditions}
                onChangeText={handleTextChange(
                  setMedicalConditions,
                  "medicalConditions"
                )}
                error={inputErrors.medicalConditions}
              />
              <CustomInputBox
                label="Medications"
                placeholder="Eg: Insulin, Aspirin"
                value={medications}
                onChangeText={handleTextChange(setMedications, "medications")}
                error={inputErrors.medications}
              />
              <CustomInputBox
                label="Emergency Notes"
                placeholder="Eg: Asthmatic, carries inhaler"
                value={emergencyNotes}
                onChangeText={handleTextChange(
                  setEmergencyNotes,
                  "emergencyNotes"
                )}
                error={inputErrors.emergencyNotes}
                multiline={true}
                numberOfLines={2}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Create Profile"
              onPress={handleCreate}
              type="primary"
              disabled={buttonLoading}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    width: "100%",
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: vs(10),
  },
  formBody: {
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "#fefefe",
    borderRadius: s(12),
    padding: ms(20),
    width: "90%",
    maxHeight: "90%",
  },
  primaryText: {
    fontSize: s(16),
    fontWeight: "700",
    color: "#1C57A5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: s(5),
  },
});

export default HealthProfileFormModal;
