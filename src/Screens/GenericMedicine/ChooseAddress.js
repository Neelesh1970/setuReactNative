import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { color } from "../../assets/colors/Colors";
import { StatusBar } from "react-native";
import Button from "../../Components/Button";
import { ms } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

export default function ChooseAddress({ navigation }) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
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

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.editBlue} />

      <GenericMedicineHeader
        title={t("choose_address")}
        onIconPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
          <Button
            textColor={color.textBlue}
            textStyle={{ fontFamily: "medium" }}
            title={t("add_new_address")}
            buttonStyle={{ borderWidth: 1, borderColor: color.grey }}
            onPress={() => navigation.navigate("AddNewAddress")}
          />

          <Text style={styles.resendAddressText}>{t("recent_address")}</Text>

          {addresses.map((address, index) => (
            <View key={address.id} style={styles.addressContainer}>
              <TouchableOpacity
                onPress={() => handleAddressSelect(index)}
                style={{ flexDirection: "row" }}
              >
                <View
                  style={
                    selectedAddressIndex === index
                      ? styles.selectedDot
                      : styles.unSelectedDot
                  }
                />

                <View style={{ marginStart: 15 }}>
                  <Text style={styles.addressTitleText}>{address.type}</Text>
                  <Text style={styles.addressText}>{address.address}</Text>
                  <Text style={styles.addressText}>{address.city}</Text>

                  <Text style={[styles.addressText, { marginTop: 15 }]}>
                    {address.name}
                  </Text>
                  <Text style={styles.addressText}>{address.phone}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <Text style={styles.EditButton}>{t("edit")}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.EditButton}>{t("remove")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
