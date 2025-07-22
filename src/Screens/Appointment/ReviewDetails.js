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
import { ms, s, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generateTimes } from "../../Components/Appointment/AppointmentTime";
import {
  generatedNext7Dates,
  generateNext4Days,
} from "../../Components/Appointment/AppointmentDate";
import { screenWidth } from "../../Utils/utils";


import Button from "../../Components/Button";
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'react-native-linear-gradient';;

export default function ReviewDetails({ navigation }) {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [selectPayment, setSelectPayment] = useState("online");

  const safetyMeasures = [
    {
      icon: Icons.mask,
      label: t("mask_mandatory"),
    },
    {
      icon: Icons.persons,
      label: t("social_distancing"),
    },
    {
      icon: Icons.temp,
      label: t("temp_check"),
    },
    {
      icon: Icons.hand,
      label: t("regular_sanitization"),
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const renderMeasures = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          flex: 1,
          marginVertical: 10,
          marginHorizontal: 5,
        }}
      >
        <View style={{ width: ms(20), height: ms(20) }}>
          <Image
            source={item.icon}
            style={{ width: ms(18), height: ms(18) }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            color: color.black,
            fontFamily: "bold",
            fontSize: ms(12),
            flex: 1,
          }}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  const handleBookAppointment = (item) => {
    // Handle book appointment logic here
  };

  const handlePayment = (payment) => {
    // Handle book appointment logic here
    setSelectPayment(payment);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />

      <LoginHeader title={t("review_details")} onIconPress={handleGoBack} />
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

        <View
          style={{
            backgroundColor: color.consult_bg,
            height: 5,
            width: "100%",
            marginTop: 25,
          }}
        />

        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "bold",
              color: color.black,
              fontSize: ms(14),
            }}
          >
            {t("appointment_details")}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <View style={{ width: 12, height: 12 }}>
              <Image
                source={Icons.person}
                style={{ width: 17, height: 17 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "bold",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                Nishant Shete
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                Male 23
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <View style={{ width: 12, height: 12 }}>
              <Image
                source={Icons.calendar}
                style={{ width: 17, height: 17 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "bold",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                07:15PM
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                Friday, 02 August 2024
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <View style={{ width: 12, height: 12 }}>
              <Image
                source={Icons.hospital}
                style={{ width: 17, height: 17 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "bold",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                In-clinic Consultation
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                Ashwini Clinic, Kasba Peth, Near Pawle Chowk, Near Pawale Chowk,
                Kasba Peth
              </Text>
            </View>
          </View>

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

          <View
            style={{
              backgroundColor: color.consult_bg,
              height: 2,
              width: "100%",
              marginVertical: 20,
            }}
          />

          <Text
            style={{ fontFamily: "bold", color: color.black, fontSize: ms(14) }}
          >
            {t("payment_details")}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "medium",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              {t("doctor_consultation")}
            </Text>

            <Text
              style={{
                fontFamily: "medium",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              ₹ 500
            </Text>
          </View>
          <Image
            source={Icons.dashed_review}
            style={{ width: "100%", height: 1, marginVertical: 10 }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "bold",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              {t("total_to_pay")}
            </Text>

            <Text
              style={{
                fontFamily: "bold",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              ₹ 500
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "bold",
              color: color.black,
              fontSize: ms(14),
              marginHorizontal: 5,
            }}
          >
            {t("payment_methods")}
          </Text>

          <DropShadow
            style={{
              shadowColor: "#00000025",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
            }}
          >
            <View
              style={{
                marginTop: 5,
                padding: 15,
                gap: 15,
                borderWidth: 0.4,
                borderRadius: 10,
                backgroundColor: color.white,
              }}
            >
              <TouchableOpacity onPress={() => handlePayment("online")}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={
                      selectPayment === "online"
                        ? Icons.selected
                        : Icons.unSelected
                    }
                    style={{ width: 23, height: 23 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "bold",
                        color:
                          selectPayment === "online"
                            ? color.black
                            : color.appointment_grey,
                        fontSize: ms(14),
                      }}
                    >
                      {t("pay_online")}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "medium",
                        color: color.appointment_grey,
                        fontSize: ms(14),
                        flexShrink: 1,
                      }}
                    >
                      {t("you_can_use_your_plan_benefit")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePayment("clinic")}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image
                    source={
                      selectPayment === "clinic"
                        ? Icons.selected
                        : Icons.unSelected
                    }
                    style={{ width: 23, height: 23 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "bold",
                        color:
                          selectPayment === "clinic"
                            ? color.black
                            : color.appointment_grey,
                        fontSize: ms(14),
                      }}
                    >
                      {t("pay_at_clinic")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </DropShadow>
        </View>

        <View
          style={{
            backgroundColor: color.review_grey,
            width: "100%",
            height: 1,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            fontFamily: "superBold",
            color: color.black,
            fontSize: ms(14),
            marginTop: 15,
            marginStart: screenWidth / 10,
          }}
        >
          {t("want_more_help_talk_to_our_argents")}
        </Text>

        <DropShadow
          style={{
            shadowColor: "#00000025",
            shadowOffset: { width: 1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }}
        >
          <View
            style={{
              backgroundColor: color.white,
              flexDirection: "row",
              borderWidth: 0.4,
              marginTop: 10,
              marginHorizontal: 20,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 15,
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              source={Icons.phone_call}
              style={{ width: 36, height: 36 }}
            />
            <View
              style={{
                flex: 1,

                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "superBold",
                  color: color.black,
                  fontSize: ms(14),
                }}
              >
                {t("request_to_call_back")}
              </Text>
              <Text
                style={{
                  fontFamily: "medium",
                  color: "#0000008C",
                  fontSize: ms(12),
                }}
              >
                {t("connect_with_our_experts_on_call")}
              </Text>
            </View>

            <Button
              title={t("call_now")}
              buttonStyle={{
                marginEnd: 0,
                marginStart: 0,
                borderRadius: 6,
                borderColor: color.profileBlueBackground,
                borderWidth: 1.4,
                paddingHorizontal: 15,
                height: 32,
                marginBottom: 0,
              }}
              textColor={color.colorPrimary}
              textStyle={{ fontFamily: "superBold", fontSize: ms(14) }}
            />
          </View>
        </DropShadow>

        <DropShadow
          style={{
            shadowColor: "#00000025",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }}
        >
          <View
            style={{
              borderWidth: 0.4,
              borderRadius: 10,
              backgroundColor: color.white,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "superBold",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              {t("safety_measures_followed_at_the_clinic")}
            </Text>
            <FlatList
              data={safetyMeasures}
              renderItem={renderMeasures}
              numColumns={2}
              style={{
                marginTop: 20,
                flex: 1,
              }}
            />
          </View>
        </DropShadow>

        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(14),
              alignItems: "center",
            }}
          >
            {t("finserv_terms")}
            {/* <TouchableOpacity
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            > */}
            <Text
              style={{
                fontFamily: "superBold",
                fontSize: ms(14),
                color: color.profileBlueBackground,

                flex: 1,
              }}
            >
              {" " + t("tnc")}
            </Text>
            {/* </TouchableOpacity> */}
          </Text>
        </View>

        <View style={styles.resendTextContainer}>
          <TouchableOpacity
            style={[
              styles.checkboxContainer,
              isChecked ? styles.checkboxChecked : "",
            ]}
            onPress={toggleCheckbox}
          >
            <Image
              source={Icons.tickMark}
              style={{
                width: 15,
                height: 15,
                tintColor: isChecked ? color.white : color.black,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(14),
              color: color.profileBlueBackground,

              flex: 1,
            }}
          >
            {t("get_upadtes_on_whatsapp")}
          </Text>
        </View>

        <View style={{ marginHorizontal: 15, marginTop: 25, marginBottom: 20 }}>
          <Button
            title={t("pay") + " ₹500"}
            backgroundColor={color.colorPrimary}
            textColor={color.white}
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
    borderColor: color.colorPrimary, // Adjust this color as needed
    borderRadius: 8,
    paddingVertical: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 5,

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
    flex: 2,
  },
  showMoreText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.colorPrimary,
  },
  showMoreIcon: {
    height: 14,
    width: 14,
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

  checkboxContainer: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: color.colorPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  checkboxTick: {
    fontSize: 12,
    color: color.colorPrimary,
  },

  checkboxChecked: {
    backgroundColor: color.colorPrimary,
  },

  checkboxTickChecked: {
    color: color.white,
  },

  resendTextContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: ms(30),
    gap: 5,
    alignItems: "center",
  },
});
