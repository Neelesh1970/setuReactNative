import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DropShadow from "react-native-drop-shadow";

const AstrologyHome = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation();

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <Text style={styles.sectionTitle}>Today’s Horoscope</Text>
            <View style={styles.card}>
              <Image
                source={require("../../assets/images/Astrology/aries.png")}
                style={styles.cardImage} 
                resizeMode="contain"
              />
              <Text style={styles.cardText}>
                Aries, your day is filled with opportunities for growth and
                self-discovery. Embrace new challenges with confidence and trust
                your intuition.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Personal Readings</Text>
            <View style={styles.row}>
              <View style={styles.miniCard}>
                <Image
                  source={require("../../assets/images/Astrology/tarot.png")}
                  style={styles.miniImage}
                />
                <Text style={styles.cardLabel}>Tarot Reading</Text>
              </View>
              <View style={styles.miniCard}>
                <Image
                  source={require("../../assets/images/Astrology/birthchart.png")}
                  style={styles.miniImage}
                />
                <Text style={styles.cardLabel}>Birth Chart</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Explore</Text>
            <View style={styles.row}>
             
              <View style={styles.miniCard}>
                <Image
                  source={require("../../assets/images/Astrology/love_horoscope.png")}
                  style={styles.miniImage}
                />
                <Text style={styles.cardLabel}>Daily Love</Text>
              </View>
               <View style={styles.miniCard}>
                <Image
                  source={require("../../assets/images/Astrology/career_forcast.png")}
                  style={styles.miniImage}
                />
                <Text style={styles.cardLabel}>Career</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.miniCard, { width: "100%" }]}>
                <Image
                  source={require("../../assets/images/Astrology/wellness.png")}
                  style={styles.miniImage}
                />
                <Text style={styles.cardLabel}>Monthly Wellness</Text>
              </View>
            </View>
          </ScrollView>
        );

      case "Horoscopes":
        return (
          <Text style={styles.contentText}>
            🔮 All Horoscope Signs will appear here.
          </Text>
        );

      case "Readings":
        return (
          <Text style={styles.contentText}>
            🧿 Your personalized readings go here.
          </Text>
        );

      case "Birth Chart":
        return (
          <Text style={styles.contentText}>
            🌌 Birth chart analysis screen.
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AstroDaily</Text>
        <TouchableOpacity style={styles.selectSignButton} onPress={() => navigation.navigate("ZodiacSign")}>
          <Text style={styles.selectSignText}>🔽 Select Sign</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{renderContent()}</View>

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        {["Home", "Horoscopes", "Readings", "Birth Chart"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTab]}
            >
              {tab === "Home" && "🏠"}
              {tab === "Horoscopes" && "🔮"}
              {tab === "Readings" && "🧿"}
              {tab === "Birth Chart" && "🌌"}
              {"\n"}
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AstrologyHome;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  headerText: {
    color: "#1C39BB",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#1C39BB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    tintColor: "#fff"
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 12,
    fontWeight : "bold"
  },
  sectionTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  miniCard: {
    width: "48%",
    backgroundColor: "#F2D3BC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: "center",
  },
  miniImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#19171D",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#2A2A2A",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
  },
  activeTab: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectSignButton: {
    backgroundColor: "#F2D3BC",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  selectSignText: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "600",
  },
});
