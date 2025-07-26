import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import EcartBottomNavBar from "./EcartBottomNavbar";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../assets/colors/Colors";

const orders = [
  {
    id: 1,
    number: "789XYZ",
    date: "05/12/23",
    total: "$125",
    image: require("../../assets/images/e_cart/order1.png"),
  },
  {
    id: 2,
    number: "456ABC",
    date: "15/11/23",
    total: "$75",
    image: require("../../assets/images/e_cart/order2.png"),
  },
  {
    id: 3,
    number: "123DEF",
    date: "25/10/23",
    total: "$50",
    image: require("../../assets/images/e_cart/order3.png"),
  },
  {
    id: 4,
    number: "987GHI",
    date: "05/09/23",
    total: "$100",
    image: require("../../assets/images/e_cart/order4.png"),
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Orders & Returns</Text>
          <Icon name="chevron-down" size={20} color="#fff" />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity onPress={() => setActiveTab("Active")}>
            <Text
              style={
                activeTab === "Active" ? styles.activeTab : styles.inactiveTab
              }
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("History")}>
            <Text
              style={
                activeTab === "History" ? styles.activeTab : styles.inactiveTab
              }
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Cards */}
        {orders.map((order) => (
          <DropShadow
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <Image source={order.image} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>
                  Order number: {order.number}
                </Text>
                <Text style={styles.orderDate}>Order date: {order.date}</Text>
                <Text style={styles.orderTotal}>Total: {order.total}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#000" />
            </TouchableOpacity>
          </DropShadow>
        ))}
      </ScrollView>

      <EcartBottomNavBar
        activeTab="Profile"
        onTabPress={(tab) => console.log(tab)}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFD",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 10,
    marginBottom: 12,
    // paddingHorizontal: 20,
    padding: 20,
    backgroundColor:color.bottomViewColor
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 8,
  },
  activeTab: {
    fontSize: 15,
    fontWeight: "700",
    color: "#007BFF",
  },
  inactiveTab: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingRight: 10,
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    // elevation: 1,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  orderDate: {
    fontSize: 14,
    color: "#4A7BD3",
    marginTop: 2,
  },
  orderTotal: {
    fontSize: 14,
    color: "#4A7BD3",
    marginTop: 2,
  },
});
