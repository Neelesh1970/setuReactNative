// src/screens/ProfileScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { color } from "../../assets/colors/Colors";

const MatriProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: color.bottomViewColor, padding: 16 }}>
        <Text style={styles.header}>Edit Profile</Text>
      </View>
      <ScrollView>
        <Image
          source={require("../../assets/images/matrimony/mainProfile.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Sophia</Text>
        <Text style={styles.subInfo}>28, Software Engineer</Text>

        {/* Sections */}
        <Text style={styles.section}>Personal Info</Text>
        {["Name", "Gender", "Date of Birth", "Height"].map((field) => (
          <TextInput key={field} placeholder={field} style={styles.input} />
        ))}

        <Text style={styles.section}>Lifestyle & Education</Text>
        {["Marital Status", "Education", "Diet", "Smoking"].map((field) => (
          <TextInput key={field} placeholder={field} style={styles.input} />
        ))}

        <Text style={styles.section}>Family Details</Text>
        {["Father's Occupation", "Siblings"].map((field) => (
          <TextInput key={field} placeholder={field} style={styles.input} />
        ))}

        <Text style={styles.section}>Preferences</Text>
        {["Age Range", "Religion", "Caste"].map((field) => (
          <TextInput key={field} placeholder={field} style={styles.input} />
        ))}

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatriProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 12,
  },
  name: { textAlign: "center", fontSize: 18, fontWeight: "700", marginTop: 6 },
  subInfo: { textAlign: "center", fontSize: 14, color: "#6e7e91" },
  section: { fontSize: 16, fontWeight: "600", marginTop: 20, marginLeft: 20 },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 6,
  },
  saveBtn: {
    margin: 20,
    backgroundColor: "#c9dafc",
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  saveText: {
    fontWeight: "600",
    color: "#111",
  },
});
