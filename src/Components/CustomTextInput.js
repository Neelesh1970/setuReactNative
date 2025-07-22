import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icons } from "../assets/icons/Icons";
import { color } from "../assets/colors/Colors";
import { ms, verticalScale } from "react-native-size-matters";

export default function CustomTextInput({
  placeholder,
  label,
  labelTextColor,
  labelStyle,
  inputStyle,
  isIcon,
  iconStyle,
  iconImageSrc,
  fullContainerStyle,
  inputContainer,
  iconText,
  iconTextStyle,
  keybordType,
  item_value,
  item_setValue,
  isPhoneNo = false,
  isAadhar = false,
  isPassword = false,
  isAbhaNo = false,
  isYear = false,
  isRegNo = false,
  isZipCode = false,
  isAccountNo = false,
  iconPress,
  errorMessage,
  setErrorMessage,
  onFocus,
  textLength,
  maxLength
}) {
  return (
    <View style={[styles.container, fullContainerStyle]}>
      {label ? (
        <Text style={[styles.labelText, { color: labelTextColor }, labelStyle]}>
          {label}
        </Text>
      ) : (
        ""
      )}
      <View style={[styles.inputContainer, inputContainer]}>
        <TextInput
          style={[styles.input, inputStyle]} // Adjust padding if icon is present
          placeholder={placeholder || ""}
          keyboardType={keybordType || "default"}
          value={item_value}
          onChangeText={(text) => {
            isPhoneNo ||
            isAadhar ||
            isYear ||
            isAbhaNo ||
            isRegNo ||
            isZipCode ||
            isAccountNo
              ? item_setValue(text.replace(/[^0-9]/g, ""))
              : item_setValue(text);
            setErrorMessage("");
          }}
          secureTextEntry={isPassword}
          onFocus={onFocus}
          maxLength={
            textLength
              ? textLength
              : isPhoneNo
              ? 10
              : isAadhar
              ? 12
              : isPassword
              ? 16
              : isYear
              ? 4
              : isAbhaNo
              ? 14
              : isZipCode
              ? 6
              : undefined
          }
          cursorColor={color.colorPrimary}
        />

        <TouchableOpacity style={styles.iconContainerStyle} onPress={iconPress}>
          {iconText ? (
            <Text style={[styles.iconTextStyle, iconTextStyle]}>
              {iconText}
            </Text>
          ) : (
            ""
          )}
          {isIcon && iconImageSrc && (
            <Image source={iconImageSrc} style={[styles.icon, iconStyle]} />
          )}
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  iconTextStyle: { color: color.suffixgrey, fontFamily: "poppinsRegular" },
  labelText: {},
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    // Adds space on the sides
  },
  input: {
    color: color.black,
    height: verticalScale(45),
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },

  iconContainerStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
  },

  inputContainer: {},
  icon: {
    width: 20,
    height: 20,
    tintColor: color.grey,
  },
  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: 4,
    fontFamily: "regular",
  },
});
