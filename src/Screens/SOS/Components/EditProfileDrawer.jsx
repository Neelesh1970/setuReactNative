import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "./CustomButton";
import CustomInputBox from "./CustomInputBox";

const EditProfileDrawer = ({
  visible,
  onClose,
  healthProfileData,
  onUpdateHealthProfile,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [formData, setFormData] = React.useState({
    bloodGroup: healthProfileData?.[0]?.bloodGroup || "",
    allergies: healthProfileData?.[0]?.allergies || "",
    medicalConditions: healthProfileData?.[0]?.medicalConditions || "",
    medications: healthProfileData?.[0]?.medications || "",
    emergencyNotes: healthProfileData?.[0]?.emergencyNotes || "",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/i;

    if (!formData.bloodGroup.trim()) {
      tempErrors.bloodGroup = "Blood Group is required";
    } else if (
      !bloodGroupRegex.test(formData.bloodGroup.trim().toUpperCase())
    ) {
      tempErrors.bloodGroup =
        "Invalid Blood Group. Use formats like A+, B-, AB+, O-";
    }

    if (!formData.allergies.trim()) {
      tempErrors.allergies = "Please enter any known allergies or write 'None'";
    }

    if (!formData.medicalConditions.trim()) {
      tempErrors.medicalConditions =
        "Please specify any medical conditions or write 'None'";
    }

    if (!formData.medications.trim()) {
      tempErrors.medications =
        "List medications you're currently taking or write 'None'";
    }

    if (!formData.emergencyNotes.trim()) {
      tempErrors.emergencyNotes = "Emergency Notes cannot be empty";
    }

    setInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeDrawer();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      openDrawer();
    }
  }, [visible]);

  const openDrawer = () => {
    translateY.setValue(600);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const resetPosition = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (inputErrors[field]) {
      setInputErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBloodGroupChange = (text) => {
    let formatted = text.toUpperCase().replace(/[^ABO+-]/g, "");
    if (formatted.length > 3) {
      formatted = formatted.slice(0, 3);
    }
    handleChange("bloodGroup", formatted);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setButtonLoading(true);

    try {
      const healthProfileInputData = {
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
        medicalConditions: formData.medicalConditions,
        medications: formData.medications,
        emergencyNotes: formData.emergencyNotes,
      };

      onUpdateHealthProfile(healthProfileInputData);
      closeDrawer();
    } catch (error) {
      console.error("Error updating health profile:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.overlayTouchable} onPress={closeDrawer} />
      <Animated.View
        style={[styles.drawerContainer, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.header}>
          <View style={styles.handle} />
          <Text style={styles.headerText}>Edit Health Profile</Text>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#1C57A5" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Health Information</Text>
            <CustomInputBox
              label="Blood Group"
              placeholder="Eg: A+"
              value={formData.bloodGroup}
              onChangeText={handleBloodGroupChange}
              error={inputErrors.bloodGroup}
              maxLength={3}
            />

            <CustomInputBox
              label="Allergies"
              placeholder="Eg: Penicillin, Peanuts, Dust"
              value={formData.allergies}
              onChangeText={(text) => handleChange("allergies", text)}
              error={inputErrors.allergies}
            />

            <CustomInputBox
              label="Medical Conditions"
              placeholder="Eg: Diabetes, Hypertension"
              value={formData.medicalConditions}
              onChangeText={(text) => handleChange("medicalConditions", text)}
              error={inputErrors.medicalConditions}
            />

            <CustomInputBox
              label="Medications"
              placeholder="Eg: Insulin, Aspirin"
              value={formData.medications}
              onChangeText={(text) => handleChange("medications", text)}
              error={inputErrors.medications}
            />

            <CustomInputBox
              label="Emergency Notes"
              placeholder="Eg: Asthmatic, carries inhaler"
              value={formData.emergencyNotes}
              onChangeText={(text) => handleChange("emergencyNotes", text)}
              error={inputErrors.emergencyNotes}
              multiline={true}
              numberOfLines={2}
            />
          </View>
        </ScrollView>
        <View style={styles.saveButtonBody}>
          <CustomButton
            title="Save Changes"
            type="primary"
            onPress={handleSubmit}
            disabled={buttonLoading}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
    paddingHorizontal: s(16),
    paddingTop: vs(10),
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(15),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  handle: {
    width: s(40),
    height: vs(4),
    backgroundColor: "#ccc",
    borderRadius: 3,
    position: "absolute",
    top: vs(5),
  },
  headerText: {
    fontSize: s(18),
    fontWeight: "bold",
    color: "#1C57A5",
  },
  closeButton: {
    position: "absolute",
    right: s(10),
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    paddingBottom: vs(20),
  },
  sectionTitle: {
    fontSize: s(14),
    fontWeight: "bold",
    color: "#1C57A5",
    marginTop: vs(10),
    marginBottom: vs(8),
  },
  saveButtonBody: {
    marginBottom: vs(20),
  },
});

export default EditProfileDrawer;
