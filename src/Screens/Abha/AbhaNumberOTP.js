import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";

const AbhaNumberOTP = ({ navigation }) => {
  const [otp, setOtp] = useState("");

  const isButtonEnabled = otp.length === 6;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.createAbha}>
        <Text style={styles.createAbhaTitle}>Enter Mobile OTP</Text>
        <Text style={styles.createInput_label}>
          OTP sent to the mobile number
        </Text>
        <View style={styles.createInput_body}>
          <OTPTextInput
            inputCount={6}
            handleTextChange={(text) => setOtp(text)}
            keyboardType="numeric"
            tintColor="#1C57A5"
            textInputStyle={styles.otpInput}
          />
          <Text style={styles.createInput_label}>Enter your 6-digit OTP</Text>
        </View>

        <View style={styles.createTerms_body}>
          <View style={styles.creatTerms_textBody}>
            <Text style={styles.creatTerms_text}>Didn't receive the OTP? </Text>
            <TouchableOpacity style={styles.creatTerms_press}>
              <Text style={styles.creatTerms_link}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.createButtonBody}>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: isButtonEnabled ? "#1C57A5" : "#888" },
          ]}
          onPress={() => navigation.navigate("AbhaCard")}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.createButton_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AbhaNumberOTP;

const styles = StyleSheet.create({
  createAbha: {
    padding: ms(20),
  },
  createAbhaTitle: {
    fontSize: s(16),
    fontWeight: "bold",
  },
  createInput_body: {
    marginVertical: ms(25),
  },
  otpInput: {
    borderWidth: ms(1),
    borderBottomWidth: ms(1),
    borderColor: "#ccc",
    borderRadius: ms(8),
    width: vs(40),
    height: vs(40),
    textAlign: "center",
    fontSize: s(14),
    color: "#000",
  },
  createInput_label: {
    color: "#888",
    fontSize: s(12),
    marginTop: s(5),
  },
  createTerms_body: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  creatTerms_press: {
    alignItems: "center",
    padding: 0,
  },
  creatTerms_textBody: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  creatTerms_text: {
    fontSize: s(12),
    color: "#555",
    fontWeight: "bold",
  },
  creatTerms_link: {
    fontSize: s(12),
    color: "#1C57A5",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  createButtonBody: {
    position: "absolute",
    bottom: vs(10),
    paddingHorizontal: ms(20),
    paddingVertical: ms(20),
    width: "100%",
  },
  createButton: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(10),
    borderRadius: ms(8),
  },
  createButton_text: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "bold",
  },
});
