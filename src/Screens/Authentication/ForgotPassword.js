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
import { useState } from "react";
import { forgotpwdFailure, forgotpwdRequest, forgotpwdSuccess } from "../../features/auth/authSlice";
import { forgotPasswordAPI } from "../../Utils/api/auth";
import { useSelector } from "react-redux";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
import ToastService from "../../Utils/ToastService";
function ForgotPassword({ navigation }) {
  const { t } = useTranslation();
  const [errorMSG, setErrorMSG] = useState();
  const [email, setEmail] = useState("");

  const isValid = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.toString().trim().length === 0) {
      setErrorMSG(`Please enter ${t("forgot_password_placeholder")}`);
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMSG("Please enter a valid email address");
      return false;
    }
    return true;
  };


  const { forgotpwdloading } = useSelector((state) => state.auth);

  const handleSendCode = async () => {

    if (isValid()) {
      const data = {
        email: email,
      };
      showLoader();
      try {
        const response = await forgotPasswordAPI(data);
        console.log('forgotPasswordAPI Response:', response);
        if (response && (response.status === 200 || response.status === 201)) {
          ToastService.showSuccess('Success!', response.data.message ?? "OTP sent Successfully!")
          navigation.navigate("ForgotPasswordOTP", {
            emailValue: email,
          });
        } else {
          ToastService.showError('Error!', response.data.message || "Something Went Wrong")
          // dispatch(forgotpwdFailure(response.data.message));
        }
      } catch (error) {
        console.log('Error from login API call:', error.response ? error.response.data : error.message);
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
                text={t("forgot_password_q")}
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
                {t("forgot_password_desc")}
              </Text>
              <CustomTextInput
                label={t("forgot_password_placeholder")}
                fullContainerStyle={{ marginHorizontal: 0, marginTop: 20 }}
                inputContainer={{ marginTop: 5 }}
                labelTextColor={color.inputTextLabel}
                labelStyle={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  marginBottom: 2,
                }}
                inputStyle={{
                  borderColor: color.colorPrimary,
                }}
                errorMessage={errorMSG}
                setErrorMessage={setErrorMSG}
                item_value={email}
                item_setValue={setEmail}
              />
              <Button
                title={forgotpwdloading ? "Please wait..." : t("send_code")}
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
                  handleSendCode()
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: "45%",
              }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "interRegular",
                  fontSize: ms(14),
                }}
              >
                {t("remember_password")}
                <Text
                  style={{ color: color.colorPrimary, fontFamily: "interBold" }}
                >
                  {" " + t("login_in")}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default ForgotPassword;
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
});
