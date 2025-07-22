import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms, s, vs } from "react-native-size-matters";
import { Navbar } from "../Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MedicineOrderHistory = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Navbar navText={"Medicine Order History"} backPress={handleBackPress} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderHistoryCard />
      </ScrollView>
    </View>
  );
};

export default MedicineOrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  orderCard: {
    borderWidth: s(1),
    borderColor: "#1C57AF",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    width: "100%",
    overflow: "hidden",

    marginBottom: vs(10),
  },
  orderHeaderBody: {
    paddingVertical: vs(8),
    paddingHorizontal: s(10),
    backgroundColor: "#83ABF924",
    borderBottomWidth: s(1),
    borderBottomColor: "#1C57AF",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  orderHeaderRow: {},
  lableValueRow: {
    flexDirection: "row",
    gap: s(2),
  },
  labelText: {
    fontSize: s(12),
    fontWeight: "600",
    color: "#1C57AF",
  },
  labelText2: {
    fontSize: s(12),
    fontWeight: "600",
    color: "#000000",
  },
  valueText: {
    fontSize: s(12),
    fontWeight: "400",
    color: "#1C1C1C",
  },
  lableValueCol: {},
  orderDetailBody: {
    gap: vs(5),
    paddingVertical: vs(10),
    paddingHorizontal: s(10),
  },
});

const OrderHistoryCard = () => {
  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeaderBody}>
        <View style={styles.orderHeaderRow}>
          <LableValueRow label="Order Id: " value="ORD879237429" />
          <LableValueRow label="Reference No: " value="879456" />
        </View>
        <Ionicons
          name="checkmark-circle-outline"
          size={s(22)}
          color="#1C57AF"
        />
      </View>
      <View style={styles.orderDetailBody}>
        <LableValueCol label={"Medicine Name"} value={"ABC 100mg"} />
        <LableValueCol label={"Quantity"} value={"2 Strips each"} />
        <LableValueCol label={"Medicine Name"} value={"ABC 100mg"} />
      </View>
    </View>
  );
};

const LableValueRow = ({ label, value }) => {
  return (
    <View style={styles.lableValueRow}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const LableValueCol = ({ label, value }) => {
  return (
    <View style={styles.lableValueCol}>
      <Text style={styles.labelText2}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};
