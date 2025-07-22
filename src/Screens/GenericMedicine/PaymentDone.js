import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React from "react";
import { Icons } from "../../assets/icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { screenWidth } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

export default function PaymentDone() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          source={Icons.payment}
          style={{ height: screenWidth - 50, width: screenWidth - 50 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: "bold",
            fontSize: ms(28),
            color: color.payment_grey,
          }}
        >
          {t("payment_done")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
