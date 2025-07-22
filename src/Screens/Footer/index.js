import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

const Footer = ({ buttonText = "Continue", onPress }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    width: '90%',
    backgroundColor: "#1C57A5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    padding: ms(10)
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Footer;
