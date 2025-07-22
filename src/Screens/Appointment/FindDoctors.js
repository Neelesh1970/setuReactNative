import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
// import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import FilterBottomSheet from "./FilterBottomSheet";
import CustomTextInput from "../../Components/CustomTextInput";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  ms,
  s,
  verticalScale,
  moderateScale,
  vs,
} from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generateTimes } from "../../Components/Appointment/AppointmentTime";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from 'react-native-linear-gradient';;

import { screenWidth } from "../../Utils/utils";


// import Button from "../../Components/Button";
// import HomeButton from "../../Components/HomeButton";
import AppointmentButton from "../../Components/Appointment/AppointmentButton";

export default function FindDoctors({ navigation }) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const [isExpandedSearch, setIsExpandedSearch] = useState(false);
  const [isExpandedCommon, setIsExpandedCommon] = useState(false);
  const [error, seterror] = useState("");

  // Visibility state
  const searchedicons = [
    {
      id: 1,
      icon: Icons.general_phy,
      label: t("general_phy"),
    },
    {
      id: 2,
      icon: Icons.skin_care,
      label: t("skin_hair"),
    },
    { id: 3, icon: Icons.pregnant, label: t("woman_health") },
    { id: 4, icon: Icons.teeth, label: t("dental_care") },
    { id: 5, icon: Icons.general_phy, label: t("general_phy") },
    { id: 6, icon: Icons.skin_care, label: t("skin_care") },
    { id: 7, icon: Icons.pregnant, label: t("woman_health") },
    { id: 8, icon: Icons.teeth, label: t("dental_care") },
  ];

  const commonSymptoms = [
    {
      id: 1,
      icon: Icons.stomach_pain,
      label: t("stomach_pain"),
    },
    {
      id: 2,
      icon: Icons.skin_care,
      label: t("headache"),
    },
    { id: 3, icon: Icons.vertigo, label: t("vertigo") },
    { id: 4, icon: Icons.cold, label: t("cold_cough") },
    { id: 5, icon: Icons.general_phy, label: t("general_phy") },
    { id: 6, icon: Icons.skin_care, label: t("skin_hair") },
    { id: 7, icon: Icons.pregnant, label: t("woman_health") },
    { id: 8, icon: Icons.teeth, label: t("dental_care") },
  ];

  const sections = [
    {
      icon: Icons.doctor,
      text: t("find_doc"),
    },
    {
      icon: Icons.time_slot,
      text: t("select_slot"),
    },
    {
      icon: Icons.gold,
      text: t("make_payment"),
    },
    {
      icon: Icons.visit_clinic,
      text: t("visit_clinic"),
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleBookAppointment = (item) => {
    navigation.navigate("ReviewDetails");
  };

  const handleViewMoreSearch = () => {
    setIsExpandedSearch(!isExpandedSearch); // Toggle "Most Searched Specialities"
  };

  const handleViewMoreCommon = () => {
    setIsExpandedCommon(!isExpandedCommon); // Toggle "Common Symptoms"
  };
  const onSelectTime = (time) => {
    setSelectedMorningTime(time);
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const renderHeader = (title, isExpanded, onPress) => {
    return (
      <View
        style={{
          marginHorizontal: ms(10),
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: ms(14), fontFamily: "medium" }}>{title}</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: ms(12),
              fontFamily: "medium",
            }}
          >
            {t("view_more")}
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={isExpanded ? "chevron-up" : "chevron-down"}
              style={styles.viewMoreIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const onClickMenu = () => {
    console.log("Menu item pressed");
  };

  const renderSearched = ({ item }) => {
    return (
      <AppointmentButton
        iconImg={item.icon}
        label={item.label}
        id={item.id}
        onClickMenu={onClickMenu}
      />
    );
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push(""); // Add a placeholder
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />
      <LoginHeader title={t("find_doctors")} onIconPress={handleGoBack} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: ms(15) }}>
          <SelectDropdown
            data={["Pune-411016"]}
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
            defaultValue="Pune-411016"
          />

          <View
            style={{
              flexDirection: "row",
              borderColor: color.searchInputBorder,
              borderWidth: 1,
              backgroundColor: color.searchInputBackground,
              borderRadius: 14,
              padding: ms(5),
              marginTop: ms(12),

              alignItems: "center",
            }}
          >
            <Image
              source={Icons.search_icon}
              style={{
                height: vs(20),
                width: ms(20),
                resizeMode: "contain",
                marginStart: ms(8),
              }}
            />
            <TextInput
              style={{
                flex: 1,
                marginStart: ms(16),
                fontFamily: "poppinsRegular",
                fontSize: ms(14),

                //padding: 3,
                marginTop: ms(2),

                alignItems: "center",
              }}
              placeholder={t("search_doc")}
            />
          </View>
        </View>

        <LinearGradient
          // Background Linear Gradient
          colors={[color.gradient_4, color.gradient_3]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 3 }}
          style={{
            height: ms(135),
            borderRadius: 0,
            width: "100%",

            marginTop: ms(30),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingVertical: ms(15),
              paddingHorizontal: ms(25),

              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, gap: ms(5) }}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  color: color.find_blue,
                }}
              >
                {t("consult_top_doc")}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(11),
                  color: color.progressText,
                }}
              >
                {t("discover_near_doc")}
              </Text>
            </View>
            <View>
              <Image
                source={Icons.findDoctor}
                style={{
                  resizeMode: "cover",
                  //backgroundColor: "red",
                  height: screenWidth / vs(3),
                  width: screenWidth / ms(2) - ms(20),
                }}
              />
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={isExpandedSearch ? searchedicons : searchedicons.slice(0, 4)}
          renderItem={renderSearched}
          numColumns={4}
          style={{ marginTop: vs(30), marginHorizontal: vs(5) }}
          ListHeaderComponent={() =>
            renderHeader(
              t("most_searched_specialities"),
              isExpandedSearch,
              handleViewMoreSearch
            )
          }
        />

        <FlatList
          data={isExpandedCommon ? commonSymptoms : commonSymptoms.slice(0, 4)}
          renderItem={renderSearched}
          numColumns={4}
          style={{ marginTop: vs(30), marginHorizontal: vs(5) }}
          ListHeaderComponent={() =>
            renderHeader(
              t("most_common_symptoms"),
              isExpandedCommon,
              handleViewMoreCommon
            )
          }
        />

        <Text
          style={{
            fontSize: ms(14),
            fontFamily: "medium",
            marginTop: vs(30),
            marginHorizontal: vs(20),
          }}
        >
          {t("how_to_book_a_doctor")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",

            marginHorizontal: vs(20),
            marginTop: vs(15),
            marginBottom: vs(40),
          }}
        >
          {sections.map((section, index) => (
            <View
              key={index}
              style={{
                flex: index === sections.length - 1 ? 0 : 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={Icons.inner_shadow}
                    style={{
                      width: ms(52),
                      height: ms(52),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={section.icon}
                      style={{ width: ms(35.62), height: ms(35.62) }}
                    />
                  </ImageBackground>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: ms(9),
                    }}
                  >
                    {section.text}
                  </Text>
                </View>
                {index < sections.length - 1 && (
                  <Image
                    source={Icons.dashed_doc}
                    style={{
                      height: vs(18),
                      width: "100%",
                      flex: 1,
                      //marginEnd: 5,
                      resizeMode: "contain",
                    }}
                  />
                )}
              </View>
            </View>
          ))}
        </View>

        <View>
          <View
            style={{
              width: "100%",
              position: "absolute",

              top: 0,
              zIndex: 2,
              marginStart: ms(20),
            }}
          >
            <MaskedView
              maskElement={
                <View style={styles.maskView}>
                  <Text style={styles.text}>
                    {"We are here to take\n care of your Health!"}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={[color.gradient_5, color.gradient_6]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </MaskedView>
          </View>
          <Image
            source={Icons.bottom_sep}
            style={{ width: screenWidth, height: ms(10) }}
          />
          <Image
            source={Icons.doctors}
            style={{
              height: screenWidth / ms(2.4),
              width: screenWidth,
              resizeMode: "stretch",
              marginTop: ms(100),
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  },
  dropdownItemStyle: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: color.white,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: ms(14),
    fontFamily: "regular",
    color: color.colorPrimary,
  },
  dropdownButtonStyle: {
    height: verticalScale(35),

    borderRadius: 4,
    flexDirection: "row",

    alignItems: "center",

    marginTop: 16,
  },

  viewMoreIcon: {
    fontSize: ms(18),
    color: color.suffixgrey,
  },

  maskView: {
    backgroundColor: "transparent",
    height: ms(120),
    alignItems: "flex-start",
    justifyContent: "center",
    width: ms(303),
  },
  text: {
    marginStart: ms(5),
    marginTop: ms(25),
    fontSize: ms(30),
    fontFamily: "bold",
    textAlign: "left",
  },
  gradient: {
    height: ms(120),
  },
});
