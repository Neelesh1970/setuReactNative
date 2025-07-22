import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URI_PHR } from "@env";
import ToastService from "../../../Utils/ToastService";
import { ms, s, vs } from "react-native-size-matters";
import { CustomButton, CustomInputBox } from "../../SOS/Components";
import CustomDatePicker from "./CustomDatePicker";

const BiomedicalImplantsModal = ({
  showModal,
  setShowModal,
  fetchData,
  editItem,
}) => {
  const [formData, setFormData] = useState({
    implantName: "",
    dateOfImplant: "",
    reasonForImplant: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({
        implantName: editItem.implantName || "",
        dateOfImplant: editItem.dateOfImplant || "",
        reasonForImplant: editItem.reasonForImplant || "",
      });
    } else {
      setFormData({
        implantName: "",
        dateOfImplant: "",
        reasonForImplant: "",
      });
    }
  }, [editItem]);

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData({
      implantName: "",
      dateOfImplant: "",
      reasonForImplant: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!formData.implantName.trim())
      newErrors.implantName = "Implant name is required";

    if (!formData.dateOfImplant.trim()) {
      newErrors.dateOfImplant = "Date of Implant is required";
    } else if (!dateRegex.test(formData.dateOfImplant.trim())) {
      newErrors.dateOfImplant = "Date must be in yyyy-mm-dd format";
    }

    if (!formData.reasonForImplant)
      newErrors.reasonForImplant = "Reason of Implant is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const payload = {
        ...formData,
        userId,
      };

      if (editItem) {
        await axios.patch(
          `${API_URI_PHR}/biomedical-implants/${editItem.id}`,
          payload
        );
        ToastService.showSuccess("Success!", "Data updated successfully");
      } else {
        console.log(`${API_URI_PHR}/biomedical-implants`);
        await axios.post(`${API_URI_PHR}/biomedical-implants`, payload);
        ToastService.showSuccess("Success!", "Data created successfully");
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
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
            {editItem
              ? "Edit Biomedical Implant Details"
              : "Add Biomedical Implant Details"}
          </Text>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formBody}>
              <CustomInputBox
                label="Implant Name"
                placeholder="Eg. Cardian Pacemaker"
                value={formData.implantName}
                onChangeText={(text) => handleChange("implantName", text)}
                error={errors.implantName}
              />
              <CustomDatePicker
                label="Date of Implant"
                placeholder="Select date"
                value={formData.dateOfImplant}
                onChangeText={(text) => handleChange("dateOfImplant", text)}
                error={errors.dateOfImplant}
              />
              <CustomInputBox
                label="Reason"
                placeholder="Write reason for implant"
                value={formData.reasonForImplant}
                onChangeText={(text) => handleChange("reasonForImplant", text)}
                error={errors.reasonForImplant}
                multiline
                numberOfLines={2}
              />
            </View>
          </ScrollView>
          <View style={styles.btnBody}>
            <CustomButton
              title={editItem ? "Update" : "Add"}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BiomedicalImplantsModal;

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
    padding: ms(5),
    right: s(5),
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
});
