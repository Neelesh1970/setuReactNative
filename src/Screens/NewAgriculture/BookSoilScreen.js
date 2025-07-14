import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from "react-native";
import DropShadow from "react-native-drop-shadow";

import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../assets/colors/Colors";

const BookSoilScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#F3F8EF" /> */}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agriculture</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="document-text-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TouchableOpacity style={styles.addFieldCard}>
          {/* Add New Field Card with full background */}
          <ImageBackground
            source={require("../../assets/images/agriculture/man.png")} // Your full background image
            style={styles.imagecard}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.addTitle}>
                + {"\n"}Add New {"\n"}Field
              </Text>
              <Text style={styles.addSub}>
                Monitor crop health,{"\n"}weather, soil in real time
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Field Cards */}
        {[1, 2].map((item) => (
          <TouchableOpacity key={item} style={styles.fieldCard}>
            <View>
              <Text style={styles.fieldTitle}>Abc</Text>
              <Text style={styles.fieldText}>🌿 Crop: Wheat</Text>
              <Text style={styles.fieldText}>💧 Moisture: 58%</Text>
              <Text style={styles.fieldDate}>📅 Last updated: 2 days ago</Text>
            </View>
            <Image
              source={require("../../assets/images/agriculture/land1.png")} // Your farm image
              style={styles.farmImg}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}

        {/* Footer Note */}
        <DropShadow
          style={{
            shadowColor: "#00000030",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              👉 Tap a field to view insights!
            </Text>
          </View>
        </DropShadow>
      </ScrollView>
    </View>
  );
};

export default BookSoilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8EF",
    // paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: color.bottomViewColor
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
    textAlign: "center",
    padding:20
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 12,
  },
  addFieldCard: {
    // height: "85%",
    // marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    // paddingHorizontal: 16,
    // marginTop: 10,
  },
  imagecard: {
    height: "95%",
    width: "95%",
    marginHorizontal: 16,
  },

  overlay: {
    position: "absolute",
    top: "20%",
    // backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 10,
    // alignSelf: 'flex-start',
  },
  addTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
    top: 0,
  },
  addSub: {
    fontSize: 18,
    color: "#3C5F2D",
    marginTop: 4,
    fontWeight: "bold",
  },
  fieldCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 6,
  },
  fieldText: {
    fontSize: 16,
    marginBottom: 2,
  },
  fieldDate: {
    fontSize: 13,
    color: "#888",
  },
  farmImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginLeft: 10,
  },
  footerNote: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#3C5F2D",
    backgroundColor: "#EDF3E6",
    padding: 10,
    borderRadius: 8,
  },
});
