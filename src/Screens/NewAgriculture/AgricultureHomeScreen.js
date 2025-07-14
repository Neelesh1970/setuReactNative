// AgricultureHomeScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
// Dashboard navigation is handled by the parent navigator
import DropShadow from "react-native-drop-shadow";
import { color } from "../../assets/colors/Colors";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 250;

const AgricultureHomeScreen = () => {
  const [activeTab, setActiveTab] = useState("all");

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  // Navigation handlers for bottom tabs
  const navigateToScreen = (screenName) => {
    if (screenName === "Dashboard") {
      navigation.navigate("DashboardScreen");
    } else {
      navigation.navigate(screenName);
    }
  };

  const tabs = ["All", "Videos", "Articles"];

  const knowledgeItems = [
    {
      title: "Soil Testing Basics",
      subtitle: "Understand your soil's composition and nutrient levels.",
      image: require("../../assets/images/agriculture/soil_testing.png"),
    },
    {
      title: "Crop Rotation Guide",
      subtitle: "Maximize your land’s potential with effective crop rotation.",
      image: require("../../assets/images/agriculture/crop_rotation.png"),
    },
    {
      title: "Organic Farming Tips",
      subtitle:
        "Learn sustainable practices for healthier crops and environment.",
      image: require("../../assets/images/agriculture/organic.png"),
    },
    {
      title: "Expert Advice",
      subtitle: "Get personalized guidance from our agricultural experts.",
      image: require("../../assets/images/agriculture/expert_advice.png"),
      isExpert: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agriculture</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <ImageBackground
          source={require("../../assets/images/agriculture/new_agriculture.png")}
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay} />
        </ImageBackground>
        <View style={styles.buttonContainer}>
          <DropShadow
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => navigation.navigate("BookSoilTest")}
            >
              <Text style={styles.bookButtonText}>Book Soil Test</Text>
            </TouchableOpacity>
          </DropShadow>
        </View>

        {/* Products */}
        <Text style={styles.sectionTitle}>Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productsContainer}>
            {[
              {
                name: "NutriBoost Fertilizer",
                price: "₹200",
                image: require("../../assets/images/agriculture/prod1.png"),
              },
              {
                name: "PestGuard Pro",
                price: "₹540",
                image: require("../../assets/images/agriculture/prod2.png"),
              },
              {
                name: "High-Yield Seeds",
                price: "₹199",
                image: require("../../assets/images/agriculture/prod3.png"),
              },
            ].map((prod, idx) => (
              <TouchableOpacity key={idx} style={styles.productCard}>
                <Image source={prod.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {prod.name}
                  </Text>
                  <Text style={styles.productPrice}>{prod.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Knowledge Hub */}
        <Text style={styles.sectionTitle}>Knowledge Hub</Text>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.knowledgeList}>
          {knowledgeItems
            .filter(
              (item) =>
                activeTab === "All" ||
                (activeTab === "Videos" && item.isExpert) ||
                (activeTab === "Articles" && !item.isExpert)
            )
            .map((item, idx) => (
              <View key={idx} style={styles.knowledgeItem}>
                <View style={styles.knowledgeText}>
                  <Text style={styles.knowledgeTitle}>{item.title}</Text>
                  <Text style={styles.knowledgeSubtitle}>{item.subtitle}</Text>
                  {item.isExpert && (
                    <TouchableOpacity style={styles.expertButton}>
                      <Text style={styles.expertButtonText}>
                        Talk to Experts
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Image source={item.image} style={styles.knowledgeImage} />
              </View>
            ))}
        </View>
      </ScrollView>

    </View>
  );
};

export default AgricultureHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: color.bottomViewColor,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    // marginLeft: 24, // To center the title accounting for the back button
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  scrollContent: { paddingBottom: 80 },

  banner: { width: width, height: BANNER_HEIGHT },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 0, // Changed from -20 to 0 to move it down
    marginBottom: 20,
    zIndex: 1,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: "#3BB814",
    width: 136,
    height: 40,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16, // Increased from -20 to 16 to position it below the header
    marginBottom: 8,
    // elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookButtonText: { color: "black", fontSize: 16, fontWeight: "600" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginVertical: 8,
    color: "#333",
  },

  productsContainer: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingVertical: 8,
  },
  productCard: {
    width: 161.33,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  productDetails: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
  },

  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  tabButtonActive: { borderBottomColor: "#2e7d32" },
  tabText: { fontSize: 16, color: "#666", fontWeight:'bold' },
  tabTextActive: { color: "#2e7d32", fontWeight: "600" },

  knowledgeList: { paddingHorizontal: 16 },
  knowledgeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  knowledgeText: { flex: 1, paddingRight: 8  },
  knowledgeTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  knowledgeSubtitle: { fontSize: 14, color: "#666", marginBottom: 8, },
  knowledgeImage: { width: 80, height: 60, borderRadius: 6 },
  expertButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  expertButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  bottomNav: {
    backgroundColor: "#1e3f20",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "relative",
    height: 60,
  },
  emergencyButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    bottom: 15,
  },
  emergencyButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f44336",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 4,
    borderColor: "#fff",
  },
  navItem: {
    alignItems: "center",
    padding: 5,
    flex: 1,
    marginHorizontal: 5,
    zIndex: 1,
  },
  navText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
});
