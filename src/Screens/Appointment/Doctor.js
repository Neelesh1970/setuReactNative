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
import CollapsibleSection from "../../Components/Appointment/CollapsibleSection";
import DropShadow from "react-native-drop-shadow";
import Button from "../../Components/Button";
import Share from "react-native-share";

export default function Doctor({ navigation }) {
  const { t } = useTranslation();
  const times = generateTimes("all");
  const dates = generatedNext7Dates();

  const [inClinicOpened, setInClinicOpened] = useState(false);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [videoOpened, setVideoOpened] = useState(false);
  const [onCallOpened, setOnCallOpened] = useState(false);
  const sheetRef = useRef(null);

  const clinicImages = [
    Icons.clinic,
    Icons.clinic_2,
    Icons.clinic_3,
    Icons.clinic,
    Icons.clinic_2,
    Icons.clinic_3,
  ];

  const [fav, setFav] = useState(false);
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

  const handleBookAppointment = (item) => {
    navigation.navigate("DoctorSlots");
  };

  const onSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleFavPress = () => {
    setFav(!fav);
  };

  const handleShare = async () => {
    try {
      const result = await Share.open({
        title: "Share via",
        message: "Check out this doctor!",
      });

      if (result.action === Share.sharedAction) {
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Cancelled", "Share action was cancelled.");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
      Alert.alert("Error", "Failed to share content.");
    }
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const renderTime = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        {
          backgroundColor:
            selectedTime === item ? color.colorPrimary : color.white,
        },
      ]}
      onPress={() => onSelectTime(item)}
    >
      <Text
        style={[
          styles.timeText,
          { color: selectedTime === item ? color.white : color.black },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderClinicPhotos = ({ item }) => (
    <View
      style={{
        borderRadius: 5,
        height: screenWidth / 3 - 22,
        width: screenWidth / 3 - 22,
        marginHorizontal: 5,
        marginStart: 2,
        marginTop: 10,
      }}
    >
      <Image
        source={item}
        resizeMode="cover"
        style={{
          width: screenWidth / 3 - 22,
          height: screenWidth / 3 - 22,
          borderRadius: 5,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader
        onIconPress={() => {
          navigation.goBack();
        }}
        isOptionMenu={true}
        optionMenuSrc={fav ? Icons.heart_fill : Icons.heart_icon}
        onIconStyle={fav ? { tintColor: color.red } : ""}
        isOptionMenu2={true}
        optionMenuSrc2={Icons.share}
        onOptionPress={handleFavPress}
        onOptionPress2={handleShare}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginStart: 15,
            marginEnd: 25,
            marginTop: 20,
            gap: 15,
          }}
        >
          <Image source={Icons.doctor_lady} style={styles.doctorImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{"Dr. Shruti Kedia "}</Text>

            <Text style={styles.specialization}>
              {"General physician | 6 Yrs Exp"}
            </Text>
            <Text style={styles.degree}>{"MBBS"}</Text>
            <Text style={styles.rating}>{"98% positive ratings"}</Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
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

        <View
          style={{
            marginHorizontal: 25,
            borderWidth: 1,
            marginTop: 20,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            gap: 5,
            borderColor: color.colorPrimary,
          }}
        >
          <View>
            <ImageBackground
              source={Icons.verify_bg}
              style={{
                width: ms(128),
                height: ms(20),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 11,
                }}
              >
                {t("verified_profile")}
              </Text>
            </ImageBackground>
            <View style={{ position: "absolute", left: -5, top: -2 }}>
              <Image
                source={Icons.verified_tick}
                style={{ width: ms(22), height: ms(22) }}
              />
            </View>
          </View>

          <Text style={{ fontFamily: "regular", fontSize: ms(11) }}>
            {t("setu_health_has_verified_the_doctor_details")}
          </Text>
        </View>

        <CollapsibleSection
          icon={Icons.home}
          title={t("in_clinic_consult")}
          isOpen={inClinicOpened}
          setOnToggle={setInClinicOpened}
          data1={dates}
          data2={times}
        />

        <CollapsibleSection
          icon={Icons.video}
          title={t("video_consult")}
          isOpen={videoOpened}
          setOnToggle={setVideoOpened}
          data1={dates}
          data2={times}
        />

        <CollapsibleSection
          icon={Icons.call}
          title={t("on_call_consult")}
          isOpen={onCallOpened}
          setOnToggle={setOnCallOpened}
          data1={dates}
          data2={times}
        />

        <View
          style={{
            width: "100%",
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderColor: color.consult_bg,
            marginTop: 20,
            paddingHorizontal: 25,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(12),
              color: color.colorPrimary,
            }}
          >
            98% positive ratings for Dr. Shruti Kedia
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(12),
              color: color.doctor_grey_2,
              marginTop: 15,
            }}
          >
            More about Dr.Shruti kedia
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10, gap: 8 }}>
            <Image
              source={Icons.message}
              style={{ width: 14, height: 14, marginTop: 2 }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(12),
                  color: color.black,
                }}
              >
                {t("speaks")}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(12),
                  color: color.doctor_grey_3,
                }}
              >
                {"English, Hindi, Marathi"}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10, gap: 8 }}>
            <Image
              source={Icons.degree}
              style={{ width: 14, height: 14, marginTop: 2 }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(12),
                  color: color.black,
                }}
              >
                {t("education")}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: ms(12),
                  color: color.doctor_grey_3,
                }}
              >
                {"MBBS"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "bold", color: color.grey, fontSize: ms(16) }}
          >
            {t("about_clinic")}
          </Text>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <Image source={Icons.call_2} style={{ width: 14, height: 14 }} />

            <Text
              style={{
                fontFamily: "bold",
                fontSize: 13,
                color: color.colorPrimary,
              }}
            >
              {t("call_clinic")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: color.suffixgrey,
            height: 1,
          }}
        />

        <View style={{ paddingHorizontal: 25, marginTop: 15 }}>
          <Text
            style={{ fontFamily: "bold", color: color.black, fontSize: ms(13) }}
          >
            Shruti Clinic
          </Text>

          <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
            <View style={{ width: 12, height: 12, marginTop: 2 }}>
              <Image
                source={Icons.location_grey}
                style={{ width: 9, height: 12 }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontFamily: "regular",
                color: color.appointment_grey,
                fontSize: ms(12),
              }}
            >
              Kasba peth, Near pawle chowk Near pawle chowk Pune Maharashtra
              India 411011
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "bold",
              color: color.black,
              fontSize: ms(11),
              marginTop: 15,
            }}
          >
            {t("get_directions")}
          </Text>

          <DropShadow
            style={{
              shadowColor: "#00000025",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 1,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 5,
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("AddNewAddress")}
            >
              <Image
                source={Icons.map}
                style={{
                  width: "100%",
                  height: 85,
                  borderTopRightRadius: 5,
                  borderTopRightRadius: 5,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <View style={{ width: 12, height: 12 }}>
                  <Image
                    source={Icons.location_grey}
                    tintColor={color.colorPrimary}
                    style={{ width: 10, height: 12 }}
                  />
                </View>
                <Text
                  style={{
                    color: color.colorPrimary,
                    fontFamily: "regular",
                    fontSize: ms(11),
                  }}
                >
                  {t("tap_on_the_map_for_exact_clinic_loc")}
                </Text>
              </View>
            </TouchableOpacity>
          </DropShadow>

          <Text
            style={{
              fontFamily: "bold",
              color: color.black,
              fontSize: ms(11),
              marginTop: 30,
            }}
          >
            {t("clinic_photos")}
          </Text>

          <FlatList
            data={clinicImages}
            renderItem={renderClinicPhotos}
            numColumns={3}
            contentContainerStyle={styles.clinicContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <View
          style={{
            backgroundColor: color.consult_bg,
            height: 5,
            width: "100%",
            marginTop: 25,
          }}
        />

        {/* <View
          style={{
            backgroundColor: color.consult_bg,
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            marginTop: 15,
            flexDirection: "row",
            marginHorizontal: 25,
            padding: 10,
            gap: 15,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={Icons.home} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
              {t("in_clinic_consult")}
            </Text>

            <TouchableOpacity
              onPress={() => setInClinicOpened(!inClinicOpened)}
            >
              <Icon
                name={inClinicOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {inClinicOpened ? (
          <View style={{ marginHorizontal: 25 }}>
            <FlatList
              data={dates}
              renderItem={renderDates}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.datecontentContainer}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={times}
              renderItem={renderTime}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          ""
        )} */}

        {/* <View
          style={{
            backgroundColor: color.consult_bg,
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            marginTop: 15,
            flexDirection: "row",
            marginHorizontal: 25,
            padding: 10,
            gap: 15,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={Icons.video} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
              {t("video_consult")}
            </Text>

            <TouchableOpacity onPress={() => setVideoOpened(!videoOpened)}>
              <Icon
                name={videoOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {videoOpened ? (
          <View style={{ marginHorizontal: 25 }}>
            <FlatList
              data={dates}
              renderItem={renderDates}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.datecontentContainer}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={times}
              renderItem={renderTime}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          ""
        )} */}

        {/* <View
          style={{
            backgroundColor: color.consult_bg,
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            marginTop: 15,
            flexDirection: "row",
            marginHorizontal: 25,
            padding: 10,
            gap: 15,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={Icons.call_2} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
              {t("on_call_consult")}
            </Text>

            <TouchableOpacity onPress={() => setOnCallOpened(!onCallOpened)}>
              <Icon
                name={onCallOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {onCallOpened ? (
          <View style={{ marginHorizontal: 25 }}>
            <FlatList
              data={dates}
              renderItem={renderDates}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.datecontentContainer}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={times}
              renderItem={renderTime}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          ""
        )} */}
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
    marginTop: 2,
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,

    color: color.colorPrimary,
  },

  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },

  clinicContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
});
