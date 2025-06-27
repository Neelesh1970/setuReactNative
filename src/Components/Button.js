import React from "react";
import { color } from "../assets/colors/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function Button({
  title,
  onPress,
  backgroundColor,
  textColor,
  buttonStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor: backgroundColor }, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginStart: ms(10),
    marginEnd: ms(10),
    height: ms(40),
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: ms(16),
    fontFamily: "bold",
  },
});
