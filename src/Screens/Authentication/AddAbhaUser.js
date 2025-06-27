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
  Dimensions,
  ScrollView,
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import { ms, verticalScale, moderateScale } from "react-native-size-matters";
import Button from "../../Components/Button";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";

export default function AddAbhaUser({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { t } = useTranslation();
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.editBlue} />
      <LoginHeader title={t("add_users")} onIconPress={onBackPress} />
      <View
        style={{
          flex: 1,

          padding: ms(16),
        }}
      >
        <View
          style={{
            width: "100%",
            height: windowWidth / 1.9,
            borderRadius: 8,
            backgroundColor: color.lightBlue,
          }}
        />
        <ScrollView>
          <View>
            <Text
              style={{
                fontFamily: "poppinsBold",
                fontSize: ms(16),
                marginTop: 10,
                marginBottom: 10,
                color: color.black,
              }}
            >
              {t("benefits_of_creating_ABHA")}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Image
                source={Icons.health_record}
                style={{ height: moderateScale(60), width: moderateScale(60) }}
              />
              <View style={{ flex: 1, marginStart: 16 }}>
                <Text
                  style={{
                    fontFamily: "poppinsBold",

                    fontSize: ms(12),
                  }}
                >
                  {t("securely_store_all_your_health_records")}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsRegular", fontSize: ms(10) }}
                >
                  {t("paragraph_1")}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Image
                source={Icons.medical_record}
                style={{ height: moderateScale(60), width: moderateScale(60) }}
              />
              <View style={{ flex: 1, marginStart: 16 }}>
                <Text
                  style={{
                    fontFamily: "poppinsBold",

                    fontSize: ms(12),
                  }}
                >
                  {t("share_seamlessly_with_doctors_and_health_facilities")}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsRegular", fontSize: ms(10) }}
                >
                  {t("paragraph_2")}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: verticalScale(30) }}>
              <Button
                backgroundColor={color.colorPrimary}
                title={t("create_new_ABHA")}
                textColor={color.white}
                onPress={() => navigation.navigate("AadharNoScreen")}
                buttonStyle={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginTop: verticalScale(16) }}>
              <Button
                backgroundColor={color.colorPrimary}
                title={t("login_existing_ABHA")}
                textColor={color.white}
                onPress={() => navigation.navigate("LoginMobileNoScreen")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
