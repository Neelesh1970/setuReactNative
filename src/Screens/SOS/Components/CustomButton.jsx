import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { s, vs } from "react-native-size-matters";

const CustomButton = ({
  title,
  onPress,
  type = "primary", // "primary" or "secondary"
  color = "#1C39BB",
  style,
  textStyle,
  disabled = false,
}) => {
  const isPrimary = type === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        {
          backgroundColor: isPrimary
            ? disabled
              ? "#cccccc"
              : color
            : "#FFFFFF",
          borderColor: disabled ? "#cccccc" : color,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      {disabled ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : color} />
      ) : (
        <Text
          style={[
            styles.textBase,
            {
              color: isPrimary ? "#FFFFFF" : color,
            },
            textStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: s(8),
    borderWidth: s(1),
    alignItems: "center",
    justifyContent: "center",
  },
  textBase: {
    fontSize: s(14),
    fontWeight: "500",
  },
});

export default CustomButton;
