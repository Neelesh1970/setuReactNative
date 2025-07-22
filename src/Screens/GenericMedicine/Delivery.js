import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { color } from "../../assets/colors/Colors";
import { StatusBar } from "react-native";
import Button from "../../Components/Button";
import { ms } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";

export default function Delivery({ navigation }) {
  const [selectedDelivery, setSelectedDelivery] = useState("default");
  const { t } = useTranslation();

  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "KM Park, Model Colony",
      city: "Pune, Maharashtra(411016)",
      name: "Nishat Shete",
      phone: "8998981233",
    },
    {
      id: 2,
      type: "Work",
      address: "Downtown Building, Center Street",
      city: "Pune, Maharashtra(411016)",
      name: "John Doe",
      phone: "8998981233",
    },
    // Add more addresses as needed
  ];

  const handleDeliverySelect = (type) => {
    setSelectedDelivery(type);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.editBlue} />

      <GenericMedicineHeader
        title={t("choose_delivery_dates")}
        onIconPress={handleGoBack}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
          <View
            style={{
              borderColor: color.grey,
              backgroundColor: color.delivery_grey,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: ms(16),
                fontFamily: "bold",
                color: color.black,
                marginStart: 25,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              {t("shipment")} 1
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View
                style={{
                  backgroundColor: color.delivery_green_bar,
                  width: 4,
                  height: 15,
                }}
              />
              <Text
                style={{
                  fontSize: ms(11),
                  fontFamily: "medium",
                  color: color.black,
                  textAlign: "center",
                }}
              >
                Himalaya Liv.52 Syrup
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: ms(11),
                  fontFamily: "medium",
                  color: color.colorPrimary,
                  textAlign: "center",
                  marginStart: 25,
                }}
              >
                {t("view_details")}
              </Text>
              <TouchableOpacity style={{ height: 14, width: 14 }}>
                <Image
                  source={Icons.delivery_add}
                  style={{ height: "100%", width: "100%" }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 15,
              borderColor: color.grey,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Icons.delivery_lightning}
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
              <View>
                <Text
                  style={{
                    fontSize: ms(12),
                    fontFamily: "medium",
                    color: color.grey,
                    marginStart: 25,
                  }}
                >
                  {t("rapid_delivery_by") + ":"}
                </Text>

                <Text
                  style={{
                    fontSize: ms(12),
                    fontFamily: "medium",
                    color: color.colorPrimary,
                    marginStart: 25,
                    marginTop: 2,
                  }}
                >
                  {"10PM, tomorrow"}
                </Text>
                <Text
                  style={{
                    fontSize: ms(12),
                    fontFamily: "medium",
                    color: color.grey,
                    marginStart: 25,
                  }}
                >
                  {"₹49"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeliverySelect("rapid")}>
                <View>
                  <View
                    style={
                      selectedDelivery === "rapid"
                        ? styles.selectedDot
                        : styles.unSelectedDot
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 15,
              borderColor: color.grey,
              borderWidth: 1,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
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
              <View>
                <Text
                  style={{
                    fontSize: ms(12),
                    fontFamily: "medium",
                    color: color.grey,
                    marginStart: 25,
                  }}
                >
                  {t("delivery_by") + ":"}
                </Text>

                <Text
                  style={{
                    fontSize: ms(12),
                    fontFamily: "medium",
                    color: color.colorPrimary,
                    marginStart: 25,
                    marginTop: 5,
                  }}
                >
                  {"13-14 August"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleDeliverySelect("default")}>
                <View>
                  <View
                    style={
                      selectedDelivery === "default"
                        ? styles.selectedDot
                        : styles.unSelectedDot
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        backgroundColor={color.colorPrimary}
        textColor={color.white}
        title={t("confirm_delivery_dates")}
        buttonStyle={{ marginEnd: 20, marginStart: 20, borderRadius: ms(10) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginStart: 35,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    gap: 30,
  },

  selectedDot: {
    width: 22,
    height: 22,
    borderWidth: 6,
    borderColor: color.colorPrimary,
    borderRadius: 100,
  },

  unSelectedDot: {
    width: 22,
    height: 22,
    borderColor: color.grey,
    borderWidth: 2,
    borderRadius: 100,
  },

  addressContainer: {
    borderColor: color.grey,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 20,
  },

  resendAddressText: {
    fontFamily: "regular",
    color: color.progressText,
    marginStart: 10,
    marginBottom: 15,
    fontSize: ms(11),
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: color.white,
    justifyContent: "space-between",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    // backgroundColor: "orange",
  },
  icon: {
    width: 6.5,
    height: 13,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
    // backgroundColor: "yellow",
  },
  title: {
    fontSize: 16,
    fontFamily: "medium",
    color: color.black,
    textAlign: "center",
  },
  rightButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },
  rightButtonText: {
    fontFamily: "medium",
    color: color.editBlue,
  },
  placeholderView: {
    width: 30, // This matches the width of the iconContainer to maintain alignment
  },

  addressText: {
    fontFamily: "regular",
    fontSize: ms(11),
  },

  addressTitleText: {
    fontFamily: "bold",
    fontSize: ms(11),
  },

  EditButton: {
    fontFamily: "medium",
    color: color.colorPrimary,
    fontSize: ms(14),
  },
});
