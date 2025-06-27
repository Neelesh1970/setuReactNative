import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { ms, s } from "react-native-size-matters";
import { Icons } from "../../assets/icons/Icons";

const benefits = [
  {
    title: "Securely Store all your health records",
    description:
      "Automatically receive and store medical records like lab reports, prescriptions and more from any Ayushman Bharat Digital Mission enlisted health facilities.",
    icon: require("./images/medical-report.png"),
  },
  {
    title: "Share seamlessly with doctors and health facilities",
    description:
      "Avoid long queues for medical services with instant register and instant share your health records with any doctor/facility using ABHA",

    icon: require("./images/medical-record.png"),
  },
];

const AbhaHome = ({ navigation }) => {
  const buttons = [
    {
      name: "Create new ABHA",
      onPress: () => navigation.navigate("CreateAbhaAadhar"),
    },
    {
      name: "Login existing ABHA",
      ononPress: () => navigation.navigate("CreateAbhaAadhar"),
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.abhaHome}>
          {/* banner  */}
          <View style={styles.abhaHome_bannerBody}>
            <View style={styles.bannerBody_header}>
              <Image
                source={Icons.setu_logo_doc}
                style={styles.bannerBody_logo}
                resizeMode="contain"
              />
              <Image
                source={require("./images/nationalHealthAuthority.png")}
                style={styles.bannerBody_logo2}
                resizeMode="contain"
              />
            </View>
            <View style={styles.bannerBody_Details}>
              <Text style={styles.detail_Title}>What is ABHA?</Text>
              <Text style={styles.detail_Info}>
                ABHA (Ayushman Bharat Health Account) is an initiative By
                Government of India to help access to any kind of medical
                Services at your fingertips.
              </Text>
              <View style={styles.detail_Link_Body}>
                <Text
                  style={styles.detail_Link}
                  onPress={() => Linking.openURL("https://abdm.gov.in/")}
                >
                  For more information:{" "}
                  <Text style={styles.linkText}>https://abdm.gov.in/</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* benefits */}
          <Text style={styles.abhaBenfits_title}>
            Benefits Of Creating ABHA
          </Text>

          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitBody}>
              <View style={styles.benefitBody_imageBody}>
                <Image source={benefit.icon} style={styles.benefitBody_logo} />
              </View>
              <View style={styles.benefitBody_detailBody}>
                <Text style={styles.benefitBody_title}>{benefit?.title}</Text>
                <Text style={styles.benefitBody_desciption}>
                  {benefit?.description}
                </Text>
              </View>
            </View>
          ))}

          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.abhaButton}
              onPress={button?.onPress}
            >
              <Text style={styles.abhaButtonText}>{button?.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbhaHome;

const styles = StyleSheet.create({
  abhaHome: {
    padding: s(20),
  },
  abhaHome_bannerBody: {
    backgroundColor: "#D2E6FF",
    borderRadius: s(5),
  },
  bannerBody_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: s(15),
    gap: s(10),
  },
  bannerBody_logo: {
    width: s(90),
    height: s(50),
  },
  bannerBody_logo2: {
    width: s(160),
    height: s(70),
  },
  bannerBody_Details: {
    paddingHorizontal: s(20),
  },
  detail_Title: {
    fontSize: s(14),
    fontWeight: "bold",
  },
  detail_Info: {
    fontSize: s(12),
    marginTop: ms(10),
  },
  detail_Link_Body: {
    width: "100%",
    alignItems: "center",
    marginTop: s(10),
    paddingBottom: s(30),
  },
  detail_Link: {
    fontSize: s(10),
    fontWeight: "bold",
  },
  linkText: {
    color: "#1C57A5",
  },
  abhaBenfits_title: {
    fontSize: s(16),
    fontWeight: "bold",
    marginTop: ms(20),
    marginBottom: ms(30),
  },
  benefitBody: {
    flexDirection: "row",
    gap: s(20),
    marginBottom: ms(20),
  },
  benefitBody_logo: {
    height: s(50),
    width: s(50),
  },
  benefitBody_title: {
    fontSize: s(14),
    fontWeight: "bold",
  },
  benefitBody_desciption: {
    fontSize: s(12),
  },

  benefitBody_detailBody: {
    flex: 1,
  },

  abhaButton: {
    backgroundColor: "#1C57A5",
    width: "100%",
    marginVertical: ms(10),
    alignItems: "center",
    paddingVertical: s(10),
    paddingHorizontal: s(20),
    borderRadius: s(5),
  },
  abhaButtonText: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "bold",
  },
});
