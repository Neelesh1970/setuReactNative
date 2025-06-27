import React from "react";
import { Svg, Defs, LinearGradient, Stop, Text } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import { color } from "../assets/colors/Colors";
function SVGText({
  text,
  startColor,
  endColor,
  width,
  height,
  style,
  isVertical = false,
}) {
  return (
    <Svg width={width} height={height}>
      <Defs>
        {/*  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"> */}
        <LinearGradient
          id="grad"
          x1="0%"
          y1="0%"
          x2={isVertical ? "0%" : "100%"}
          y2={isVertical ? "100%" : "0%"}
        >
          <Stop
            offset={isVertical ? "0%" : "0%"}
            stopColor={startColor}
            stopOpacity="1"
          />
          <Stop offset="100%" stopColor={endColor} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Text fill="url(#grad)" x="0%" y="50%" style={[styles.textStyle, style]}>
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
export default SVGText;
