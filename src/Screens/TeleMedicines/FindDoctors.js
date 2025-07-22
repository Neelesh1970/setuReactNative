import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { LinearGradient } from "react-native-linear-gradient";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { ms, s, vs } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import IconGrid from "./Components/IconGrid";
import { screenWidth } from "../../Utils/utils";
import MaskedView from "@react-native-masked-view/masked-view";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import IconGrid2 from "./Components/IconGrid2";
import Error from "../Error/Error";
import SkeletonIconGrid from "./Skeletons/SkeletonIconGrid";

const { width, height } = Dimensions.get("window");
console.log("width::", width);

export default function FindDoctors({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [specialities, setSpecialities] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/doctors-specialty`
      );
      const response2 = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/symptoms`
      );

      setSpecialities(response.data.data);
      setSymptoms(response2.data.data.content);

      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DashboardScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

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
      text: "Join Appointment",
    },
  ];

  if (error) {
    return <Error />;
  }

  return (
    <FlatList
      data={sections}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchBox}
              onPress={() =>
                navigation.navigate("Doctors", { openSearch: true })
              }
            >
              <AntDesign
                name="search1"
                size={s(20)}
                color="#A0A0A0"
                style={styles.searchIcon}
              />
              {/* <TextInput
                placeholder={t("search_doc")}
                placeholderTextColor="#666666"
                style={styles.input}
              /> */}
              <Text style={styles.input}>Search for Doctors</Text>
            </TouchableOpacity>
          </View>

          {/* Gradient banner */}
          <LinearGradient
            colors={[color.gradient_4, color.gradient_3]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 3 }}
            style={styles.gradientBox}
          >
            <View style={styles.gradientHeader}>
              <View style={styles.textContainer}>
                <Text style={styles.consultText}>{t("consult_top_doc")}</Text>
                <Text style={styles.discoverText}>
                  {t("discover_near_doc")}
                </Text>
              </View>
              <View style={styles.imageBody}>
                <Image
                  source={Icons.findDoctor}
                  style={styles.findDoctorImage}
                />
              </View>
            </View>
          </LinearGradient>

          {/* Most Searched Specialities*/}

          {loading ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SkeletonIconGrid />
              </View>
            </>
          ) : (
            <IconGrid
              title="Most Searched Specialities"
              data={specialities}
              navigation={navigation}
              loading={loading}
            />
          )}

          {/* Most Common Symptoms*/}
          {loading ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SkeletonIconGrid />
              </View>
            </>
          ) : (
            <IconGrid2
              title="Most Common Symptoms"
              data={symptoms}
              navigation={navigation}
              loading={loading}
            />
          )}
          {/* how to book  */}

          <View style={styles.bookConsultant}>
            <Text style={styles.bookConsultantHeader}>
              {t("how_to_book_a_doctor")}
            </Text>

            <View style={styles.stepsContainer}>
              {sections.map((item, index) => (
                <View key={index} style={styles.step}>
                  <View style={styles.iconWrapper}>
                    <View style={styles.iconCircle}>
                      <Image source={item.icon} style={styles.icon} />
                    </View>
                    {index < sections.length - 1 && (
                      <>
                        <Text style={styles.dashedLine}>------•</Text>
                      </>
                    )}
                  </View>
                  <View
                    style={{
                      maxWidth: s(75),
                    }}
                  >
                    <Text
                      style={styles.stepText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* footer image */}

          <View style={styles.maskedBody}>
            <View style={styles.maskedBodyHeader}>
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
            <Image source={Icons.doctors} style={styles.doctorImage} />
          </View>
        </View>
      }
      renderItem={({ item }) => item.component}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  gradientBox: {
    height: vs(135),
    borderRadius: 0,
    width: "100%",
    marginTop: vs(25),

    paddingVertical: vs(18),
    alignItems: "center",
    justifyContent: "center",
  },
  gradientHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(18),
  },
  textContainer: {
    width: "70%",
    gap: s(5),
  },
  consultText: {
    fontWeight: "bold",
    fontSize: screenWidth <= 400 ? s(13) : s(14),
    color: color.find_blue,
  },
  discoverText: {
    fontFamily: "regular",
    fontSize: s(11),
    color: color.progressText,
  },
  imageBody: {
    width: "30%",
  },
  findDoctorImage: {
    resizeMode: "cover",

    height: vs(80),
    width: "100%",
  },
  searchContainer: {
    paddingHorizontal: s(20),
    marginTop: vs(18),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 10,
    paddingHorizontal: s(9),
    marginTop: s(9),
  },
  searchIcon: { marginRight: s(9) },
  input: {
    flex: 1,
    color: "#666",
    paddingVertical: vs(9),
    fontSize: s(13),
  },
  bookConsultant: {
    marginHorizontal: s(20),
    marginTop: vs(20),
  },
  bookConsultantHeader: {
    fontSize: s(13),
    fontWeight: "bold",
    color: "#444",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(20),
  },
  step: {
    // width: "100%",
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  iconCircle: {
    padding: s(8),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: s(30),
    width: s(30),
  },
  stepText: {
    position: "absolute",
    fontSize: s(8),
    fontWeight: width <= 400 ? 500 : 700,
    width: "100%",
    marginTop: vs(5),
  },
  dashedLine: {
    color: "#2372B5",
    fontSize: s(14),
  },
  maskedBody: {
    marginTop: vs(60),
  },
  maskedBodyHeader: {
    width: "100%",
    position: "absolute",

    top: 0,
    zIndex: 2,
    marginStart: ms(20),
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
    fontSize: s(24),
    fontWeight: "bold",
    textAlign: "left",
  },
  gradient: {
    height: ms(120),
  },
  doctorImage: {
    height: screenWidth / ms(2.4),
    width: screenWidth,
    resizeMode: "stretch",
    marginTop: ms(100),
  },
});
