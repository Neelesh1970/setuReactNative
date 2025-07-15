import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const RegistrationStep1 = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!gender) {
      alert("Please select your gender.");
      return;
    }
    if (!dob) {
      alert("Please select your date of birth.");
      return;
    }

    navigation.navigate("Register2");
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Step Progress */}
      <Text style={styles.stepText}>Step 1 of 3</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter  your full name"
        placeholderTextColor="#6e7e91"
        value={name}
        onChangeText={setName}
      />

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        {["Male", "Female", "Other"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.genderButton,
              gender === option && styles.genderButtonSelected,
            ]}
            onPress={() => setGender(option)}
          >
            <Text
              style={[
                styles.genderText,
                gender === option && styles.genderTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={dob ? styles.dobText : styles.placeholderText}>
          {dob ? dob.toDateString() : "Select  your date of birth"}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#6e7e91" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  backArrow: {
    marginBottom: 16,
  },
  stepText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#dbe0e6",
    borderRadius: 4,
    marginBottom: 24,
  },
  progressBar: {
    width: "33%",
    height: 6,
    backgroundColor: "#111",
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholderText: {
    color: "#6e7e91",
  },
  dobText: {
    color: "#000",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  genderButtonSelected: {
    borderColor: "#111",
  },
  genderText: {
    fontSize: 14,
    color: "#111",
  },
  genderTextSelected: {
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#0a74f9",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RegistrationStep1;
