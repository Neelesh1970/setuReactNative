import React from "react";
import { Svg, Defs, LinearGradient, Stop, Text } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import { color } from "../assets/colors/Colors";
function SVGRotate({ text, width, height, style, rotate_deg }) {
  return (
    <Svg width={width} height={height}>
      <Text
        fill={color.white}
        x={width / 2}
        y={height / 2}
        style={[styles.textStyle, style]}
        transform={`rotate(${rotate_deg},${width / 2}, ${height / 2})`}
        textAnchor={"middle"}
      >
        {text}
      </Text>
    </Svg>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: "medium",
  },
});
export default SVGRotate;
