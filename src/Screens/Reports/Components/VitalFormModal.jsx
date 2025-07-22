import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "../../SOS/Components";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import ToastService from "../../../Utils/ToastService";
import { API_URI_PHR } from "@env";

const VitalFormModal = ({ showModal, setShowModal, vitalData, fetchData }) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bmi: "",
    temperature: "",
    pulse: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    respiration: "",
    oxygenSaturation: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (vitalData?.id) {
      // Pre-fill form if data exists (update mode)
      setFormData({
        height: vitalData.height?.toString() || "",
        weight: vitalData.weight?.toString() || "",
        bmi: vitalData.bmi?.toString() || "",
        temperature: vitalData.temperature?.toString() || "",
        pulse: vitalData.pulse?.toString() || "",
        bloodPressureSystolic:
          vitalData.bloodPressureSystolic?.toString() || "",
        bloodPressureDiastolic:
          vitalData.bloodPressureDiastolic?.toString() || "",
        respiration: vitalData.respiration?.toString() || "",
        oxygenSaturation: vitalData.oxygenSaturation?.toString() || "",
      });
    } else {
      // Clear form if no data (create mode)
      setFormData({
        height: "",
        weight: "",
        bmi: "",
        temperature: "",
        pulse: "",
        bloodPressureSystolic: "",
        bloodPressureDiastolic: "",
        respiration: "",
        oxygenSaturation: "",
      });
    }
    setErrors({});
  }, [vitalData, showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const numericFields = [
      "height",
      "weight",
      "bmi",
      "temperature",
      "pulse",
      "bloodPressureSystolic",
      "bloodPressureDiastolic",
      "respiration",
      "oxygenSaturation",
    ];

    numericFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      } else if (isNaN(formData[field])) {
        newErrors[field] = "Must be a number";
      }
    });

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
        userId: parseInt(userId),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
        temperature: parseFloat(formData.temperature),
        pulse: parseInt(formData.pulse),
        bloodPressureSystolic: parseInt(formData.bloodPressureSystolic),
        bloodPressureDiastolic: parseInt(formData.bloodPressureDiastolic),
        respiration: parseInt(formData.respiration),
        oxygenSaturation: parseFloat(formData.oxygenSaturation),
      };

      if (vitalData?.id) {
        // Update existing record
        await axios.put(
          `${API_URI_PHR}/vital-signs-reports/${vitalData.id}`,
          payload
        );
      } else {
        // Create new record
        await axios.post(`${API_URI_PHR}/vital-signs-reports`, payload);
      }

      ToastService.showSuccess(
        "Success!",
        `Vital signs ${vitalData?.id ? "updated" : "created"}`
      );

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error submitting vital signs:", error);
      ToastService.showError(
        "Error!",
        error?.message || "Something Went Wrong!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const heightInMeters = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);

    if (!isNaN(heightInMeters) && heightInMeters > 0 && !isNaN(weight)) {
      const bmi = weight / (heightInMeters * heightInMeters);
      setFormData((prev) => ({
        ...prev,
        bmi: bmi.toFixed(2),
      }));
    }
  }, [formData.height, formData.weight]);

  return (
    <>
      {showModal && (
        <View style={styles.modalBody}>
          <View style={styles.modalBox}>
            {vitalData?.id && (
              <TouchableOpacity
                style={styles.closeIconBtn}
                onPress={closeModal}
              >
                <Ionicons name="close-sharp" size={s(24)} color="#0F45B1" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>
              {vitalData?.id ? "Update Vital Signs" : "Create Vital Signs"}
            </Text>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formBody}>
                <VitalInputBox
                  label="Height"
                  unit="cm"
                  placeholder="Eg. 156.0"
                  value={formData.height}
                  onChangeText={(text) => handleChange("height", text)}
                  error={errors.height}
                />
                <VitalInputBox
                  label="Weight"
                  unit="Kg"
                  placeholder="Eg. 55"
                  value={formData.weight}
                  onChangeText={(text) => handleChange("weight", text)}
                  error={errors.weight}
                />
                <VitalInputBox
                  label="BMI"
                  unit="Kg/m²"
                  placeholder="Eg. 28.04"
                  value={formData.bmi}
                  onChangeText={(text) => handleChange("bmi", text)}
                  error={errors.bmi}
                />
                <VitalInputBox
                  label="Temperature"
                  unit="°C"
                  placeholder="Eg. 101"
                  value={formData.temperature}
                  onChangeText={(text) => handleChange("temperature", text)}
                  error={errors.temperature}
                />
                <View style={styles.vitalInputCombine}>
                  <VitalInputBox
                    label="Pulse"
                    unit="BPM"
                    placeholder="Eg. 99"
                    isHalf
                    value={formData.pulse}
                    onChangeText={(text) => handleChange("pulse", text)}
                    error={errors.pulse}
                  />
                  <VitalInputBox
                    label="Respiration"
                    unit="BPM"
                    placeholder="Eg. 8"
                    isHalf
                    value={formData.respiration}
                    onChangeText={(text) => handleChange("respiration", text)}
                    error={errors.respiration}
                  />
                </View>
                <VitalInputBox
                  label="Systolic Blood Pressure"
                  unit="mm Hg"
                  placeholder="Eg. 120"
                  value={formData.bloodPressureSystolic}
                  onChangeText={(text) =>
                    handleChange("bloodPressureSystolic", text)
                  }
                  error={errors.bloodPressureSystolic}
                />
                <VitalInputBox
                  label="Diastolic Blood Pressure"
                  unit="mm Hg"
                  placeholder="Eg. 78"
                  value={formData.bloodPressureDiastolic}
                  onChangeText={(text) =>
                    handleChange("bloodPressureDiastolic", text)
                  }
                  error={errors.bloodPressureDiastolic}
                />
                <VitalInputBox
                  label="Oxygen Saturation"
                  unit="%"
                  placeholder="Eg. 99"
                  value={formData.oxygenSaturation}
                  onChangeText={(text) =>
                    handleChange("oxygenSaturation", text)
                  }
                  error={errors.oxygenSaturation}
                />
              </View>
            </ScrollView>

            <View style={styles.btnBody}>
              <CustomButton
                title={vitalData?.id ? "Update" : "Create"}
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

export default VitalFormModal;

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
  vitalInputBox: {
    gap: vs(8),
    marginBottom: vs(10),
  },
  vitalInputLabel: {
    fontSize: s(14),
    fontWeight: 500,
    color: "#1C57A5",
  },
  vitalInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0F45B163",
    borderRadius: s(4),
    paddingHorizontal: ms(12),
  },
  vitalInput: {
    fontSize: s(14),
    borderRightWidth: 1,
    borderColor: "#0F45B163",
    flex: 1,
  },
  vitalInputUnit: {
    fontSize: s(14),
    marginLeft: ms(12),
    color: "#1C57A5",
  },
  vitalInputCombine: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: s(10),
  },
  btnBody: {
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: s(12),
    marginTop: vs(4),
  },
});

const VitalInputBox = ({
  label,
  unit,
  placeholder,
  isHalf,
  value,
  onChangeText,
  error,
}) => {
  return (
    <View
      style={[styles.vitalInputBox, isHalf && { flex: 1, maxWidth: "48%" }]}
    >
      <Text style={styles.vitalInputLabel}>{label}</Text>
      <View style={[styles.vitalInputRow, error && { borderColor: "red" }]}>
        <TextInput
          placeholder={placeholder}
          style={styles.vitalInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
        <Text style={styles.vitalInputUnit}>{unit}</Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
