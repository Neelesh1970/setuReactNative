import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms, verticalScale } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../../Components/Button";
import CustomTextInput from "../../Components/CustomTextInput";
import { Icons } from "../../assets/icons/Icons";

import moment from "moment";
import {
  validateAabhaNo,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateTextField,
  validateYear,
} from "../../Utils/utils";
import { useTranslation } from "react-i18next";

const AbhaLoginScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [yob, setYob] = useState("");

  const [eNumber, seteNumber] = useState();
  const [eEmail, seteEmail] = useState();
  const [eyob, seteYob] = useState();

  const [isChecked, setIsChecked] = useState(false);
  const [isEmailSelected, setIsEmailSelected] = useState(true);
  const { t } = useTranslation();

  const handleContinue = () => {
    if (CheckValidation()) {
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // const CheckValidation = () => {
  //   if (!validateAadharNo(number)) {
  //     setEno(t("please_enter_valid_aadhaar_number"));
  //     return false;
  //   }
  //   return true;
  // };

  const CheckValidation = () => {
    if (isEmailSelected) {
      if (!validateTextField(email)) {
        seteEmail(t("please_enter_abha_email"));
        return false;
      }
    } else {
      if (!validateAabhaNo(number)) {
        console.log("yeh hai number ", number);
        seteNumber(t("please_enter_abha_number"));
        return false;
      } else if (!validateYear(yob)) {
        seteYob(t("please_enter_yob"));
        return false;
      }
    }
    return true;
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleNumber = () => {
    setIsEmailSelected(false);
  };

  const toggleEmail = () => {
    setIsEmailSelected(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader
        title={t("login_with_abha_address")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 20 }}>
          <Text style={styles.titleText}>{t("login_with_abha_address")}</Text>
          <View style={{ flexDirection: "row", gap: 30, marginTop: 15 }}>
            <TouchableOpacity style={{}} onPress={toggleEmail}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={
                    isEmailSelected
                      ? Icons.filled_checkbox
                      : Icons.empty_checkbox
                  }
                  style={{ height: 15, width: 15 }}
                />
                <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
                  {t("by_abha_address")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{}} onPress={toggleNumber}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={
                    !isEmailSelected
                      ? Icons.filled_checkbox
                      : Icons.empty_checkbox
                  }
                  style={{ height: 15, width: 15 }}
                />
                <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
                  {t("by_abha_number")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 15 }}>
          {isEmailSelected ? (
            <>
              <CustomTextInput
                inputStyle={styles.customTextInput}
                fullContainerStyle={styles.fullContainerStyle}
                placeholder={t("abha_address")}
                iconText={t("@abam")}
                item_value={email}
                item_setValue={setEmail}
                placeholderTextColor={color.placeHolderText}
                errorMessage={eEmail}
                setErrorMessage={seteEmail}
              />

              <Text style={styles.otpText}>
                {t("abha_address_is_your_self_declared_username_used_to_login")}
              </Text>
            </>
          ) : (
            <>
              <CustomTextInput
                keybordType={"numeric"}
                inputStyle={styles.customTextInput}
                fullContainerStyle={styles.fullContainerStyle}
                placeholder={t("abha_number")}
                //   iconText={"@abam"}
                item_value={number}
                item_setValue={setNumber}
                placeholderTextColor={color.placeHolderText}
                errorMessage={eNumber}
                setErrorMessage={seteNumber}
                isAbhaNo
              />
              <Text style={styles.otpText}>
                {t("abha_number_is_a_unique_14_digit_number_identity_number")}
              </Text>

              <CustomTextInput
                keybordType={"numeric"}
                inputStyle={styles.customTextInput}
                fullContainerStyle={styles.fullContainerStyle}
                placeholder={t("yob")}
                //   iconText={"@abam"}
                item_value={yob}
                item_setValue={setYob}
                placeholderTextColor={color.placeHolderText}
                errorMessage={eyob}
                setErrorMessage={seteYob}
                isYear
              />
            </>
          )}

          <View style={styles.resendTextContainer}>
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                isChecked ? styles.checkboxChecked : "",
              ]}
              onPress={toggleCheckbox}
            >
              <Image
                source={Icons.tickMark}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: isChecked ? color.white : color.black,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.resendText}>{t("i_agree_to_the")}</Text>
            <TouchableOpacity>
              <Text style={styles.resendSubText}>{t("terms_condtion")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={{ marginHorizontal: 30 }}>
          <Button
            title={t("continue")}
            backgroundColor={color.colorPrimary}
            textColor={color.white}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AbhaLoginScreen;

const styles = StyleSheet.create({
  customTextInput: {
    fontSize: 14,
    padding: 15,
    fontFamily: "poppinsRegular",
    height: 57,

    borderColor: color.suffixgrey,
    borderWidth: 1.5,
  },

  fullContainerStyle: { marginHorizontal: 8, marginTop: 25 },

  titleText: {
    fontFamily: "regular",
    fontSize: ms(18),
  },

  subTitleText: {
    fontFamily: "regular",
    color: color.grey,
    fontSize: ms(12),
    paddingStart: ms(3),
  },
  otpText: {
    fontFamily: "medium",
    color: color.grey,
    fontSize: ms(10),
    marginStart: 10,
  },
  resendTextContainer: {
    flexDirection: "row",
    marginStart: ms(10),
    marginTop: ms(30),
    alignItems: "center",
  },
  resendText: { fontFamily: "medium", fontSize: ms(10) },
  resendSubText: {
    color: color.textBlue,
    marginStart: 2,
    fontFamily: "bold",
    fontSize: ms(10),
  },
  content: {
    marginTop: 50,

    // flex: 1,
  },
  footer: {
    marginBottom: 40,
    padding: 10,
    marginTop: 30,
  },

  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 10,
  },

  checkboxTick: {
    fontSize: 12,
    color: color.black,
  },

  checkboxChecked: {
    backgroundColor: color.black,
  },

  checkboxTickChecked: {
    color: color.white,
  },
});
