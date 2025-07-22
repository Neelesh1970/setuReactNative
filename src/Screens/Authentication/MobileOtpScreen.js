import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../../Components/Button";
import { validateOTP } from "../../Utils/utils";
import { useTranslation } from "react-i18next";
import ResendOtp from "../../Components/ResendOtp";

const MobileOtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [eOtp, setEotp] = useState();
  const [second, setSecond] = useState(30);
  const [enableResend, setEnableResend] = useState(false);
  const { t } = useTranslation();
  const handleContinue = () => {
    if (CheckValidation()) {
      navigation.navigate("AadharImgScreen");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const restartTimer = () => {
    setSecond(30);
    setEnableResend(false);
  };
  const handleOtpTimer = () => {
    setEnableResend(true);
  };

  const CheckValidation = () => {
    if (!validateOTP(otp)) {
      setEotp(t("please_enter_valid_otp"));
      return false;
    }
    return true;
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
          <Text style={styles.titleText}>{t("enter_mobile_otp")}</Text>
          <Text style={styles.subTitleText}>
            {t("otp_sent_to_the_mobile_number")}
          </Text>
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <OTPTextInput
            tintColor={color.colorPrimary}
            handleTextChange={setOtp}
            inputCount={6}
            containerStyle={styles.otpContainerStyle}
            textInputStyle={styles.otpTextInputStyle}
          />
          <Text style={styles.otpText}>{t("enter_the_6_digit_otp")}</Text>
          {eOtp ? <Text style={styles.errorText}>{eOtp}</Text> : null}

          {!enableResend && (
            <ResendOtp
              second={second}
              setSecond={setSecond}
              handleTimer={handleOtpTimer}
            />
          )}
          {enableResend && (
            <View style={styles.resendTextContainer}>
              <Text style={styles.resendText}>
                {t("didn’t_receive_the_otp")}
              </Text>
              <TouchableOpacity onPress={restartTimer} disabled={!enableResend}>
                <Text style={styles.resendSubText}>{" " + t("resend")}</Text>
              </TouchableOpacity>
            </View>
          )}
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

export default MobileOtpScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "regular",
    fontSize: ms(18),
  },

  subTitleText: { fontFamily: "regular", color: color.grey, fontSize: ms(10) },
  otpText: {
    fontFamily: "medium",
    color: color.grey,
    fontSize: ms(10),
    marginStart: ms(5),
  },

  otpContainerStyle: {
    marginTop: 20,
    borderStyle: "solid",
  },

  otpTextInputStyle: {
    width: ms(45),
    height: ms(45),
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
  },

  resendTextContainer: {
    flexDirection: "row",
    marginStart: ms(5),
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

    flex: 1, // Allow content to take up available space
  },
  footer: {
    marginBottom: 40,
    padding: 10,
  },

  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: 4,
    marginStart: 5,
    fontFamily: "regular",
  },
});
