import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import {CardItem} from "./CardItem";
import HemogramList from "./HemogramList";
import TableInfo from "./Tableinfo";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBarScreens from "../SearchBar";
import CartHeader from "../Cart/CartHeader";




export const FullBodyInfoScreen = ({
  navigation,
}) => {
  const tableData = [
    { id: "1", name: "John Doe", age: 25, gender: "Male" },
    { id: "2", name: "Jane Smith", age: 30, gender: "Female" },
    { id: "3", name: "Mark Taylor", age: 22, gender: "Male" },
    { id: "4", name: "Lisa Brown", age: 27, gender: "Female" },
  ];

  return (
    <View style={styles.screenContainer}>
      <CartHeader name="Full Body Checkup" showCart={true}/>
      <SearchBarScreens />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Freedom Healthy Package 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this package</Text>
            <Text style={styles.description}>
              Freedom this package 2024 is a preventive care, curative health
              checkup package that includes 111 parameters with essential blood.
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus.
            </Text>
          </View>

          <TableInfo />

          <Text style={styles.HeadTitle}>Recommended Packages</Text>

          <HemogramList />

          {/* Precaution Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="info-outline" size={20} color="#000" />
              <Text style={styles.cardTitle}>Precaution</Text>
            </View>
            <Text style={styles.cardDescription}>
              Do not consume anything other than water for 8 - 10 hours before
              the test.
            </Text>
          </View>

          {/* Additional CardItem Component */}
          <CardItem />
          {/* <Button
            title="Check-Up"
            onPress={() => navigation.navigate("CartScreen")}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // Expands to full screen height
  },
  container: {
    flex: 1, // Ensures the screen is expanded properly
  },
  scrollContainer: {
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50, // Increased to ensure bottom UI elements remain visible
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 16,
    // textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3E4F5F",
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    marginVertical: 15,
    backgroundColor: "#F8F9FA",
    // borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  tableWrapper: {
    borderWidth: 2,

    borderRadius: 4,
    borderColor: "#CFCFCF",
    marginBottom: 20, // Adds spacing below the table
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#3E4F5F",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  rowText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#3E4F5F",
    textAlign: "center",
  },
  HeadTitle: {
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: "#140B41",
  },
});

