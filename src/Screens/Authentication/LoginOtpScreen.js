import { Alert, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import { validateOTP } from "../../Utils/utils";
import { useTranslation } from "react-i18next";
import ResendOtp from "../../Components/ResendOtp";
import { forgotPasswordAPI, Otpwithlogin } from "../../Utils/api/auth";
import ToastService from "../../Utils/ToastService";
import { loginSuccess } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";

const LoginOtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [eOtp, setEotp] = useState("");
  const [second, setSecond] = useState(60);
  const [enableResend, setEnableResend] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { emailValue, loginType, type } = route.params || {}
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (otp.length === 4) {
      handleOtpVerify();
    }
  }, [otp]);

  const handleOtpVerify = async () => {
    if (CheckValidation()) {
      const data = {
        otp: otp,
        email: emailValue,
      };
      showLoader();
      try {
        const response = await Otpwithlogin(data);
        console.log("Login with Otp API Response:", response);

        if (response && (response.status === 200 || response.status === 201)) {
          if (type === "forgotpassword") {
            ToastService.showSuccess(t("success"), t("otp_verified"));
            navigation.navigate("ResetPassword", { email: emailValue });
          } else {
            try {
              await AsyncStorage.setItem("uhid", String(response.data.uhid));
              await AsyncStorage.setItem("user_id", String(response.data.user_id));
              await AsyncStorage.setItem("username", String(response.data.username));
            } catch (error) {
              console.log("Error storing data in AsyncStorage:", error);
            }
            ToastService.showSuccess(t("success"), response.data.message);
            navigation.reset({
              index: 0,
              routes: [{ name: "DashboardScreen" }],
            });

            dispatch(
              loginSuccess({
                token: response?.data?.token,
                user_id: response?.data?.user_id,
                refreshToken: response?.data?.refreshToken,
              })
            );
          }
        } else {
          ToastService.showError(t("error"), response.data.message);
          setOtp("");
          if (otpInputRef.current) {
            otpInputRef.current.clear();
          }
        }
      } catch (error) {
        ToastService.showError(
          t("error"),
          error.response?.data?.message || error.message || t("otp_verification_failed")
        );
        console.log("Error from API call:", error.response ? error.response.data : error.message);
        setOtp("");
        if (otpInputRef.current) {
          otpInputRef.current.clear();
        }
      } finally {
        hideLoader();
      }
    } else {
      setOtp("");
      if (otpInputRef.current) {
        otpInputRef.current.clear();
      }
    }
  };
  
  const handleResendOptLogin = async () => {
    if (!emailValue) {
      ToastService.showError(t("error"), t("email_not_found"));
      return;
    }

    showLoader();
    const data = {
      email: emailValue,
    };
    try {
      console.log("Resend OTP data input:", data);
      const response = await forgotPasswordAPI(data);
      console.log("Resend OTP Response:", response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        ToastService.showSuccess(t("success"), response.data.message ?? t("otp_sent_success"));
        setOtp("");
        if (otpInputRef.current) {
          otpInputRef.current.clear();
        }
        restartTimer();
        setEnableResend(false);
      } else {
        ToastService.showError(t("error"), response.data.message || t("something_went_wrong"));
      }
    } catch (error) {
      console.log("Error from Resend OTP call:", error.response ? error.response.data : error.message);
      ToastService.showError(
        t("error"),
        error.response?.data?.message || t("something_went_wrong")
      );
    } finally {
      hideLoader();
    }
  };

  const restartTimer = () => {
    setSecond(60);
    setEnableResend(false);
  };

  const handleOtpTimer = () => {
    setEnableResend(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const CheckValidation = () => {
    if (!validateOTP(otp)) {
      setEotp(t("please_enter_valid_otp"));
      return false;
    }
    setEotp("");
    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />
      <Loader />
      <LoginHeader
        title={t(type === "forgotpassword" ? "verify_otp" : "login_in_with_otp")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 20 }}>
          <Text style={styles.titleText}>
            {t(type === "forgotpassword" ? "verify_email_otp" : loginType === "email" ? "enter_email_otp" : "enter_mobile_otp")}
          </Text>
          <Text style={styles.subTitleText}>
            {t(type === "forgotpassword" ? "otp_sent_for_reset" : loginType === "email" ? "otp_sent_to_the_email" : "otp_sent_to_the_mobile_number")} {emailValue}
          </Text>
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <OTPTextInput
            key={enableResend ? "resend" : "initial"}
            tintColor={color.colorPrimary}
            handleTextChange={setOtp}
            inputCount={4}
            containerStyle={styles.otpContainerStyle}
            textInputStyle={styles.otpTextInputStyle}
            autoFocus={true}
          />
          <Text style={styles.otpText}>{t("enter_the_4_digit_otp")}</Text>
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
              <TouchableOpacity onPress={handleResendOptLogin}>
                <Text style={styles.resendSubText}>{" " + t("resend")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginOtpScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "regular",
    fontSize: ms(18),
  },
  subTitleText: {
    fontFamily: "regular",
    color: color.grey,
    fontSize: ms(12),
  },
  otpText: {
    fontFamily: "medium",
    color: color.grey,
    fontSize: ms(10),
    marginStart: ms(5),
  },
  otpContainerStyle: {
    borderStyle: "solid",
    padding: 25,
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
  resendText: {
    fontFamily: "medium",
    fontSize: ms(10),
  },
  resendSubText: {
    color: color.textBlue,
    fontFamily: "bold",
    fontSize: ms(10),
  },
  content: {
    marginTop: 50,
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: 4,
    marginStart: 5,
    fontFamily: "regular",
  },
});