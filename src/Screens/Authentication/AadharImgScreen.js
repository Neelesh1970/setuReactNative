import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginHeader from "../../Components/LoginHeader";
import { color } from "../../assets/colors/Colors";
import { ms, vs } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../../Components/Button";
import { validateOTP } from "../../Utils/utils";
import { Icons } from "../../assets/icons/Icons";
import { useTranslation } from "react-i18next";

const AadharImgScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const handleContinue = () => {
    console.log("Here is your Aadhar Card");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader
        title={t("create_my_abha_address")}
        onIconPress={handleGoBack}
      />
      <View style={styles.content}>
        <View style={{ marginStart: 12 }}>
          <Text style={styles.titleText}>
            {t("your_abha_card_has_been_successfully_created")}
          </Text>
        </View>

        <View style={{}}>
          <Image source={Icons.aadhar_img} style={styles.imageStyle} />
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

export default AadharImgScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "medium",
    fontSize: ms(16),
    color: color.green,
  },

  imageStyle: {
    height: vs(213),
    width: "100%",
    resizeMode: "contain",
    marginTop: 30,
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
  subTitleText: { fontFamily: "regular", color: color.grey, fontSize: ms(12) },
  otpText: {
    fontFamily: "regular",
    color: color.grey,
    fontSize: ms(12),
    marginStart: ms(5),
  },
  resendTextContainer: {
    flexDirection: "row",
    marginStart: ms(5),
    marginTop: ms(30),
    alignItems: "center",
  },
  resendText: { fontFamily: "medium", fontSize: ms(12) },
  resendSubText: {
    color: color.textBlue,
    fontFamily: "bold",
    fontSize: ms(12),
  },
  content: {
    marginTop: 50,
    padding: 15,
    flex: 1, // Allow content to take up available space
  },
  footer: {
    marginBottom: 40,
    padding: 10,
  },
});
