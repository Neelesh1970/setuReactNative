import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs, ms } from "react-native-size-matters";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatDateTime } from "../Services/helperFunction";

const AlertCard = ({ item }) => {
  const getIcon = () => {
    switch (item.triggerType) {
      case "Ambulance Alert":
        return <FontAwesome name="ambulance" size={s(26)} color="#2372B5" />;
      case "Police Alert":
        return (
          <MaterialIcons name="local-police" size={s(26)} color="#2372B5" />
        );
      case "Emergency Alert":
        return <FontAwesome name="warning" size={s(26)} color="#2372B5" />;
      case "Women Safety Alert":
        return <FontAwesome name="female" size={s(26)} color="#2372B5" />;
      default:
        return null;
    }
  };

  const { time, date } = formatDateTime(item.createdAt);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>{item?.triggerType}</Text>

        <View style={styles.pointsWrap}>
          <View style={styles.pointCol}>
            <MaterialIcons name="arrow-outward" size={s(14)} color="#E95455" />
            <Text style={styles.pointsText}>{item?.amt}</Text>
          </View>
          {getIcon()}
        </View>
      </View>

      {/* <InfoRow ionIconName="location-outline" text={item?.location} /> */}
      <InfoRow ionIconName="time-outline" text={time} />
      <InfoRow ionIconName="calendar-outline" text={date} />
      {item?.sendToEmergencyContacts.length !== 0 && (
        <>
          <Text style={styles.sentToText}>Sent to</Text>
          <View style={styles.sentToContainer}>
            {item?.emergencyContacts.map((data, index) => (
              <View key={index} style={styles.sentToChip}>
                <Text style={styles.chipText}>{data.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default AlertCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    padding: ms(12),
    backgroundColor: "#FFFFFF",
    marginBottom: vs(15),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(8),
  },
  cardTitle: {
    fontSize: s(14),
    fontWeight: "700",
    color: "#1C1C1C",
  },
  pointsWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: s(10),
  },
  pointCol: {
    alignItems: "center",
  },
  pointsText: {
    color: "#E95455",
    fontSize: s(12),
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    marginVertical: vs(2),
  },
  infoText: {
    fontSize: s(13),
    color: "#1C1C1C",
  },
  sentToText: {
    fontWeight: "700",
    marginTop: vs(10),
    fontSize: s(13),
    color: "#1C1C1C",
  },
  sentToContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: s(8),
    marginTop: vs(6),
  },
  sentToChip: {
    backgroundColor: "#E6EFFA",
    paddingHorizontal: s(10),
    paddingVertical: vs(4),
    borderRadius: s(20),
  },
  chipText: {
    color: "#2372B5",
    fontSize: s(12),
    fontWeight: "600",
  },
});

const InfoRow = ({ ionIconName, text }) => {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={ionIconName} size={s(16)} color="#2372B5" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};
