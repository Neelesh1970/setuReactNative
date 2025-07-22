import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const AddMoreTestButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add More Tests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#E0EEFF", // Light blue background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#0A3D91", // Dark blue text color
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default AddMoreTestButton;
