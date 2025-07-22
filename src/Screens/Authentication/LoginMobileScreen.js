import { Alert, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import CustomTextInput from "../../Components/CustomTextInput";
import Button from "../../Components/Button";
import { useTranslation } from "react-i18next";
import { forgotPasswordAPI } from "../../Utils/api/auth";
import ToastService from "../../Utils/ToastService";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";

const LoginMobileScreen = ({ navigation, route}) => {
  const { type = "login" } = route.params || {};
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const { t } = useTranslation();

  const handleOptLogin = async () => {
    if (isValid()) {
      if (loginType === "email") {
        const data = { email: email };
        showLoader();
        try {
          const response = await forgotPasswordAPI(data);
          console.log('forgotPasswordAPI Response:', response);
          if (response && (response.status === 200 || response.status === 201)) {
            ToastService.showSuccess('Success!', response.data.message ?? "OTP sent Successfully!");
            navigation.navigate("LoginOtpScreen", { emailValue: email , loginType: loginType, type: type});
          } else {
            ToastService.showError('Error!', response.data.message || "Something Went Wrong");
          }
        } catch (error) {
          console.log('Error from login API call:', error.response ? error.response.data : error.message);
          ToastService.showError('Error!', error.response?.data?.message || "An error occurred. Please try again later.");
        } finally {
          hideLoader();
        }
      } else {
        ToastService.showInfo('Info', 'Mobile number login coming soon!');
      }
    }
  };

const isValid = () => {
    if (loginType === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email.trim().length === 0) {
        setErrorMSG(`Please enter ${t(type === "forgotpassword" ? "forgot_password_placeholder" : "email_placeholder")}`);
        return false;
      }
      if (!emailRegex.test(email)) {
        setErrorMSG("Please enter a valid email address");
        return false;
      }
    } else {
      const mobileRegex = /^\d{10}$/;
      if (mobile.trim().length === 0) {
        setErrorMSG("Please enter mobile number");
        return false;
      }
      if (!mobileRegex.test(mobile)) {
        setErrorMSG("Mobile number must be exactly 10 digits");
        return false;
      }
    }
    setErrorMSG("");
    return true;
  };

  const handleMobileChange = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setMobile(cleanedValue);
  };

  
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />
      <Loader />

      <LoginHeader
        title={t(type === "forgotpassword" ? "forgot_password" : "login_with_email_Mobile")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 20 }}>
          <Text style={styles.titleText}>
            {t(type === "forgotpassword" ? "enter_email_for_otp" : "enter_email_address_otp")}
          </Text>
        </View>

        {/* Login Type Selection */}
        {/* <View style={styles.loginTypeContainer}>
          <TouchableOpacity
            style={[
              styles.loginTypeButton,
              loginType === "email" && styles.activeLoginType,
            ]}
            onPress={() => setLoginType("email")}
          >
            <Text
              style={[
                styles.loginTypeText,
                loginType === "email" && styles.activeLoginTypeText,
              ]}
            >
              {t("email")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.loginTypeButton,
              loginType === "mobile" && styles.activeLoginType,
            ]}
            onPress={() => setLoginType("mobile")}
          >
            <Text
              style={[
                styles.loginTypeText,
                loginType === "mobile" && styles.activeLoginTypeText,
              ]}
            >
              {t("mobile")}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Input Field */}
        <View style={{ marginHorizontal: 15 }}>
          {loginType === "email" ? (
            <CustomTextInput
              label={t(type === "forgotpassword" ? "forgot_password_email_otp_placeholder" : "email_placeholder")}
              fullContainerStyle={{ marginHorizontal: 0, marginTop: 20 }}
              inputContainer={{ marginTop: 5 }}
              labelTextColor={color.inputTextLabel}
              labelStyle={{
                fontFamily: "bold",
                fontSize: ms(14),
                marginBottom: 2,
                marginTop: 15
              }}
              inputStyle={{
                borderColor: color.colorPrimary,
              }}
              errorMessage={errorMSG}
              setErrorMessage={setErrorMSG}
              item_value={email}
              item_setValue={setEmail}
            />
          ) : (
            <CustomTextInput
              label={t("mobile_number")}
              fullContainerStyle={{ marginHorizontal: 0, marginTop: 20 }}
              inputContainer={{ marginTop: 5 }}
              labelTextColor={color.inputTextLabel}
              labelStyle={{
                fontFamily: "bold",
                fontSize: ms(14),
                marginBottom: 2,
                marginTop: 15
              }}
              inputStyle={{
                borderColor: color.colorPrimary,
              }}
              errorMessage={errorMSG}
              setErrorMessage={setErrorMSG}
              item_value={mobile}
              item_setValue={handleMobileChange}
              keybordType="numeric"
            />
          )}

          <Button
            title={t("send_code")}
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
            onPress={handleOptLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginMobileScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "regular",
    fontSize: ms(18),
  },
  content: {
    marginTop: 50,
    flex: 1,
  },
  loginTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 15,
  },
  loginTypeButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: color.colorPrimary,
    borderRadius: 5,
    alignItems: "center",
  },
  activeLoginType: {
    backgroundColor: color.colorPrimary,
  },
  loginTypeText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.colorPrimary,
  },
  activeLoginTypeText: {
    color: color.white,
  },
});