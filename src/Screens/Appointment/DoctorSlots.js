import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
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
import { ms, s, verticalScale, vs } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generateTimes } from "../../Components/Appointment/AppointmentTime";
import {
  generatedNext7Dates,
  generateNext4Days,
} from "../../Components/Appointment/AppointmentDate";
import { screenWidth } from "../../Utils/utils";


import Button from "../../Components/Button";

export default function DoctorSlots({ navigation }) {
  const { t } = useTranslation();
  const morningTimes = generateTimes("morning");
  const afternoonTimes = generateTimes("afternoon");
  const eveningTimes = generateTimes("evening");
  const dates = generateNext4Days();

  console.log("Here", morningTimes);

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedMorningTime, setSelectedMorningTime] = useState();
  const [selectedAfternoonTime, setSelectedAfternoonTime] = useState();
  const [selectedEveningTime, setSelectedEveningTime] = useState();
  const [selectedItem, setSelectedItem] = useState();

  // Visibility state
  const [visibleMorningCount, setVisibleMorningCount] = useState(5);
  const [visibleAfternoonCount, setVisibleAfternoonCount] = useState(5);
  const [visibleEveningCount, setVisibleEveningCount] = useState(5);

  const [selectedTab, setSelectedTab] = useState("");
  const sheetRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleBookAppointment = (item) => {
    navigation.navigate("ReviewDetails");
  };

  const handleAfternoonShowMore = () => {
    setNoonCount((prevCount) => Math.min(prevCount + 5, afternoonTimes.length));
  };

  const onSelectTime = (time) => {
    setSelectedMorningTime(time);
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const handleShowMore = (type) => {
    if (type === "morning") {
      setVisibleMorningCount((prevCount) =>
        Math.min(prevCount + 5, morningTimes.length)
      );
      setVisibleEveningCount(5);
      setVisibleAfternoonCount(5);
    } else if (type === "afternoon") {
      setVisibleAfternoonCount((prevCount) =>
        Math.min(prevCount + 5, afternoonTimes.length)
      );
      setVisibleEveningCount(5);
      setVisibleMorningCount(5);
    } else if (type === "evening") {
      setVisibleEveningCount((prevCount) =>
        Math.min(prevCount + 5, eveningTimes.length)
      );
      setVisibleAfternoonCount(5);
      setVisibleMorningCount(5);
    }
  };

  const renderTime =
    (type) =>
    ({ item, index }) =>
      (
        <>
          <TouchableOpacity
            style={[
              styles.timeButton,
              {
                backgroundColor:
                  selectedItem === item ? color.colorPrimary : color.white,
                // (type === "morning"
                //   ? selectedMorningTime
                //   : type === "afternoon"
                //   ? selectedAfternoonTime
                //   : selectedEveningTime) === item
                //   ? color.colorPrimary
                //   : color.white,
              },
            ]}
            onPress={() => {
              // if (type === "morning") {
              //   setSelectedMorningTime(item);
              // } else if (type === "afternoon") {
              //   setSelectedAfternoonTime(item);
              // } else if (type === "evening") {
              //   setSelectedEveningTime(item);
              // }
              setSelectedItem(item);
            }}
          >
            <Text
              style={[
                styles.timeText,
                {
                  color: selectedItem === item ? color.white : color.black,
                  // (type === "morning"
                  //   ? selectedMorningTime
                  //   : type === "afternoon"
                  //   ? selectedAfternoonTime
                  //   : selectedEveningTime) === item
                  //   ? color.white
                  //   : color.black,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>

          {/* Show More Button */}
          {index ===
            (type === "morning"
              ? visibleMorningCount
              : type === "afternoon"
              ? visibleAfternoonCount
              : visibleEveningCount) -
              1 &&
            (type === "morning"
              ? visibleMorningCount
              : type === "afternoon"
              ? visibleAfternoonCount
              : visibleEveningCount) <
              (type === "morning"
                ? morningTimes.length
                : type === "afternoon"
                ? afternoonTimes.length
                : eveningTimes.length) && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => handleShowMore(type)}
              >
                <Text style={styles.showMoreText}>{t("more")}</Text>
                <Image source={Icons.down_blue} style={styles.showMoreIcon} />
              </TouchableOpacity>
            )}
        </>
      );

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

  const renderdates = ({ item }) => {
    // Split the date and day
    const [date, month, day] = item.split(" ");

    return (
      <TouchableOpacity
        style={[
          styles.dateWrapper,
          {
            borderColor:
              selectedDate === item ? color.colorPrimary : color.black,
            borderBottomWidth: selectedDate === item ? 1.5 : 0,
          },
        ]}
        onPress={() => handleDatePress(item)}
      >
        <Text
          style={[
            styles.dateText,
            {
              color: selectedDate === item ? color.colorPrimary : color.black,
            },
          ]}
        >{`${date} ${month}`}</Text>
        <Text
          style={[
            styles.dayText,
            {
              color: selectedDate === item ? color.colorPrimary : color.black,
            },
          ]}
        >
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  //const displayedTimes = morningTimes.slice(0, visibleCount);
  //onst displayedAfternoonTimes = afternoonTimes.slice(0, visibleCount);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader title={t("doctor_slots")} onIconPress={handleGoBack} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginStart: 25,
            marginEnd: 25,
            marginTop: 20,
            gap: 15,
          }}
        >
          <Image source={Icons.doctor_lady} style={styles.doctorImage} />
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",

              paddingTop: 5,
            }}
          >
            <Text style={styles.name}>{"Dr. Shruti Kedia "}</Text>

            <Text style={styles.specialization}>
              {"General physician | 6 Yrs Exp"}
            </Text>
            {/* <Text style={styles.degree}>{""}</Text>
            <Text style={styles.rating}>{""}</Text> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={Icons.location_grey}
                style={{ width: 12, height: 12 }}
                resizeMode={"contain"}
              />

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",

                  alignItems: "center",
                }}
              >
                <Text style={styles.locationText}>{"Kasba peth, pune"}</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: color.colorPrimary,
                  }}
                >
                  <Text
                    style={{
                      color: color.appointment_grey,
                      fontFamily: "regular",
                      fontSize: 11,
                      padding: 2,
                    }}
                  >
                    4 KM
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.firstTabButton,
              {
                backgroundColor:
                  selectedTab === "video" ? color.colorPrimary : color.white,
              },
            ]}
            onPress={() => setSelectedTab("video")}
          >
            <Image
              source={Icons.video}
              style={{ width: 20, height: 20 }}
              tintColor={
                selectedTab === "video" ? color.white : color.colorPrimary
              }
            />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: selectedTab === "video" ? color.white : color.black,
              }}
            >
              {t("video")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondTabButton,
              {
                backgroundColor:
                  selectedTab === "in_clinic"
                    ? color.colorPrimary
                    : color.white,
              },
            ]}
            onPress={() => setSelectedTab("in_clinic")}
          >
            <Image
              source={Icons.home}
              style={{ width: 20, height: 20 }}
              tintColor={
                selectedTab === "in_clinic" ? color.white : color.colorPrimary
              }
            />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: selectedTab === "in_clinic" ? color.white : color.black,
              }}
            >
              {t("in_clinic")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.thirdTabButton,
              {
                backgroundColor:
                  selectedTab === "on_call" ? color.colorPrimary : color.white,
              },
            ]}
            onPress={() => setSelectedTab("on_call")}
          >
            <Image
              source={Icons.call}
              style={{ width: 20, height: 20 }}
              tintColor={
                selectedTab === "on_call" ? color.white : color.colorPrimary
              }
            />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: selectedTab === "on_call" ? color.white : color.black,
              }}
            >
              {t("on_call")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            borderBottomColor: color.filter_border,
            borderBottomWidth: 1,
          }}
        >
          <FlatList
            data={dates}
            renderItem={renderdates}
            horizontal
            contentContainerStyle={styles.dateContainer}
            //ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image source={Icons.sunrise} style={{ width: 22, height: 22 }} />
            <Text style={{ fontFamily: "regular", fontSize: 16 }}>
              {t("morning")}
            </Text>
          </View>

          <FlatList
            data={displayedTimes}
            renderItem={renderTime}
            numColumns={4}
            contentContainerStyle={styles.timeContainer}
            style={{ marginTop: 10 }}
          />
        </View> */}

        {/* <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={Icons.afternoon_sun}
              style={{ width: 22, height: 22 }}
            />
            <Text style={{ fontFamily: "regular", fontSize: 16 }}>
              {t("afternoon")}
            </Text>
          </View>

          <FlatList
            data={displayedTimes}
            renderItem={renderTime}
            numColumns={4}
            contentContainerStyle={styles.timeContainer}
            style={{ marginTop: 10 }}
          />
        </View> */}

        {/* <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={Icons.afternoon_sun}
              style={{ width: 22, height: 22 }}
            />
            <Text style={{ fontFamily: "regular", fontSize: 16 }}>
              {t("afternoon")}
            </Text>
          </View>

          <FlatList
            data={eveningTimes.slice(0, visibleEveningCount)}
            renderItem={renderTime("evening")}
            numColumns={4}
            contentContainerStyle={styles.timeContainer}
            style={{ marginTop: 10, backgroundColor: "red" }}
          />
        </View> */}

        {/* Morning Times Section */}
        <View style={styles.timeSection}>
          <View style={styles.timeHeader}>
            <Image source={Icons.sunrise} style={styles.timeIcon} />
            <Text style={styles.timeTitle}>{t("morning")}</Text>
          </View>
          <FlatList
            // data={formatData(morningTimes.slice(0, visibleMorningCount), 3)}
            data={morningTimes.slice(0, visibleMorningCount)}
            renderItem={renderTime("morning")}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            style={{
              marginTop: 10,
            }}
          />
        </View>

        {/* Afternoon Times Section */}
        <View style={styles.timeSection}>
          <View style={styles.timeHeader}>
            <Image source={Icons.afternoon_sun} style={styles.timeIcon} />
            <Text style={styles.timeTitle}>{t("afternoon")}</Text>
          </View>
          <FlatList
            //data={formatData(afternoonTimes.slice(0, visibleAfternoonCount), 4)}
            data={afternoonTimes.slice(0, visibleAfternoonCount)}
            renderItem={renderTime("afternoon")}
            numColumns={4}
            contentContainerStyle={styles.timeContainer}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 10 }}
          />
        </View>

        {/* Evening Times Section */}
        <View style={styles.timeSection}>
          <View style={styles.timeHeader}>
            <Image source={Icons.moon} style={styles.timeIcon} />
            <Text style={styles.timeTitle}>{t("evening")}</Text>
          </View>
          <FlatList
            //  data={formatData(eveningTimes.slice(0, visibleEveningCount), 4)}
            data={eveningTimes.slice(0, visibleEveningCount)}
            renderItem={renderTime("evening")}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            style={{
              marginTop: 10,
            }}
          />
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 15, marginTop: 20, marginBottom: 0 }}>
        <Button
          title={t("book_appointment_2")}
          backgroundColor={color.colorPrimary}
          textColor={color.white}
          onPress={handleBookAppointment}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  doctorImage: {
    height: 92,
    width: 92,
  },
  name: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.black,
  },
  degree: {
    color: color.appointment_black,
    fontSize: ms(11),
    fontFamily: "regular",
    marginTop: 2,
  },
  locationText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  rating: {
    color: color.appointment_green,
    fontSize: ms(11),
    fontFamily: "medium",
    marginTop: 2,
  },
  specialization: {
    color: color.appointment_black,
    fontSize: ms(11),
    fontFamily: "regular",
    //marginTop: 15,
  },

  tabContainer: {
    marginHorizontal: 25,
    height: 40,

    justifyContent: "center",

    marginTop: 30,
    flexDirection: "row",
  },

  firstTabButton: {
    flexDirection: "row",
    gap: 10,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
    borderRightWidth: 0,
    borderWidth: 1,

    borderColor: color.colorPrimary,
  },

  secondTabButton: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",

    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.colorPrimary,
  },
  thirdTabButton: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",

    justifyContent: "center",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: color.colorPrimary,
  },

  dateContainer: {
    marginTop: 10,
    marginHorizontal: 25,
    //paddingVertical: 10,
    //  backgroundColor: "yellow",

    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  dateWrapper: {
    alignItems: "center",
    marginHorizontal: 0,
    paddingVertical: 15,
    width: screenWidth / 4 - 20,

    borderRightWidth: 0,

    borderStartWidth: 0,
    borderTopWidth: 0,
    //  backgroundColor: "orange",
  },
  dateText: {
    fontSize: ms(14),
    fontFamily: "bold",
  },
  dayText: {
    fontSize: ms(14),
    fontFamily: "bold",
  },

  timeButton: {
    // flex: 1 / 4,
    borderColor: color.colorPrimary, // Adjust this color as needed
    borderRadius: 8,
    paddingVertical: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
    margin: 5,
    width: screenWidth / 5,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    color: color.black, // Adjust this color as needed
    fontSize: ms(11),
    fontFamily: "bold", // Ensure you have this font defined in your project
  },

  timeContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  timeSection: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  timeHeader: {
    flexDirection: "row",
    gap: 10,
  },
  timeIcon: {
    width: 20,
    height: 20,
  },
  timeTitle: {
    fontFamily: "regular",
    fontSize: ms(14),
  },

  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
    //flex: 1,
  },
  showMoreText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.colorPrimary,
  },
  showMoreIcon: {
    height: vs(14),
    width: ms(14),
  },
});
