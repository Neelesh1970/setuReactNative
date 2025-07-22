import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import SearchBarScreens from "../SearchBar";
import { BlogCardPage } from "./BlogCardPage";
import { CardItem } from "./CardItem";
import { ms, s, verticalScale, vs } from "react-native-size-matters";
import CartHeader from "../Cart/CartHeader";



export const HealthPackageCard = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <CartHeader name="Full Body Checkup" showCart={true}/>
      <SearchBarScreens />
      <View style={styles.container}>
        <ScrollView Style={styles.scrollContent}>
          {/* First Card */}
          <View style={styles.cardWithImage}>
            <Image
              source={require("../../../../assets/images/Keyimages/HR.png")}
            />
            {/* <HR_1  style={styles.cardImage} /> */}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Full Body Checkups</Text>
              <Text style={styles.cardSubtitle}>
                Curated by Doctors for you
              </Text>
            </View>
          </View>
          <Text style={styles.HeadTitle}>Recommended Packages</Text>
          <CardItem navigation={navigation}/>
          <View style={styles.centeredText}>
            <Text style={styles.HeadTitle}>Health Tips</Text>
          </View>

          <BlogCardPage />
          <BlogCardPage />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: ms(10),
    // backgroundColor: '#f0f7ff'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: ms(5) ,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#140B41",
    paddingLeft: 14,

  },
  HeadTitle: {
    paddingTop: 15,
    paddingLeft: 14,
    fontSize: 17,
    fontWeight: "bold",
    color: "#140B41",
  },
  testList: {
    marginBottom: 15,
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  testItem: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  linkText: {
    color: "#0A3D91",
    textDecorationLine: "underline",
  },
  moreTests: {
    color: "#0A3D91",
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cartButton: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderColor: "#140B41",
    borderRadius: 5,
    paddingVertical: 5,
  },
  cartButtonText: {
    color: "#1C57A5",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardWithImage: {
    width: "100%",
    height: 140,
    paddingHorizontal: 10,
    backgroundColor: "#F0F7FF",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  cardImage: {
    width: 130,
    height: 110,
    borderRadius: 10,
    // marginRight: 15,
  },
  textContainer: {
    flex: 1,
    top: -25
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#444",
    paddingLeft: ms(14),
  },
  centeredText: {
    alignItems: "center",
    justifyContent: "center",
  },
});

