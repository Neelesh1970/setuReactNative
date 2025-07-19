import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Navbar } from "./Components";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../assets/colors/Colors";

const ReportsHome = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const cards = [
    {
      title: "Test Report",
      imageUrl:
        "https://img.freepik.com/free-photo/hand-with-protective-gloves-holding-blood-samples-covid-test_23-2148958363.jpg",
      onPress: () => navigation.navigate("TestReport"),
    },
    {
      title: "Medication",
      imageUrl:
        "https://img.freepik.com/free-photo/packings-pills-capsules-medicines_1339-2254.jpg",
      onPress: () => navigation.navigate("Medication"),
    },
    {
      title: "Vital Signs",
      imageUrl:
        "https://img.freepik.com/free-photo/top-view-tensiometer-checking-blood-pressure_23-2150456074.jpg",
      onPress: () => navigation.navigate("VitalSigns"),
    },
    {
      title: "Allergic",
      imageUrl:
        "https://img.freepik.com/free-photo/view-allergens-commonly-found-food_23-2150170306.jpg",
      onPress: () => navigation.navigate("Allergies"),
    },
    {
      title: "Biomedical Implant",
      imageUrl:
        "https://img.freepik.com/free-photo/view-man-with-prosthetic-legs-white-sneakers_1268-21373.jpg",
      onPress: () => navigation.navigate("BiomedicalImplants"),
    },
    {
      title: "Immunization",
      imageUrl:
        "https://img.freepik.com/free-photo/patient-having-vaccination-closeup_53876-105101.jpg",
      onPress: () => navigation.navigate("Immunization"),
    },
    {
      title: "Lifestyle History",
      imageUrl:
        "https://img.freepik.com/free-psd/healthy-routine-illustration_23-2151655143.jpg",
      onPress: () => navigation.navigate("LifeStyle"),
    },
    {
      title: "Upload Documents",
      imageUrl:
        "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041854.jpg",
      onPress: () => navigation.navigate("MedicalDocumentsUpload"),
    },
    {
      title: "Case Paper",
      imageUrl:
        "https://img.freepik.com/free-photo/pen-document-folder_23-2148148379.jpg",
      onPress: () => console.log("page not found"),
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          backgroundColor: color.bottomViewColor,
          alignItems: "center",
          gap: 70,
        }}
      >
        <TouchableOpacity style={{ marginStart: 10 }} onPress={handleBack}>
          <Ionicons name="arrow-back" size={25} color={"#fff"} />
        </TouchableOpacity>
        <Navbar navText={"Medical Records"} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.recordsGrid}>
          {cards.map((card, index) => (
            <RecordsCard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              onPress={card.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsHome;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(100),
  },
  recordsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),

    flex: 1,
  },
  cardImage: {
    width: "100%",
    height: vs(80),
    backgroundColor: "#E0E0E0",
  },
  recordCard: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    marginBottom: vs(8),
    alignItems: "center",
    gap: s(8),
    width: "47%",
    overflow: "hidden",
  },
  cardBtnBody: {
    width: "100%",
    padding: ms(10),
  },
  navigateButton: {
    backgroundColor: color.bottomViewColor,
    width: "100%",
    alignItems: "center",
    borderRadius: s(6),
    paddingVertical: vs(2),
  },
  cardTitle: {
    fontSize: s(13),
    color: "#1C1C1C",
    fontWeight: 600,
    textAlign: "center",
  },
});

const RecordsCard = ({ imageUrl, title, onPress }) => {
  return (
    <View style={styles.recordCard}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardBtnBody}>
        <TouchableOpacity style={styles.navigateButton} onPress={onPress}>
          <Ionicons name="arrow-forward" size={s(24)} color="#fcfcfc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
