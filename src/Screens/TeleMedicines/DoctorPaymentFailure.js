import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const DoctorPaymentFailure = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.failureText}>Payment Failed!</Text>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: moderateScale(20),
  },
  failureText: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "#dc3545",
    marginBottom: verticalScale(30),
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1C57A5",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    width: scale(200),
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});

export default DoctorPaymentFailure;
