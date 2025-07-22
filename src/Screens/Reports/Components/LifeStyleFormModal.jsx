import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, CustomInputBox } from "../../SOS/Components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ms, s, vs } from "react-native-size-matters";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import ToastService from "../../../Utils/ToastService";
import { API_URI_PHR } from "@env";
import CustomDropdown from "./CustomDropdown";

const LifeStyleFormModal = ({
  showModal,
  setShowModal,
  lifeStyleData,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    smoking: "",
    alcohol: "",
    diet: "",
    exercise: "",
    occupation: "",
    pet: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const frequencyOptions = [
    "Daily",
    "Several times a week",
    "Weekly",
    "Monthly",
    "Occasionally",
    "Rarely",
    "Never",
    "Formerly",
    "Quit",
  ];
  const dietOptions = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Eggitarian",
    "Pescatarian",
  ];

  useEffect(() => {
    if (lifeStyleData?.id) {
      // Pre-fill form if data exists (update mode)
      setFormData({
        smoking: lifeStyleData.smoking || "",
        alcohol: lifeStyleData.alcohol || "",
        diet: lifeStyleData.diet || "",
        exercise: lifeStyleData.exercise || "",
        occupation: lifeStyleData.occupation || "",
        pet: lifeStyleData.pet || "",
      });
    } else {
      // Clear form if no data (create mode)
      setFormData({
        smoking: "",
        alcohol: "",
        diet: "",
        exercise: "",
        occupation: "",
        pet: "",
      });
    }
    setErrors({});
  }, [lifeStyleData, showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.smoking) newErrors.smoking = "This field is required";
    if (!formData.alcohol) newErrors.alcohol = "This field is required";
    if (!formData.diet) newErrors.diet = "This field is required";
    if (!formData.exercise) newErrors.exercise = "This field is required";
    if (!formData.occupation) newErrors.occupation = "This field is required";
    if (!formData.pet) newErrors.pet = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const payload = {
        ...formData,
        userId,
      };

      if (lifeStyleData?.id) {
        // Update existing record
        await axios.put(
          `${API_URI_PHR}/lifestyle-history-reports/${lifeStyleData.id}`,
          payload
        );
        ToastService.showSuccess("Success", "Lifestyle updated successfully!");
      } else {
        // Create new record
        await axios.post(`${API_URI_PHR}/lifestyle-history-reports`, payload);
        ToastService.showSuccess("Success", "Lifestyle created successfully!");
      }

      fetchData();
      closeModal();
    } catch (err) {
      console.error("Error saving lifestyle:", err);
      ToastService.showError(
        "Error",
        err?.response?.data?.message || "Failed to save lifestyle data"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <View style={styles.modalBody}>
          <View style={styles.modalBox}>
            {lifeStyleData?.id && (
              <TouchableOpacity
                style={styles.closeIconBtn}
                onPress={closeModal}
              >
                <Ionicons name="close-sharp" size={s(24)} color="#0F45B1" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>
              {lifeStyleData?.id ? "Update Vital Signs" : "Create Vital Signs"}
            </Text>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formBody}>
                <CustomDropdown
                  label="Smoking"
                  options={frequencyOptions}
                  selectedValue={formData.smoking}
                  onSelect={(value) => handleChange("smoking", value)}
                  error={errors.smoking}
                  placeholder="Select smoking frequency"
                />

                <CustomDropdown
                  label="Alcohol"
                  options={frequencyOptions}
                  selectedValue={formData.alcohol}
                  onSelect={(value) => handleChange("alcohol", value)}
                  error={errors.alcohol}
                  placeholder="Select alcohol frequency"
                />

                <CustomDropdown
                  label="Diet"
                  options={dietOptions}
                  selectedValue={formData.diet}
                  onSelect={(value) => handleChange("diet", value)}
                  error={errors.diet}
                  placeholder="Select diet type"
                />

                <CustomDropdown
                  label="Exercise"
                  options={frequencyOptions}
                  selectedValue={formData.exercise}
                  onSelect={(value) => handleChange("exercise", value)}
                  error={errors.exercise}
                  placeholder="Select exercise frequency"
                />

                <CustomInputBox
                  label="Occupation"
                  placeholder="Eg. Software Engineer"
                  value={formData.occupation}
                  onChangeText={(text) => handleChange("occupation", text)}
                  error={errors.occupation}
                />

                <CustomInputBox
                  label="Pet"
                  placeholder="Eg. Dog, Cat... or None"
                  value={formData.pet}
                  onChangeText={(text) => handleChange("pet", text)}
                  error={errors.pet}
                />
              </View>
            </ScrollView>

            <View style={styles.btnBody}>
              <CustomButton
                title={lifeStyleData?.id ? "Update" : "Create"}
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default LifeStyleFormModal;

const styles = StyleSheet.create({
  modalBody: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    alignItems: "center",
  },
  closeIconBtn: {
    position: "absolute",
    padding: ms(10),
    right: s(10),
  },
  title: {
    fontSize: s(16),
    color: "#1C57A5",
    fontWeight: 600,
  },
  scrollView: {
    width: "100%",
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: vs(10),
  },
  formBody: {
    marginVertical: vs(10),
    width: "100%",
  },
});
