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
  StatusBar,
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import GradientText from "../../Components/GradientText";
import { moderateScale, ms, verticalScale } from "react-native-size-matters";
import Button from "../../Components/Button";
import CustomTextInput from "../../Components/CustomTextInput";
import {
  validateEmail,
  validatePassword,
  areAllValuesTrue,
  storeItem,
  getItem,
} from "../../Utils/utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DropShadow from "react-native-drop-shadow";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../features/counter/counterSlice";
import { loginUser } from "../../Utils/api/auth";
import { loginRequest, loginSuccess } from "../../features/auth/authSlice";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
import Toast from "react-native-toast-message";
import ToastService from "../../Utils/ToastService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

export default function LoginScreen({ navigation, route }) {
  const hideModal = route.params?.hideModal ?? false;
  console.log("hideModal", hideModal);

  const [loginType, setLoginType] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorIdentifier, setErrorIdentifier] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserID = async () => {
      const data = await getItem('languagepopup');
      console.log('languagepopup', data)
      if (data === 'true') {
        setOpen(false); 
      } else {
        setOpen(true); 
      }
    };
    fetchUserID();
  }, []);


  const showpopup = useMemo(() => {
          return open
  },[open])

  console.log("hideModal open", showpopup);




  useEffect(() => {
    console.log("token", token);
    console.log("loading", loading);
  }, [token, loading]);

  const resetData = () => {
    setIdentifier("");
    setPassword("");
  };

  const OnLoginBtnPress = async () => {
    if (CheckValidation()) {
      const data = {
        email: loginType === "email" ? identifier : "",
        uhid: loginType === "uhid" ? identifier : "",
        password: password,
      };
      console.log("data", data);
      showLoader();
      try {
        const response = await loginUser(data);
        console.log("API Response:", response);
        if (response && (response.status === 200 || response.status === 201)) {
          ToastService.showSuccess(
            "Success!",
            response.data.message || "Login Successful!"
          );
          dispatch(
            loginSuccess({
              token: response?.data?.token,
              uhid: response?.data?.uhid,
              user_id: response?.data?.user_id,
              refreshToken: response?.data?.refreshToken,
            })
          );
          const username = response.data.username;
          console.log("username", username);
          try {
            await AsyncStorage.setItem("uhid", String(response.data.uhid));
            await AsyncStorage.setItem(
              "user_id",
              String(response.data.user_id)
            );
            await AsyncStorage.setItem(
              "username",
              String(response.data.username)
            );
          } catch (error) {
            console.log("Error storing data in AsyncStorage:", error);
          }
          navigation.reset({
            index: 0,
            routes: [{ name: "DashboardScreen" }],
          });
          resetData();
        } else {
          ToastService.showError(
            "Error!",
            response.data.message || "Login Failed"
          );
        }
      } catch (error) {
        console.log("Error from login API call:", error);
        ToastService.showError(
          "Error!",
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An error occurred. Please try again later."
        );
      } finally {
        hideLoader();
      }
    }
  };

  const ChangePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const CheckValidation = () => {
    var validArray = [];
    if (loginType === "email") {
      if (!validateEmail(identifier)) {
        setErrorIdentifier(t("please_enter_email"));
        validArray.push(false);
      } else {
        setErrorIdentifier("");
      }
    } else {
      if (!identifier) {
        setErrorIdentifier(t("please_enter_uhid"));
        validArray.push(false);
      } else {
        setErrorIdentifier("");
      }
    }
    if (!validatePassword(password)) {
      setErrorPassword(t("please_enter_password"));
      validArray.push(false);
    } else {
      setErrorPassword("");
    }
    return validArray.length === 0;
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
          </LinearGradient>
          <View style={styles.loginContainer}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: ms(0) }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ margin: ms(25, 0.3) }}>
                <GradientText text={t("login_in")} scale={false} />
              </View>
              <Image
                source={Icons.setu_logo}
                style={{
                  height: ms(50),
                  width: ms(100),
                  position: "absolute",
                  left: ms(20),
                  top: ms(20),
                }}
              />
              <Image
                source={Icons.star}
                style={{
                  height: ms(30),
                  width: ms(30),
                  position: "absolute",
                  right: ms(10),
                  top: ms(20),
                }}
              />
              <View
                style={{
                  justifyContent: "space-between",
                  flex: 1,
                  marginBottom: ms(30),
                }}
              >
                <View>
                  {/* Login type toggle Section */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setLoginType("email");
                        setIdentifier("");
                        setErrorIdentifier("");
                      }}
                      style={[
                        styles.tab,
                        loginType === "email" && styles.selectedTab,
                      ]}
                    >
                      <Text style={styles.tabText}>
                        {t("login_with_email")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setLoginType("uhid");
                        setIdentifier("");
                        setErrorIdentifier("");
                      }}
                      style={[
                        styles.tab,
                        loginType === "uhid" && styles.selectedTab,
                      ]}
                    >
                      <Text style={styles.tabText}>{t("login_with_uhid")}</Text>
                    </TouchableOpacity>
                  </View>

                  <CustomTextInput
                    label={loginType === "email" ? t("E_mail") : t("UHID")}
                    labelTextColor={color.inputTextLabel}
                    labelStyle={{
                      fontFamily: "bold",
                      fontSize: ms(14),
                      marginBottom: 2,
                    }}
                    inputStyle={{
                      borderColor: color.colorPrimary,
                    }}
                    item_value={identifier}
                    item_setValue={setIdentifier}
                    errorMessage={errorIdentifier}
                    setErrorMessage={setErrorIdentifier}
                  />

                  {/* Password input */}
                  <CustomTextInput
                    label={t("password")}
                    labelTextColor={color.inputTextLabel}
                    labelStyle={{
                      fontFamily: "bold",
                      fontSize: ms(14),
                      marginBottom: 2,
                    }}
                    iconImageSrc={
                      isPasswordVisible
                        ? Icons.password_eye
                        : Icons.password_eye_slash
                    }
                    isIcon={true}
                    inputStyle={{
                      borderColor: color.colorPrimary,
                    }}
                    item_value={password}
                    item_setValue={setPassword}
                    isPassword={!isPasswordVisible}
                    iconPress={ChangePasswordVisibility}
                    errorMessage={errorPassword}
                    setErrorMessage={setErrorPassword}
                  />

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("LoginMobileScreen", { type: "forgotpassword" })}
                    style={{
                      paddingBottom: 10,
                      alignSelf: "flex-end",
                      marginHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: color.colorPrimary,
                        fontFamily: "bold",
                      }}
                    >
                      {t("forgot_password")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Button
                    title={loading ? "Loading.." : t("login_in")}
                    backgroundColor={color.colorPrimary}
                    textColor={color.white}
                    onPress={OnLoginBtnPress}
                  />
                  <Text
                    style={{
                      color: color.black,
                      fontFamily: "bold",
                      textAlign: "center",
                      marginBottom: ms(10),
                    }}
                  >
                    OR
                  </Text>
                  <Button
                    title={t("login_in_with_otp")}
                    backgroundColor={color.colorPrimary}
                    textColor={color.white}
                    onPress={() => navigation.navigate("LoginMobileScreen")}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginBottom: ms(30),
                      marginStart: ms(10),
                      marginEnd: ms(10),
                    }}
                  >
                    <Text
                      style={{
                        color: color.black_alpha_70,
                        fontFamily: "medium",
                        alignSelf: "center",
                      }}
                    >
                      {t("dont_have_account")}{" "}
                      <TouchableOpacity
                        style={{
                          marginBottom: ms(7),
                        }}
                        onPress={() => navigation.navigate("Registration")}
                      >
                        <Text
                          style={{
                            color: color.colorPrimary,
                            textDecorationLine: "underline",
                            fontFamily: "medium",
                          }}
                        >
                          {t("create_account")}
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <Modal
          animationType="slide"
          visible={open}
          transparent={true}
          onRequestClose={() => setOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Image
                source={Icons.language_image}
                style={{
                  height: moderateScale(150),
                  width: moderateScale(150),
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(18),
                  color: color.colorPrimary,
                }}
              >
                {t("select_your_language")}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(12),
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {t("select_language_detail")}
              </Text>
              <DropShadow style={styles.shadowProp}>
                <SelectDropdown
                  data={["English"]}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && {
                            backgroundColor: color.language_dropdown_background,
                          }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                      </View>
                    );
                  }}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    storeItem("languagepopup", 'true')
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text
                          style={
                            selectedItem
                              ? styles.dropdownButtonTxtStyle
                              : styles.dropdownDefaultTxt
                          }
                        >
                          {selectedItem || t("select")}
                        </Text>
                        <FontAwesome
                          name="chevron-down"
                          color="#000"
                          style={styles.dropdownButtonArrowStyle}
                        />
                      </View>
                    );
                  }}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </DropShadow>
              <Button
                backgroundColor={color.colorPrimary}
                title={t("select")}
                buttonStyle={{
                  width: 140,
                  marginBottom: 0,
                  marginTop: verticalScale(20),
                  height: verticalScale(35),
                }}
                textColor={color.white}
                onPress={() => setOpen(false)}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "22%",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  dropdownButtonTxtStyle: {
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.black,
  },
  dropdownDefaultTxt: {
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.black,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
    color: color.black,
  },
  dropdownMenuStyle: {
    backgroundColor: color.selectBackground,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: color.white,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.black,
  },
  dropdownButtonStyle: {
    width: "65%",
    height: verticalScale(35),
    backgroundColor: color.language_dropdown_background,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 16,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedTab: {
    borderBottomColor: color.colorPrimary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "medium",
  },
});
