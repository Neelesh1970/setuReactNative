import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { ms, s } from "react-native-size-matters";

const CustomInputBox = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
  multiline = false,
  numberOfLines = 1,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && {
            height: ms(numberOfLines * 40),
            textAlignVertical: "top",
          }, // ← adjust height for multiline
          error && { borderColor: "#FF4D4D", borderWidth: 1.5 },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        contextMenuHidden={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInputBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(16),
  },
  label: {
    fontSize: s(14),
    fontWeight: "600",
    marginBottom: ms(6),
    color: "#0F45B1",
  },
  input: {
    height: ms(48),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: s(8),
    paddingHorizontal: ms(12),
    fontSize: s(14),
    color: "#000",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: s(12),
    marginTop: ms(4),
  },
});
