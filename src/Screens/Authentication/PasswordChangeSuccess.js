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
  StatusBar,
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
import { t } from "i18next";
import { CommonActions } from "@react-navigation/native";

function PasswordChangeSuccess({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.colorPrimary} />
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
              top: ms(15),
              start: ms(15),
            }}
          />
          <Image
            source={Icons.star_group}
            style={{
              height: ms(90),
              width: ms(80),
              resizeMode: "contain",
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "bold",
              color: color.textBlue,
              fontSize: ms(20),
            }}
          >
            {t("password_changed")}
          </Text>
          <Text
            style={{
              fontFamily: "regular",
              color: color.black_alpha_70,
              fontSize: ms(16),
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {t("your_password_has_been_changed")}
          </Text>
          <Button
            title={t("back_to_login")}
            backgroundColor={color.colorPrimary}
            textColor={color.white}
            buttonStyle={{
              marginStart: 0,
              marginEnd: 0,
              marginTop: 20,
              height: ms(50),
              borderRadius: ms(10),
              width: "100%",
            }}
            textStyle={{
              fontFamily: "bold",
              fontWeight: "700",
              fontSize: ms(20),
            }}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Login" }],
                })
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default PasswordChangeSuccess;
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
    padding: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
