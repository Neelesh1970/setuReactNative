import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  StatusBar,
  Linking
} from "react-native";

import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import GradientText from "../../Components/GradientText";
import { ms, verticalScale } from "react-native-size-matters";
import CustomTextInput from "../../Components/CustomTextInput";
import Button from "../../Components/Button";
import MaskedView from "@react-native-masked-view/masked-view";
import { useState, useRef } from "react";
import moment from "moment";
import {
  validateTextField,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  areAllValuesTrue,
} from "../../Utils/utils";
import { useTranslation } from "react-i18next";
import DateTimePicker from "react-native-ui-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest, signupSuccess, signupFailure, loginSuccess } from '../../features/auth/authSlice';
import { registerUser } from "../../Utils/apiService";
import axios from 'axios';
import { API_URL } from '@env';
import { signupUser } from "../../Utils/api/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
import ToastService from "../../Utils/ToastService";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function RegistrationScreen({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [date, setDate] = useState(dayjs());

  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // error field
  const [eFirstName, setEFirstName] = useState();
  const [eLastName, setELastName] = useState();
  const [eB_day, setEBDay] = useState();
  const [eGender, setEGender] = useState();

  const [ePassword, setEPassword] = useState();
  const [eEmail, setEEmail] = useState();
  const [eReferenceID, setEReferenceID] = useState();
  const [eConfirm_pass, setEConfirmPass] = useState();
  const [ePhoneNumber, setEPhoneNumber] = useState();

  // registration field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [b_day, setBDay] = useState(t("dd"));
  const [b_month, setBMonth] = useState(t("mm"));
  const [b_year, setBYear] = useState(t("yyyy"));
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [referenceID, setReferenceID] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const scrollRef = useRef(null);
  const dispatch = useDispatch();


  const { signuploading } = useSelector((state) => state.auth);



  const ChangePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const ChangeConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };




  const handleSignup = async () => {
    console.log("cliced")
    if (CheckValidation()) {
      const inpuData = {
        firstName: firstName,
        lastName: lastName,
        dob: `${b_year}-${b_month}-${b_day}`,

        gender: selectedIndex == 1 ? "Male" : selectedIndex == 2 ? "Female" : "Other",
        phoneNumber: phoneNumber,
        email: email,
        referenceId: referenceID,
        password: password,
        confirmPassword: confirm_pass,
        username: firstName,
        isActive: true,
        isDeleted: false,
      };

      console.log('inpuData', inpuData);
      showLoader();
      try {
        const response = await signupUser(inpuData);
        console.log('signupUser API Response:', response);
        console.log('signupUser API token:', response?.data?.response?.token);


        if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
          ToastService.showSuccess('Success!', response.data.message || "Registered Successfully!")
          dispatch(loginSuccess({ token: response?.data?.response?.token, uhid: response?.data?.response?.uhid, refreshToken: response?.data?.response?.refreshToken, user_id: response?.data?.response?.user?.user_id }));

          try {
            await AsyncStorage.setItem('uhid', String(response?.data?.response?.uhid));
            await AsyncStorage.setItem('user_id', String(response?.data?.response?.user?.user_id));
            await AsyncStorage.setItem('username', String(response?.data?.response?.user?.username));
          } catch (error) {
            console.log('Error in storing uhid and user_id')
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          });
        } else {
          ToastService.showError('Error!', response.data.message || "Failed to sign up")
        }
      } catch (error) {
        console.log('Error from signup API call:', error.response ? error.response.data : error.message);

        const rawMessage = error?.response?.data?.message;

        if (rawMessage && rawMessage.includes('duplicate key value violates unique constraint')) {
          ToastService.showError('User already exists!');
        } else if (rawMessage) {
          ToastService.showError('Error!', rawMessage);
        } else {
          ToastService.showError('Error!', "An error occurred. Please try again later.");
        }
      }

      finally {
        hideLoader();
      }
    }
  };

  const CheckValidation = () => {
    let isValid = true;
    let errors = {};

    if (!validateTextField(firstName)) {
      errors.firstName = t("please_enter_first_name");
      isValid = false;
    }
    if (!validateTextField(lastName)) {
      errors.lastName = t("please_enter_last_name");
      isValid = false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = t("please_enter_valid_phone_number");
      isValid = false;
    }
    if (!validateEmail(email)) {
      errors.email = t("please_enter_email");
      isValid = false;
    }
    if (!validatePassword(password)) {
      errors.password = t("please_enter_password");
      isValid = false;
    }
    if (password !== confirm_pass) {
      errors.confirm_pass = t("password_not_matched");
      isValid = false;
    }

    if (b_day === "DD" || b_month === "MM" || b_year === "YYYY") {
      errors.birthday = t("please_select_date_of_birth");
      isValid = false;
    } else {
      const birthDate = new Date(`${b_year}-${b_month}-${b_day}`);
      const today = new Date();

      const ageInMilliseconds = today - birthDate;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

      if (ageInYears < 1) {
        errors.birthday = t("you_are_not_authorized_to_sign_up_due_under_1");
        isValid = false;
      }
    }

    if (selectedIndex === -1) {
      errors.gender = t("please_select_gender");
      isValid = false;
    }

    if (!isAccept) {
      PromptAlertMessage(t("please_accept_the_terms_ans_privacy_policy"));
      return false;
    }

    // Update state with errors
    setEFirstName(errors.firstName || "");
    setELastName(errors.lastName || "");
    setEPhoneNumber(errors.phoneNumber || "");
    setEEmail(errors.email || "");
    setEPassword(errors.password || "");
    setEConfirmPass(errors.confirm_pass || "");
    setEBDay(errors.birthday || "");
    setEGender(errors.gender || "");

    return isValid;
  };

  const PromptAlertMessage = (message) => {
    Alert.alert("Alert", message);
  };

  const scrollToInput = (reactNode) => {
    if (reactNode) {
      scrollRef.current?.scrollToFocusedInput(reactNode);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <Loader />
      <KeyboardAwareScrollView
        //ref={scrollRef}
        // Adjust this value as needed
        enableOnAndroid={true}
      >
          <View style={{ flex: 1 }}>
            <LinearGradient
              // Background Linear Gradient
              colors={[color.colorPrimary, color.colorSecondary]}
              style={[
                styles.background,
                {
                  height: (windowHeight * 22) / 100,
                },
              ]}
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
            <View
              style={{
                backgroundColor: color.white,
                marginTop: -(windowHeight * 7) / 100,
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                padding: 10,
                left: 0,
                right: 0,
                flex: 1,
              }}
            >
              <View style={{ margin: ms(25, 0.3) }}>
                <GradientText text={t("Create_Your_Account")} scale={false} />
              </View>
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
              <View style={{ flexDirection: "row", flex: 1 }}>
                <CustomTextInput
                  label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                  {t("first_name")} <Text style={{ color: 'red' }}>*</Text>
                </Text>}
                  labelTextColor={color.inputTextLabel}
                  labelStyle={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                  }}
                  fullContainerStyle={{ flex: 1 }}
                  inputStyle={{
                    borderColor: color.colorPrimary,
                  }}
                  item_value={firstName}
                  item_setValue={setFirstName}
                  errorMessage={eFirstName}
                  setErrorMessage={setEFirstName}
                  onFocus={(event) => {
                    scrollToInput(event.target);
                  }}
                />

                <CustomTextInput
                  label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                  {t("last_name")} <Text style={{ color: 'red' }}>*</Text>
                </Text>}
                  labelTextColor={color.inputTextLabel}
                  labelStyle={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                  }}
                  fullContainerStyle={{ flex: 1 }}
                  inputStyle={{
                    borderColor: color.colorPrimary,
                  }}
                  item_value={lastName}
                  item_setValue={setLastName}
                  errorMessage={eLastName}
                  setErrorMessage={setELastName}
                  onFocus={(event) => {
                    scrollToInput(event.target);
                  }}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                    color: color.inputTextLabel,
                  }}
                >
                  {t("date_of_birth")} <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => setOpen(true)}
                >
                  <View
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginEnd: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: b_day === t("dd") ? color.grey : color.black,
                        fontFamily: "regular",
                      }}
                    >
                      {b_day}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginStart: 10,
                      marginEnd: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: b_month === t("mm") ? color.grey : color.black,
                        fontFamily: "regular",
                      }}
                    >
                      {b_month}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginStart: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: b_year === t("yyyy") ? color.grey : color.black,
                        fontFamily: "regular",
                      }}
                    >
                      {b_year}
                    </Text>
                  </View>
                </TouchableOpacity>
                {eB_day ? <Text style={styles.errorText}>{eB_day}</Text> : null}
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: ms(14),
                    marginBottom: 2,
                    color: color.inputTextLabel,
                  }}
                >
                  {t("gender")} <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginEnd: 10,
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      setEGender();
                      setSelectedIndex(1);
                    }}
                  >
                    <Image
                      source={Icons.male}
                      style={{ height: 15, width: 15, resizeMode: "contain" }}
                      tintColor={
                        selectedIndex == 1 ? color.colorPrimary : color.grey
                      }
                    />
                    <Text
                      style={{
                        color:
                          selectedIndex == 1 ? color.colorPrimary : color.grey,
                        fontFamily: selectedIndex == 1 ? "bold" : "regular",

                        marginStart: 3,
                      }}
                    >
                      {t("male")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginStart: 10,
                      marginEnd: 10,
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      setEGender();
                      setSelectedIndex(2);
                    }}
                  >
                    <Image
                      source={Icons.female}
                      style={{ height: 15, width: 15, resizeMode: "contain" }}
                      tintColor={
                        selectedIndex == 2 ? color.colorPrimary : color.grey
                      }
                    />
                    <Text
                      style={{
                        color:
                          selectedIndex == 2 ? color.colorPrimary : color.grey,
                        fontFamily: selectedIndex == 2 ? "bold" : "regular",

                        marginStart: 3,
                      }}
                    >
                      {t("female")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: color.colorPrimary,
                      height: verticalScale(45),
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginStart: 10,
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      setEGender();
                      setSelectedIndex(3);
                    }}
                  >
                    <Image
                      source={Icons.other}
                      style={{ height: 15, width: 15, resizeMode: "contain" }}
                      tintColor={
                        selectedIndex == 3 ? color.colorPrimary : color.grey
                      }
                    />
                    <Text
                      style={{
                        color:
                          selectedIndex == 3 ? color.colorPrimary : color.grey,
                        fontFamily: selectedIndex == 3 ? "bold" : "regular",

                        marginStart: 3,
                      }}
                    >
                      {t("other")}
                    </Text>
                  </TouchableOpacity>
                </View>
                {eGender ? (
                  <Text style={styles.errorText}>{eGender}</Text>
                ) : null}
              </View>
              <CustomTextInput
                label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                {t("phone_number")} <Text style={{ color: 'red' }}>*</Text>
              </Text>}
                labelTextColor={color.inputTextLabel}
                labelStyle={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  marginBottom: 2,
                }}
                fullContainerStyle={{ flex: 1 }}
                inputStyle={{
                  borderColor: color.colorPrimary,
                }}
                item_value={phoneNumber}
                item_setValue={setPhoneNumber}
                isPhoneNo={true}
                keybordType={"numeric"}
                errorMessage={ePhoneNumber}
                setErrorMessage={setEPhoneNumber}
                onFocus={(event) => {
                  scrollToInput(event.target);
                }}
              />
              <CustomTextInput
                label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                {t("E_mail")} <Text style={{ color: 'red' }}>*</Text>
              </Text>}
                labelTextColor={color.inputTextLabel}
                labelStyle={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  marginBottom: 2,
                }}
                fullContainerStyle={{ flex: 1 }}
                inputStyle={{
                  borderColor: color.colorPrimary,
                }}
                item_value={email}
                item_setValue={setEmail}
                errorMessage={eEmail}
                setErrorMessage={setEEmail}
              />
              <CustomTextInput
                label={t("reference_id")}
                labelTextColor={color.inputTextLabel}
                labelStyle={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  marginBottom: 2,
                }}
                fullContainerStyle={{ flex: 1 }}
                inputStyle={{
                  borderColor: color.colorPrimary,
                }}
                item_value={referenceID}
                item_setValue={setReferenceID}
                errorMessage={eReferenceID}
                setErrorMessage={setEReferenceID}
                onFocus={(event) => {
                  scrollToInput(event.target);
                }}
              />
              <CustomTextInput
                label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                {t("password")} <Text style={{ color: 'red' }}>*</Text>
              </Text>}
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
                errorMessage={ePassword}
                setErrorMessage={setEPassword}
                onFocus={(event) => {
                  scrollToInput(event.target);
                }}
              />
              <CustomTextInput
                label={<Text style={{ color: color.inputTextLabel, fontFamily: 'bold', fontSize: ms(14) }}>
                {t("confirm_password")} <Text style={{ color: 'red' }}>*</Text>
              </Text>}
                labelTextColor={color.inputTextLabel}
                labelStyle={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  marginBottom: 2,
                }}
                iconImageSrc={
                  isConfirmPasswordVisible
                    ? Icons.password_eye
                    : Icons.password_eye_slash
                }
                isIcon={true}
                inputStyle={{
                  borderColor: color.colorPrimary,
                }}
                item_value={confirm_pass}
                item_setValue={setConfirmPass}
                isPassword={!isConfirmPasswordVisible}
                iconPress={ChangeConfirmPasswordVisibility}
                errorMessage={eConfirm_pass}
                setErrorMessage={setEConfirmPass}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 20,
                }}

              >
                <MaterialIcons
                  name={isAccept ? "check-circle" : "check-circle-outline"}
                  size={ms(25)}
                  color="black"
                  onPress={() => setIsAccept(!isAccept)}
                />
                <Text
                  style={{
                    marginStart: 5,
                    color: color.colorPrimary,
                    fontSize: ms(14),
                    fontFamily: "regular",
                    textDecorationLine: "underline"
                  }}
                  onPress={() => Linking.openURL("https://www.google.com")}
                >
                  {t("i_accept_the_terms_and_privacy_policy")}
                </Text>
              </View>


              <Button
                backgroundColor={color.colorPrimary}
                textColor={color.white}
                title={signuploading ? 'Loading...' : t("sign_up")}
                onPress={
                  () => {
                    handleSignup()
                    // if (CheckValidation()) {
                    //   navigation.navigate("CreateAbhaConfirmation");
                    // }
                    // navigation.navigate("CreateAbhaConfirmation");
                  }
                  // CheckValidation()
                }
              />
              <Text
                activeOpacity={0.8}
                style={{
                  alignSelf: "center",
                  marginTop: ms(20),
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
                  {t("already_have_an_account")}{" "}
                  <TouchableOpacity
                    style={{
                      marginBottom: ms(7),
                    }}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text
                      style={{
                        color: color.colorPrimary,
                        textDecorationLine: "underline",
                        fontFamily: "medium",
                      }}
                    >
                      {t("login_in")}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </Text>
            </View>
          </View>
        <Modal animationType="slide" visible={open} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="single"
                date={date}
                onChange={(params) => {
                  setDate(new Date(params.date));
                }}
                calendarTextStyle={{
                  color: color.colorPrimary,
                  fontFamily: "medium",
                }}
                selectedItemColor={color.colorPrimary}
                weekDaysTextStyle={{ color: color.colorPrimary }}
                headerTextStyle={{ color: color.colorPrimary }}
                headerButtonColor={color.colorPrimary}
                maxDate={new Date()}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginEnd: 10,
                    padding: 10,
                  }}
                  onPress={() => setOpen(false)}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      color: color.colorPrimary,
                      fontSize: ms(14),
                    }}
                  >
                    {t("CANCEL")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginStart: 10,
                    padding: 10,
                  }}
                  onPress={() => {
                    setEBDay();
                    setOpen(false);
                    setBDay(moment(date).format("DD"));
                    setBMonth(moment(date).format("MM"));
                    setBYear(moment(date).format("YYYY"));
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      color: color.colorPrimary,
                      fontSize: ms(14),
                    }}
                  >
                    {t("OK")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
      {/* <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setEBDay();
          setOpen(false);
          setBDay(moment(date).format("DD"));
          setBMonth(moment(date).format("MM"));
          setBYear(moment(date).format("YYYY"));
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maximumDate={new Date()}
      /> */}
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
  },
  gender_select: {},
  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: 4,
    fontFamily: "regular",
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
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
