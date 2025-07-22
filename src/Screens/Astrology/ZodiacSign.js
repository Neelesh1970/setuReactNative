import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import DashboardScreen from "../Dashboard/DashboardScreen";
import CommonBottomBar from "../../Routes/CommonTabbar";

const zodiacData = [
  {
    name: "Aries",
    image: require("../../assets/images/Astrology/aries.png"),
    description: "Energetic and courageous. Great time to start something new.",
  },
  {
    name: "Taurus",
    image: require("../../assets/images/Astrology/taurus.png"),
    description: "Stay grounded. Financial decisions work in your favor today.",
  },
  {
    name: "Gemini",
    image: require("../../assets/images/Astrology/gemini.png"),
    description: "Communication is key. Good day for socializing and planning.",
  },
  {
    name: "Cancer",
    image: require("../../assets/images/Astrology/cancer.png"),
    description: "Trust your emotions. A family member needs your warmth.",
  },
  {
    name: "Leo",
    image: require("../../assets/images/Astrology/leo.png"),
    description: "Show your leadership. Recognition is coming your way.",
  },
  {
    name: "Virgo",
    image: require("../../assets/images/Astrology/virgo.png"),
    description: "Details matter. Organizing your day brings success.",
  },
  {
    name: "Libra",
    image: require("../../assets/images/Astrology/libra.png"),
    description: "Balance your time. You’ll find clarity in decisions.",
  },
  {
    name: "Scorpio",
    image: require("../../assets/images/Astrology/scorpio.png"),
    description: "Intense focus brings results. Let go of resentment.",
  },
  {
    name: "Sagittarius",
    image: require("../../assets/images/Astrology/sagittarius.png"),
    description: "Explore ideas. A perfect day for learning something new.",
  },
  {
    name: "Capricorn",
    image: require("../../assets/images/Astrology/capricorn.png"),
    description: "Hard work pays off. Stay consistent with your goals.",
  },
  {
    name: "Aquarius",
    image: require("../../assets/images/Astrology/aquarius.png"),
    description: "Innovation is your strength. Embrace change confidently.",
  },
  {
    name: "Pisces",
    image: require("../../assets/images/Astrology/pisces.png"),
    description: "Follow your intuition. A creative breakthrough is near.",
  },
];

export default function ZodiacScreen() {
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {!selectedZodiac ? (
          <>
            <Text style={styles.heading}>Choose Your Zodiac Sign</Text>
            <View style={styles.grid}>
              {zodiacData.map((item, index) => (
                // <DropShadow style={styles.iconWrapper}
                //  >
                <TouchableOpacity
                  key={index}
                  style={styles.iconWrapper}
                  onPress={() => navigation.navigate("DailyHoroscope", { zodiac: item })}
                >
                  <Image source={item.image} style={styles.iconImage} />
                  <Text style={styles.iconText}>{item.name}</Text>
                </TouchableOpacity>
                // </DropShadow>
              ))}
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.back}>← Back to Zodiac List</Text>
            </TouchableOpacity>
            <View style={styles.detailCard}>
              <Image source={selectedZodiac.image} style={styles.detailImage} />
              <Text style={styles.detailTitle}>{selectedZodiac.name}</Text>
              <Text style={styles.detailDesc}>
                {selectedZodiac.description}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
      {/* <CommonBottomBar /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C39BB",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },

  iconWrapper: {
    width: "30%", // Fits 3 in a row with spacing
    aspectRatio: 1,
    marginBottom: 15,
    backgroundColor: "#fff", // keep as per your theme
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 6,
    tintColor: "#1C39BB", // as per your original
  },
  iconText: {
    color: "#1C39BB", // keep original
    fontSize: 14,
    textAlign: "center",
    fontWeight:'bold'
  },
  back: {
    color: "#1C39BB",
    fontSize: 18,
    marginBottom: 20,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  detailCard: {
    alignItems: "center",
    backgroundColor: "#1C39BB",
    padding: 20,
    borderRadius: 12,
    width: "100%",
  },
  detailImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: "#fff",
  },
  detailTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 8,
  },
  detailDesc: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
//   },