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
  ScrollView,
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
import { validatePassword } from "../../Utils/utils";
import { StackActions } from "@react-navigation/native";
import { resetpswdAPI } from "../../Utils/api/auth";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
function ResetPassword({ navigation, route }) {
  const { t } = useTranslation();
  const [password, setPassword] = useState();
  const [ePassword, setEpassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [eConfirmPassword, setEconfirmPassword] = useState();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isC_PasswordVisible, setC_PasswordVisible] = useState(false);
  const { email } = route.params;

  console.log("email", email);

  const ChangePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const ChangeC_PasswordVisibility = () => {
    setC_PasswordVisible(!isC_PasswordVisible);
  };

  const CheckValidation = () => {
    var isValid = [];

    var msg = "";
    if (!validatePassword(password)) {
      isValid.push(false);
      msg = t("please_enter_password");
      setEpassword(msg);
    }
    if (password != confirmPassword) {
      isValid.push(false);
      msg = t("password_not_matched");
      setEconfirmPassword(msg);
    }

    if (isValid.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleResetPswd = async () => {
    if (CheckValidation()) {
      const inputData = {
        email: email,
        newPassword: password,
      };
      showLoader();
      try {
        const response = await resetpswdAPI(inputData);
        console.log('resetpswdAPI Response:', response);

        if (response && (response.status === 200 || response.status === 201)) {
          Alert.alert(response.data.message || "Password reset successful");
          navigation.dispatch(StackActions.replace("PasswordChangeSuccess"));
        } else {
          Alert.alert(response.data.message || "Failed to reset password");
        }
      } catch (error) {
        console.log('Error from resetpswdAPI API call:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.message) {
          Alert.alert(error.response.data.message);
        } else {
          Alert.alert("An error occurred. Please try again later.");
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
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={{ marginTop: "30%" }}>
                <SVGText
                  text={t("reset_password")}
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
                  {`${t("please_type_something")}`}
                </Text>
                <CustomTextInput
                  textLength={20}
                  label={t("new_password")}
                  fullContainerStyle={{ marginHorizontal: 0, marginTop: 20 }}
                  inputContainer={{ marginTop: 5 }}
                  labelTextColor={color.inputTextLabel}
                  labelStyle={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                    marginTop: 30,
                  }}
                  inputStyle={{
                    borderColor: color.resetpas_gray,
                    borderRadius: ms(10),
                    padding: 16,
                  }}
                  errorMessage={ePassword}
                  setErrorMessage={setEpassword}
                  item_value={password}
                  item_setValue={setPassword}
                  placeholder={t("must_be_8_characters")}
                  isPassword={!isPasswordVisible}
                  iconPress={ChangePasswordVisibility}
                  isIcon={true}
                  iconImageSrc={
                    isPasswordVisible
                      ? Icons.password_eye
                      : Icons.password_eye_slash
                  }
                />
                <CustomTextInput
                  textLength={20}
                  label={t("confirm_new_password")}
                  fullContainerStyle={{ marginHorizontal: 0, marginTop: 20 }}
                  inputContainer={{ marginTop: 5 }}
                  labelTextColor={color.inputTextLabel}
                  labelStyle={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                  }}
                  inputStyle={{
                    borderColor: color.resetpas_gray,
                    borderRadius: ms(10),
                    padding: 16,
                  }}
                  errorMessage={eConfirmPassword}
                  setErrorMessage={setEconfirmPassword}
                  item_value={confirmPassword}
                  item_setValue={setConfirmPassword}
                  placeholder={t("reset_password")}
                  isPassword={!isC_PasswordVisible}
                  iconPress={ChangeC_PasswordVisibility}
                  isIcon={true}
                  iconImageSrc={
                    isC_PasswordVisible
                      ? Icons.password_eye
                      : Icons.password_eye_slash
                  }
                />
                <Button
                  title={t("reset_password")}
                  backgroundColor={color.colorPrimary}
                  textColor={color.white}
                  buttonStyle={{
                    marginStart: 0,
                    marginEnd: 0,
                    marginTop: 20,
                    height: ms(50),
                    borderRadius: ms(10),
                  }}
                  textStyle={{
                    fontFamily: "bold",
                    fontWeight: "700",
                    fontSize: ms(20),
                  }}
                  onPress={() => {
                    handleResetPswd()
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default ResetPassword;
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
    marginTop: ms(30),
    borderStyle: "solid",
    width: 0,
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
