import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet"; 

import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import Button from "../../Components/Button";

import { useTranslation } from "react-i18next";

export default function ConfirmDeliverySheet({ sheetRef, navigation }) {
  const { t } = useTranslation();

  const snapPoints = useMemo(() => ["45%"], []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef]);

  const CustomHandle = () => {
    return (
      <View style={styles.customHandleContainer}>
        <View style={styles.customHandle} />
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handlePay = () => {
    navigation.navigate("PaymentDone");
  };

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1} // Closed by default
        handleComponent={CustomHandle}
        style={styles.bottomSheet}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
        animationConfigs={{
          duration: 400, // Duration for the animation
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => handleClosePress()}
            style={{
              position: "absolute",
              right: 0,

              zIndex: 4,
            }}
          >
            <View style={styles.handleContainer}>
              <Image
                source={Icons.bottom_sheet_close} // Replace with your icon path
                style={styles.handleIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.titleText}>{t("confirm_delivery")}</Text>

          <Image
            source={Icons.dashed_line}
            style={{ width: "100%", height: 1, marginTop: 15 }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              gap: 15,
            }}
          >
            <Image
              source={Icons.location_delivery}
              style={{ width: ms(38), height: ms(38) }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,

                alignItems: "center",
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: ms(10),
                    color: color.grey,
                  }}
                >
                  {t("delivery_to")}
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: ms(12),
                  }}
                >
                  KM Park, Model Colony, Pune
                </Text>
              </View>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.navigate("ChooseAddress")}
              >
                <Image
                  source={Icons.delivery_confirm_arrow}
                  style={{ height: 18, width: 18 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={Icons.dashed_line}
            style={{ width: "100%", height: 1, marginTop: 15 }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              gap: 15,
            }}
          >
            <Image
              source={Icons.delivery}
              style={{ width: ms(38), height: ms(38) }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,

                alignItems: "center",
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: ms(10),
                    color: color.grey,
                  }}
                >
                  {t("delivery_by")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),
                    }}
                  >
                    {t("shipment")} 1 :
                  </Text>

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),
                      color: color.colorPrimary,
                    }}
                  >
                    {" 10PM, tomorrow"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.navigate("Delivery")}
              >
                <Image
                  source={Icons.delivery_confirm_arrow}
                  style={{ height: 18, width: 18 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: ms(41),
              height: ms(41),
              borderRadius: 6,
              borderWidth: 0.8,
              borderColor: color.grey,
              justifyContent: "center",
              alignItems: "center",
              marginStart: ms(50),
              marginTop: 5,
            }}
          >
            <Image
              source={Icons.image1}
              style={{ width: ms(36), height: ms(34), marginTop: 5 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <Button
              backgroundColor={color.colorPrimary}
              textColor={color.white}
              title={t("cont_to_pay") + " ₹192"}
              buttonStyle={{
                marginEnd: 0,
                marginStart: 0,
                borderRadius: ms(10),
              }}
              onPress={handlePay}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
  },
  customHandleContainer: {
    alignItems: "center",
  },
  customHandle: {
    backgroundColor: color.colorPrimary,
    height: 4,
    width: 50,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 25,
    // alignItems: "center",
  },
  titleText: {
    //marginVertical: 15,
    //marginStart: 5,
    fontFamily: "medium",
    fontSize: ms(20),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    width: 35,
    height: 31,
  },
  buttonText: {
    marginTop: 3,
    fontFamily: "bold",
    fontSize: ms(11),
    color: color.colorPrimary,
    textAlign: "center",
  },
  dropShadow: {
    shadowColor: "#00000030",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  infoContainer: {
    flexDirection: "row",
    width: "80%",
    marginStart: 10,
    marginTop: 20,
  },
  infoIcon: {
    width: 21,
    height: 22,
  },
  infoTextContainer: {
    marginStart: 10,
  },
  infoTitle: {
    marginTop: 3,
    fontFamily: "bold",
    fontSize: ms(11),
    textAlign: "center",
  },
  infoSubtitle: {
    fontFamily: "regular",
    fontSize: ms(11),
  },

  pinCodeinput: {
    paddingStart: 10,
    //  paddingEnd: 50,
    height: 40,
    width: 150,
    marginTop: 15,
    borderWidth: 1,
    fontFamily: "medium",
    fontSize: ms(12),
    borderColor: color.grey,
    borderRadius: 6,
  },

  input: {
    paddingStart: 10,
    //  paddingEnd: 50,
    height: 40,
    //width: 150,
    marginTop: 15,
    borderWidth: 1,
    fontFamily: "medium",
    borderColor: color.grey,
    fontSize: ms(12),
    borderRadius: 6,
  },

  addressTypeButton: {
    width: ms(79),
    height: ms(30),
    borderWidth: 1,
    borderColor: color.black,
    borderRadius: 25,
    justifyContent: "center",
  },
  addressTypeText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.black,
    textAlign: "center",
  },

  selectedButton: {
    backgroundColor: color.black,
  },
  selectedText: {
    color: color.white,
  },

  handleContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  handleIcon: {
    width: 14,
    height: 14,
  },

  closeButtonContainer: {
    alignItems: "flex-end",
    marginTop: -20, // Adjust as needed
    marginEnd: 10,
  },
});
