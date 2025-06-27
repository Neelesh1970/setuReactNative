import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  StatusBar
} from "react-native";
import { color } from "../../../assets/colors/Colors";
import { Icons } from "../../../assets/icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { moderateScale, ms, verticalScale } from "react-native-size-matters";
import { getItem, screenWidth } from "../../../Utils/utils";
import CustomTextInput from "../../../Components/CustomTextInput";
import Button from "../../../Components/Button";
import { validatePassword } from "../../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordApi } from "../../../Utils/api/auth";
import { hideLoader, showLoader } from "../../../Utils/Loader";
import ToastService from "../../../Utils/ToastService";

function NewChangePassword({ 
  navigation, 
  currentPasswordPlaceholder = "Enter current password",
  newPasswordPlaceholder = "Enter new password",
  confirmPasswordPlaceholder = "Confirm new password"
}) {
  const { t } = useTranslation();

  const token = useSelector((state) => state.auth.token);

  const { loading } = useSelector((state) => state.auth);

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newpassword, SetNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [userID, setUserID] = useState(null);
  
  // State for error messages
  const [eCurrentPassword, setECurrentPassword] = useState('');
  const [ePassword, setEpassword] = useState('');
  const [eConfirmPassword, setEconfirmPassword] = useState('');
  
  // State for password visibility
  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isC_PasswordVisible, setC_PasswordVisible] = useState(false);


    useEffect(() => {
      const fetchUserID = async () => {
        const id = await getItem('userID');
        if (id) {
          setUserID(id);
        }
      };
      fetchUserID();
    }, []);

  // Toggle password visibility functions
  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setC_PasswordVisible(!isC_PasswordVisible);
  };

  // Validation function
  const CheckValidation = () => {
    let isValid = true;
    
    // Reset previous error messages
    setECurrentPassword('');
    setEpassword('');
    setEconfirmPassword('');

    // Validate current password
    if (!currentPassword.trim()) {
      setECurrentPassword(t("please enter current password"));
      isValid = false;
    }
    if (!validatePassword(currentPassword)) {
        setECurrentPassword(t("please enter current password"));
        isValid = false;
      }
    // Validate new password
    if (!validatePassword(newpassword)) {
      setEpassword(t("please_enter_password"));
      isValid = false;
    } 
    if (!validatePassword(confirmPassword)) {
        setEconfirmPassword(t("please_enter_password"));
        isValid = false;
      }

    // Validate password match
    if (newpassword !== confirmPassword) {
      setEconfirmPassword(t("password_not_matched"));
      isValid = false;
    }

    return isValid;
  };

  const handelchangepassword = async () => {
    console.log("Change Password Button Pressed"+currentPassword, newpassword, confirmPassword);
    if (CheckValidation()) {
      const data = {
        'user_id': userID,
        "password": String(currentPassword),
        "newPassword": String(newpassword),

      };
      
      console.log("CheckValidation", CheckValidation());
      console.log("data api ", data);

      showLoader();
  
      try {
        const response = await changePasswordApi(data); 
        console.log("API Response changePasswordApi:", response?.data?.hasError);
        console.log("API Response changePasswordApi:", response.data);

  
        if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
          ToastService.showSuccess("Success!", response.data.message || "Change Password Successful!");
  
          navigation.reset({
            index: 0,
            routes: [{ name: "DashboardScreen" }],
          });

        } else {
          ToastService.showError("Error!", response.data.message || "Change Password Failed");
        }
      } catch (error) {
        console.log("Error from login API call:", error);
  
        ToastService.showError(
          "Error!",
          error.response?.data?.message || "An error occurred. Please try again later."
        );
      } finally {
        hideLoader();
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <LinearGradient
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
                <Text
                  style={{
                    fontSize: ms(22),
                    fontFamily: "bold",
                    fontWeight: "700",
                    color: color.black,
                    marginBottom: 10,
                  }}
                >
                  {t("change_password")}
                </Text>
                
                <CustomTextInput
                  label={t("current_password")}
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
                  errorMessage={eCurrentPassword}
                  setErrorMessage={setECurrentPassword}
                  item_value={currentPassword}
                  item_setValue={setCurrentPassword}
                  placeholder={currentPasswordPlaceholder}
                  isPassword={!isCurrentPasswordVisible}
                  iconPress={toggleCurrentPasswordVisibility}
                  isIcon={true}
                  iconImageSrc={
                    isCurrentPasswordVisible
                      ? Icons.password_eye
                      : Icons.password_eye_slash
                  }
                />

                <CustomTextInput
                  label={t("new_password")}
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
                  errorMessage={ePassword}
                  setErrorMessage={setEpassword}
                  item_value={newpassword}
                  item_setValue={SetNewPassword}
                  placeholder={newPasswordPlaceholder}
                  isPassword={!isPasswordVisible}
                  iconPress={togglePasswordVisibility}
                  isIcon={true}
                  iconImageSrc={
                    isPasswordVisible
                      ? Icons.password_eye
                      : Icons.password_eye_slash
                  }
                />

                
                <CustomTextInput
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
                  placeholder={confirmPasswordPlaceholder}
                  isPassword={!isC_PasswordVisible}
                  iconPress={toggleConfirmPasswordVisibility}
                  isIcon={true}
                  iconImageSrc={
                    isC_PasswordVisible
                      ? Icons.password_eye
                      : Icons.password_eye_slash
                  }
                />
                
                <Button
                  title={t("change_password")}
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
                  onPress={handelchangepassword}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default NewChangePassword;

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