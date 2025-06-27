import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../../Components/Button";
import CustomTextInput from "../../Components/CustomTextInput";
import { Icons } from "../../assets/icons/Icons";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../Utils/utils";
import { useTranslation } from "react-i18next";
import ToastService from "../../Utils/ToastService";

const MobileNoScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [eNo, setEno] = useState();
  const { t } = useTranslation();
  const handleContinue = () => {
    if (CheckValidation()) {
      if (isChecked === false) {
        ToastService.showError('Error!',t("accept_terms_condtion"))
      } else {
        navigation.navigate("MobileOtpScreen");
      }
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const CheckValidation = () => {
    if (!validatePhoneNumber(number)) {
      setEno(t("please_enter_valid_mobile_number"));
      return false;
    }
    return true;
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader
        title={t("creating_new_abha_address")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 20 }}>
          <Text style={styles.titleText}>{t("enter_your_mobile_number")}</Text>
          <Text style={styles.subTitleText}>
            {t("enter_mobile_number_to_create_abha_address")}
          </Text>
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <CustomTextInput
            keybordType={"numeric"}
            inputStyle={styles.customTextInput}
            fullContainerStyle={styles.fullContainerStyle}
            placeholder={t("enter_number")}
            item_value={number}
            item_setValue={setNumber}
            placeholderTextColor={color.placeHolderText}
            errorMessage={eNo}
            setErrorMessage={setEno}
            isPhoneNo
          />
          <Text style={styles.otpText}>
            {t("we_have_pre_filled_your_practo_number")}
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

            <Text style={styles.resendText}>{t("i_agree_to_the")} </Text>
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

export default MobileNoScreen;

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
    fontSize: ms(10),
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
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
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
