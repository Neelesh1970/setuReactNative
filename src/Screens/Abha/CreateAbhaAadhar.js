import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";
import { Checkbox } from "react-native-paper";
import forge from "node-forge";

const CreateAbhaAadhar = ({ navigation }) => {
  const [terms, setTerms] = useState(false);
  const [aadharNumber, setAadharNumber] = useState("");

  const isButtonEnabled = aadharNumber.length === 12 && terms;

  const handleContinue = () => {
    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAstWB95C5pHLXiYW59qyO4Xb+59KYVm9Hywbo77qETZVAyc6VIsxU+UWhd/k/YtjZibCznB+HaXWX9TVTFs9Nwgv7LRGq5uLczpZQDrU7dnGkl/urRA8p0Jv/......+8hNhsCVnklCzAlsIzQpnSVDUVEzv17grVAw078CAwEAAQ==
    -----END PUBLIC KEY-----`;

    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    const encrypted = publicKey.encrypt(aadharNumber, "RSA-OAEP", {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });

    const encryptedBase64 = forge.util.encode64(encrypted);
    console.log("Encrypted Aadhar:", encryptedBase64);

    navigation.navigate("AbhaAadharOTP", { encryptedAadhar: encryptedBase64 });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.createAbha}>
        <Text style={styles.createAbhaTitle}>Create using Aadhar Number</Text>
        <View style={styles.createInput_body}>
          <TextInput
            style={styles.createInput}
            keyboardType="numeric"
            maxLength={12}
            value={aadharNumber}
            onChangeText={(text) => setAadharNumber(text)}
          />
          <Text style={styles.createInput_label}>
            Enter your 12 digit Aadhar number
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
            <Text style={styles.creatTerms_text}>and </Text>
            <TouchableOpacity style={styles.creatTerms_press}>
              <Text style={styles.creatTerms_link}>AADHAR Declaration</Text>
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
          onPress={handleContinue}
        >
          <Text style={styles.createButton_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAbhaAadhar;

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
