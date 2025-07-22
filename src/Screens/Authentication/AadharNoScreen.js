import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms, vs } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../../Components/Button";
import { Icons } from "../../assets/icons/Icons";
import CustomTextInput from "../../Components/CustomTextInput";
import { validateAadharNo } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

const AadharNoScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [eNo, setEno] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (CheckValidation()) {
      if (isChecked === false) {
        Alert.alert("Alert", t("accept_terms_condtion"));
      } else {
        navigation.navigate("AadharOtpScreen");
      }
    }
  };

  const CheckValidation = () => {
    if (!validateAadharNo(number)) {
      setEno(t("please_enter_valid_aadhaar_number"));
      return false;
    }
    return true;
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader
        title={t("create_my_abha_address")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 20 }}>
          <Text style={styles.titleText}>
            {t("create_using_aadhaar_number")}
          </Text>
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <CustomTextInput
            keybordType={"numeric"}
            inputStyle={styles.customTextInput}
            fullContainerStyle={styles.fullContainerStyle}
            item_value={number}
            item_setValue={setNumber}
            errorMessage={eNo}
            setErrorMessage={setEno}
            isAadhar
          />
          <Text style={styles.otpText}>
            {t("enter_your_12_aadhaar_number")}
          </Text>

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

            <View style={{ flexDirection: "column", marginStart: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.resendText}>{t("i_agree_to_the")}</Text>
                <TouchableOpacity>
                  <Text style={styles.resendSubText}>
                    {t("terms_condtion")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.resendText}>{t("and")} </Text>
                <TouchableOpacity>
                  <Text style={styles.resendSubText}>
                    {t("aadhar_declaration")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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

export default AadharNoScreen;

const styles = StyleSheet.create({
  customTextInput: {
    fontSize: 14,
    padding: 15,
    fontFamily: "poppinsRegular",
    height: 57,
    //  marginTop: 15,
    borderColor: color.suffixgrey,
    borderWidth: 1.5,
  },

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
  fullContainerStyle: { marginHorizontal: 8, marginTop: 40 },
  resendSubText: {
    color: color.textBlue,

    fontFamily: "bold",
    fontSize: ms(10),
  },
  content: {
    marginTop: 50,
    flex: 1,
  },
  footer: {
    marginBottom: 40,
    padding: 10,
  },

  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 5,
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
