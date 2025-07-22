import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";
import { Checkbox } from "react-native-paper";

const CreateAbhaNumber = ({ navigation }) => {
  const [terms, setTerms] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const isButtonEnabled = mobileNumber.length === 10 && terms;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.createAbha}>
        <Text style={styles.createAbhaTitle}>Enter your Mobile number</Text>
        <Text style={styles.createInput_label}>
          Enter mobile number to create ABHA address
        </Text>
        <View style={styles.createInput_body}>
          <TextInput
            style={styles.createInput}
            keyboardType="numeric"
            maxLength={10}
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
          />
          <Text style={styles.createInput_label}>
            We have pre-filled your Practo number
          </Text>
        </View>

        <View style={styles.createTerms_body}>
          <Checkbox
            status={terms ? "checked" : "unchecked"}
            onPress={() => setTerms(!terms)}
            color="#1C57A5"
          />
          <View style={styles.creatTerms_textBody}>
            <Text style={styles.creatTerms_text}>I agree to the </Text>
            <TouchableOpacity style={styles.creatTerms_press}>
              <Text style={styles.creatTerms_link}>Terms & Conditions </Text>
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
          disabled={!isButtonEnabled}
          onPress={() => navigation.navigate("AbhaNumberOTP")}
        >
          <Text style={styles.createButton_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAbhaNumber;

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
  createInput: {
    borderWidth: ms(1),
    borderColor: "#ccc",
    borderRadius: ms(5),
    padding: s(10),
    fontSize: s(14),
  },
  createInput_label: {
    color: "#888",
    fontSize: s(12),
    marginTop: s(5),
  },
  createTerms_body: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  creatTerms_link: {
    fontSize: s(12),
    color: "#1C57A5",
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
