import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TransactionCard = ({ item }) => {
  console.log("item::", item);
  const createdAt = new Date(item.createdAt);
  const time = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = createdAt.toLocaleDateString();
  return (
    <View style={styles.card}>
      <MaterialIcons name="arrow-downward" size={s(20)} color="#1B970F" />
      <View style={styles.midCol}>
        <Text style={styles.primaryText}>{item?.txnType}</Text>
        <Text style={styles.secondaryText}>
          {time} | {date}
        </Text>
      </View>
      <Text style={styles.pointsText}>₹{item?.amt}</Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(10),
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    backgroundColor: "#FFFFFF",
    marginBottom: vs(15),
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  pointsText: {
    color: "#1B970F",
    fontSize: s(15),
    fontWeight: "600",
  },
  midCol: {
    flex: 1,
  },
  primaryText: {
    fontSize: s(13),
    fontWeight: 700,
    color: "#1C1C1C",
  },
  secondaryText: {
    fontSize: s(12),
    fontWeight: 400,
    color: "#726969",
  },
});
