import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import FilterBottomSheet from "./FilterBottomSheet";
import CustomTextInput from "../../Components/CustomTextInput";
import { ms, verticalScale } from "react-native-size-matters";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { screenWidth } from "../../Utils/utils";

export default function AppointmentScreen({ navigation }) {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const [error, seterror] = useState("");
  const [searchText, setSearchText] = useState("");
  const appointmentData = [
    {
      doctorImage: Icons.doctor_lady,
      doctorName: "Dr. Shruti Kedia",
      specialization: "General physician",
      degree: "MBBS",
      experience: "6 years",
      rating: "98% positive ratings",
      location: "Kasba peth, pune",
      distance: "- 4 km",
      availability: "10:00 am, today",
      cost: "₹ 2000",
    },
    {
      doctorImage: Icons.doctor_lady,
      doctorName: "Dr. Rahul Sharma",
      specialization: "Cardiologist",
      degree: "MD",
      experience: "10 years",
      rating: "95% positive ratings",
      location: "Koregaon Park, Pune",
      distance: "- 2 km",
      availability: "11:00 am, tomorrow",
      cost: "₹ 2500",
    },
    {
      doctorImage: Icons.doctor_lady,
      doctorName: "Dr. Priya Verma",
      specialization: "Pediatrician",
      degree: "DCH",
      experience: "8 years",
      rating: "92% positive ratings",
      location: "Viman Nagar, Pune",
      distance: "- 5 km",
      availability: "9:00 am, today",
      cost: "₹ 1800",
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleBookAppointment = (item) => {
    // Handle book appointment logic here
    console.log("Booking appointment for:", item.doctorName);
  };

  const renderItem = ({ item }) => (
    <AppointmentCard
      {...item}
      onBookPress={() => handleBookAppointment(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader title={t("doctors")} onIconPress={handleGoBack} />

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 8,
          borderColor: color.colorPrimary,
        }}
      >
        <SelectDropdown
          data={["Pune", "Pimpri", "Khadki", "Bhor", "Dehu", "Shriwal"]}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {
                    backgroundColor: color.language_dropdown_background,
                  }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text
                  style={
                    selectedItem
                      ? styles.dropdownButtonTxtStyle
                      : styles.dropdownDefaultTxt
                  }
                >
                  {selectedItem}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          dropdownStyle={styles.dropdownMenuStyle}
          defaultValue="Pune"
        />
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginStart: 10,
          }}
        >
          <Text
            style={{
              color: color.colorPrimary,
              fontSize: ms(14),
              fontFamily: "bold",
            }}
          >
            Pune
          </Text>
          <TouchableOpacity style={{ padding: 5 }}>
            <Image
              source={Icons.appointment_down}
              style={{ height: ms(12), width: ms(12) }}
            />
          </TouchableOpacity>
        </View> */}
        <View style={{ flex: 1 }}>
          <CustomTextInput
            item_value={searchText}
            item_setValue={setSearchText}
            placeholder={t("search_doc_specialist")}
            errorMessage={error}
            setErrorMessage={seterror}
            inputStyle={{
              fontFamily: "regular",
              color: color.appointment_grey3,
              fontSize: ms(11),
              borderTopColor: color.white,
              borderBottomColor: color.white,
              borderRadius: 0,
              borderLeftColor: color.filter_border,
              borderRightColor: color.filter_border,
              height: 25,
              paddingHorizontal: 10,
              paddingVertical: 0,
            }}
            fullContainerStyle={{
              width: "80%",
              height: 25,
            }}
            isIcon
            iconImageSrc={Icons.appointment_search}
            iconStyle={{ tintColor: color.colorPrimary, width: 20, height: 20 }}
          />
        </View>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={handleSnapPress}
        >
          <Text style={styles.filterText}>{t("filter")}</Text>
          <View style={styles.filterIconContainer}>
            <Image source={Icons.filter} style={styles.filterIcon} />
          </View>
        </TouchableOpacity>
        <FlatList
          data={appointmentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.doctorName}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <FilterBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  filterContainer: {
    backgroundColor: color.filter_bg,
    flexDirection: "row",
    height: 30,
    width: 89,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color.colorPrimary,
    borderWidth: 1,
  },
  filterText: {
    fontFamily: "medium",
    color: color.colorPrimary,
    fontSize: ms(14),
  },
  filterIconContainer: {
    width: 16,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5, // Space between text and icon
  },
  filterIcon: {
    width: 12,
    height: 9,
  },
  flatListContent: {
    paddingTop: 25, // Adjust if needed
  },
  separator: {
    height: 20,
  },

  dropdownButtonTxtStyle: {
    fontSize: ms(14),
    fontFamily: "bold",
    color: color.colorPrimary,
  },
  dropdownDefaultTxt: {
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.colorPrimary,
  },

  dropdownButtonArrowStyle: {
    fontSize: ms(24),
    color: color.colorPrimary,
  },
  dropdownMenuStyle: {
    borderRadius: 8,
    width: screenWidth / 2,
  },
  dropdownItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    backgroundColor: color.white,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.colorPrimary,
  },
  dropdownButtonStyle: {
    marginStart: 10,

    borderRadius: 4,
    flexDirection: "row",

    alignItems: "center",
  },
});
