import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icons } from "../../../assets/icons/Icons";
import { ms, s, vs } from "react-native-size-matters";

const DoctorCard = ({ doctor, navigation, specialityId, symptomId }) => {
  return (
    <View style={styles.doctorCard}>
      <View style={styles.cardHeader}>
        <Image source={Icons.doctor_lady} style={styles.cardImage} />
        <View style={styles.headerMid}>
          <Text
            style={styles.doctorName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {doctor?.name}
          </Text>
          <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
            {doctor?.sname}
          </Text>
          <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
            {doctor?.education || "MBBS"}
          </Text>
          <View style={styles.headerFooter}>
            <Text style={styles.experienceText}>{doctor?.exp} </Text>
            <Text style={styles.ratingText}>
              {doctor?.rating || "70"} % positive ratings
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <View style={styles.locationBox}>
            <View style={styles.location}>
              <Ionicons name="location-outline" size={s(16)} color="#555" />
              <Text style={styles.locationText}>
                {doctor?.city_name || "Pune"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles?.costText}>
              ₹ {doctor?.doctorRate || 500}
              {/* {doctor?.currencyName} */}
            </Text>
          </View>
        </View>
        <View style={[styles.cardRow, { marginTop: vs(17) }]}>
          <View style={styles.locationBox}>
            <View style={styles.location}>
              <Ionicons name="time-outline" size={s(16)} color="#555" />
              <Text style={styles.locationText}>Available at</Text>
            </View>
            <View style={styles.distance}>
              <Text style={styles.distanceText}>
                {doctor?.availability || "9:00 AM"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookAppointment}
            onPress={() =>
              navigation.navigate("DoctorAppointment", {
                doctor,
                specialityId,
                symptomId,
              })
            }
          >
            <Text style={styles.bookAppointmentText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  doctorCard: {
    flex: 1,
    borderWidth: 1,
    marginBottom: vs(18),
    borderColor: "#c4c4c4",
    padding: ms(10),
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",

    alignItems: "flex-start",
  },
  cardImage: {
    height: ms(65),
    width: ms(65),
  },
  headerMid: {
    flex: 1,
    paddingHorizontal: vs(8),
  },
  doctorName: {
    fontWeight: "bold",
    fontSize: s(12),
  },
  subText: {
    fontSize: s(10),
  },
  headerFooter: {
    flexDirection: "row",
    gap: s(10),
  },
  experienceText: {
    fontWeight: 700,
    fontSize: s(10),
  },
  ratingText: {
    color: "#086608",
    fontSize: s(10),
    fontWeight: 700,
  },
  cardContent: {
    marginTop: vs(18),
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationBox: {
    flex: 1,
  },
  location: {
    flexDirection: "row",
  },
  locationText: {
    fontWeight: 700,
    fontSize: s(10),
    color: "#555",
    marginLeft: s(4),
  },
  costText: {
    fontWeight: "bold",
    fontSize: s(13),
  },
  distance: {
    paddingLeft: s(15),
  },
  distanceText: {
    fontWeight: 700,
    fontSize: s(10),
    color: "#555",
  },
  bookAppointment: {
    backgroundColor: "#2372B5",
    paddingHorizontal: s(15),
    paddingVertical: vs(8),
    textAlign: "center",
    borderRadius: 6,
  },
  bookAppointmentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(11),
  },
});
