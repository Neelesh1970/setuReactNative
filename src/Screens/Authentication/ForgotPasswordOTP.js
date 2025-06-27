import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  StatusBar
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { moderateScale, ms, verticalScale } from "react-native-size-matters";
import SVGText from "../../Components/SvgText";
import { screenWidth } from "../../Utils/utils";
import CustomTextInput from "../../Components/CustomTextInput";
import Button from "../../Components/Button";
import { useEffect, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import ResendOtp from "../../Components/ResendOtp";
import { validateOTP_Length } from "../../Utils/utils";
import { StackActions } from "@react-navigation/native";
import { forgotPasswordAPI, forgotPswdVerifyAPI } from "../../Utils/api/auth";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
import ToastService from "../../Utils/ToastService";

function ForgotPasswordOTP({ navigation, route }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [eOtp, setEotp] = useState("");
  const [second, setSecond] = useState(30);
  const [enableResend, setEnableResend] = useState(false);

  const { emailValue } = route.params;

  useEffect(() => {
    console.log("Received email:", emailValue);
  }, [emailValue]);

  const restartTimer = () => {
    setSecond(30);
    setEnableResend(false);
  };
  const handleOtpTimer = () => {
    setEnableResend(true);
  };
  const CheckValidation = () => {
    if (!validateOTP_Length(otp, 4)) {
      setEotp(t("please_enter_valid_otp"));
      return false;
    } else {
      setEotp("");
      return true;
    }
  };
  const handleContinue = async () => {
    if (CheckValidation()) {
      const data =
      {
        "email": emailValue,
        "otp": Number(otp)

      }
      console.log("forgotPswdVerifyAPI data :" , data)
      showLoader();
      try {
        const response = await forgotPswdVerifyAPI(data);
        console.log('forgotPswdVerifyAPI Response:', response);

        if (response && (response.status === 200 || response.status === 201)) {
          ToastService.showSuccess('Success!', response.data.message || "OTP verify successful")
          navigation.dispatch(StackActions.replace("ResetPassword", {
            emailValue: emailValue,
          }));
        } else {
          Alert.alert(response.data.message || "Failed to verify request");
        }
      } catch (error) {
        console.log('Error from forgotPswdVerifyAPI API call:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.message) {
          ToastService.showError('Error!', error.response.data.message)
        } else {
          ToastService.showError('Error!', "An error occurred. Please try again later.")
        }
      } finally {
        hideLoader();
      }
    }
  };



  // const handleVerifyEmailCode = async () => {

  //   const data = {
  //     email: emailValue,
  //   };https://meet.google.com/txk-dkxo-brj

  //   try {
  //     const response = await forgotPasswordAPI(data);
  //     console.log('forgotPasswordAPI Response:', response);

  //     if (response && (response.status === 200 || response.status === 201)) {
  //       Alert.alert(response.data.message ?? "OTP Verify Successfully!");

  //     } else {
  //       Alert.alert(response.data.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message || "Failed to verify email code");
  //     console.log('Error from API call:', error.response ? error.response.data : error.message);
  //   }
  // };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <Loader />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <LinearGradient
            // Background Linear Gradient
            colors={[color.colorPrimary, color.colorSecondary]}
            style={styles.background}
          >
            <Image
              source={Icons.dotGroup}
              style={{
                height: ms(10),
                width: ms(40),
                marginStart: 20,
                marginTop: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconContainer}
            >
              <Image source={Icons.leftArrow} style={styles.icon} />
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.loginContainer}>
            <Image
              source={Icons.star}
              style={{
                height: ms(30),
                width: ms(30),
                position: "absolute",
                right: ms(15),
                top: ms(15),
              }}
            />
            <Image
              source={Icons.setu_logo_doc}
              style={{
                height: ms(43),
                width: ms(85),
                resizeMode: "contain",
                position: "absolute",
                margin: ms(15),
              }}
            />
            <View style={{ marginTop: "30%" }}>
              <SVGText
                text={t("please_check_your_email")}
                height={ms(35)}
                width={screenWidth}
                startColor={color.colorPrimary}
                endColor={color.colorSecondary}
                style={{
                  fontSize: ms(22),
                  fontFamily: "bold",
                  fontWeight: "700",
                }}
                isVertical={true}
              />
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(13),
                  color: color.black,
                }}
              >
                {`${t("we_sent_a_code_to")} '${route.params.emailValue}'`}
              </Text>
              <OTPTextInput
                tintColor={color.colorPrimary}
                handleTextChange={setOtp}
                inputCount={4}
                containerStyle={styles.otpContainerStyle}
                textInputStyle={styles.otpTextInputStyle}
              />
              {eOtp.length > 0 ? (
                <Text style={styles.errorText}>{eOtp}</Text>
              ) : null}
              <Button
                title={t("verify")}
                backgroundColor={color.colorPrimary}
                textColor={color.white}
                buttonStyle={{
                  marginStart: 0,
                  marginEnd: 0,
                  marginTop: 20,
                  height: ms(50),
                }}
                textStyle={{
                  fontFamily: "bold",
                  fontWeight: "700",
                  fontSize: ms(20),
                }}
                onPress={() => {
                  handleContinue();
                }}
              />
              <TouchableOpacity
                activeOpacity={enableResend ? 0.5 : 1}
                onPress={() => {
                  if (enableResend) {
                    restartTimer();
                  }
                }}
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  onPress={() => {
                    handleVerifyEmailCode()
                  }}
                  style={{
                    fontFamily: "interBold",
                    fontSize: ms(14),
                    color: color.black_alpha_70,
                    marginEnd: 5,
                  }}
                >
                  {t("send_code_again")}
                </Text>
                {!enableResend && (
                  <ResendOtp
                    second={second}
                    setSecond={setSecond}
                    handleTimer={handleOtpTimer}
                    containerStyle={{
                      marginTop: 0,
                      marginStart: 0,
                      minWidth: 60,
                    }}
                    testStyle={{
                      fontFamily: "interRegular",
                      fontSize: ms(14),
                      color: color.black_alpha_70,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default ForgotPasswordOTP;
const styles = StyleSheet.create({
  background: {
    height: "22%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(30),
    height: ms(30),
    marginStart: 20,
    marginTop: 10,
    //backgroundColor: "orange",
  },
  loginContainer: {
    position: "absolute",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: color.white,
    left: 0,
    right: 0,
    bottom: 0,
    top: "15%",
    padding: 20,
    flexDirection: "column",
  },
  icon: {
    width: ms(25),
    height: ms(25),
  },
  otpContainerStyle: {
    marginTop: ms(20),
    borderStyle: "solid",
    width: 0,
    gap: ms(15)
  },

  otpTextInputStyle: {
    width: screenWidth / 6,
    height: screenWidth / 6,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    // fontFamily: "regular",
    color: color.black,
    fontFamily: "interMedium",
    fontSize: ms(28),
  },
  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: 4,
    marginStart: 5,
    fontFamily: "regular",
  },
});
