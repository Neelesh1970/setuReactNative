import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { StatusBar } from "react-native";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import { moderateScale, ms } from "react-native-size-matters";
// import MapView from "react-native-maps";
import Button from "../../Components/Button";

import React, { useState, useRef, useCallback } from "react";
import AddressBottomSheet from "./AddressBottomSheet";

function AddNewAddress({ navigation }) {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const onCloseBottomSheet = () => {
    navigation.goBack();
  };
  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.light_background }}>
      <StatusBar backgroundColor={color.editBlue} />

      <GenericMedicineHeader
        title={t("confirm_delivery_area")}
        onIconPress={() => navigation.goBack()}
        containerStyle={{ backgroundColor: color.white }}
      />
      <View style={{ flex: 1 }}>
        {/* <View style={{ flex: 1 }}>
          <MapView style={{ flex: 1 }}></MapView>
        </View> */}
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: color.white,
              paddingStart: 16,
              paddingEnd: 16,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={Icons.send}
              style={{
                height: moderateScale(35),
                width: moderateScale(35),
                resizeMode: "contain",
              }}
            />
            <View style={{ marginStart: 10, flex: 1 }}>
              <Text
                style={{
                  fontSize: ms(14),
                  fontFamily: "bold",
                  color: color.black,
                }}
              >
                {"Home"}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(10),
                  color: color.grey,
                }}
              >
                {"KM Park, Model Colony, Pune"}
              </Text>
            </View>
            <TouchableOpacity
            //   onPress={() => navigation.navigate("ChooseAddress")}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  color: color.colorPrimary,
                  marginEnd: 10,
                }}
              >
                {t("change")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: color.cart_sep }} />
          <View
            style={{
              flexDirection: "row",
              paddingStart: 16,
              paddingEnd: 16,
              height: moderateScale(60),
              alignItems: "center",
            }}
          >
            <Button
              title={t("Confirm_location_and_continue")}
              backgroundColor={color.colorPrimary}
              buttonStyle={{
                flex: 1,
                marginBottom: 0,
                marginStart: 0,
                marginEnd: 0,
                borderRadius: ms(10),
              }}
              textColor={color.white}
              onPress={handleSnapPress}
            />
          </View>
        </View>
      </View>
      <AddressBottomSheet
        sheetRef={sheetRef}
        navigation={navigation}
        onClose={onCloseBottomSheet}
      />
    </SafeAreaView>
  );
}
export default AddNewAddress;
