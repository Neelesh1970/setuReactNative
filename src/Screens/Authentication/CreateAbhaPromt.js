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
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import GradientText from "../../Components/GradientText";
import { ms, verticalScale, moderateScale } from "react-native-size-matters";
import Button from "../../Components/Button";
import CustomTextInput from "../../Components/CustomTextInput";

import { useState } from "react";
import { t } from "i18next";
export default function CreateAbhaScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.colorPrimary} />
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
          </LinearGradient>
          <View style={styles.loginContainer}>
            <Image
              source={Icons.star_group}
              style={{
                height: ms(45),
                width: ms(45),
                position: "absolute",
                right: ms(10),
                top: ms(20),
              }}
            />

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Image
                source={Icons.pmjay}
                style={{
                  resizeMode: "contain",
                  width: moderateScale(200),
                  height: moderateScale(200),
                }}
              />
              <Text
                style={{
                  color: color.colorPrimary,
                  fontFamily: "bold",

                  fontSize: ms(20),
                  padding: 10,
                  textAlign: "center",
                }}
              >
                {t("do_you_want_create_your_abha_id")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("MainRoot")}
              >
                <Text
                  style={{
                    color: color.colorPrimary,
                    fontFamily: "bold",

                    fontSize: ms(16),

                    textAlign: "center",
                  }}
                >
                  {t("skip")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("AddAbhaUser")}
              >
                <Text
                  style={{
                    color: color.colorPrimary,
                    fontFamily: "bold",

                    fontSize: ms(16),

                    textAlign: "center",
                  }}
                >
                  {t("next")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
});
