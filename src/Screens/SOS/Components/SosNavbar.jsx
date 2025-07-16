import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../../assets/colors/Colors";

const SosNavbar = ({ navText, backPress, sideText, iconButtons = [] }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {backPress && (
          <TouchableOpacity style={styles.backButton} onPress={backPress}>
            <Ionicons name="chevron-back-outline" size={s(24)} color="white" />
          </TouchableOpacity>
        )}
        <Text
          style={[styles.headerText, !backPress && { paddingLeft: s(12) }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {navText || ""}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        {iconButtons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconButton}
            onPress={btn.onPress}
          >
            <Ionicons name={btn.icon} size={s(24)} color="white" />
            {btn.label && <Text style={styles.iconText}>{btn.label}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      {sideText && (
        <View style={styles.textBody}>
          <Text style={styles.textStyle}>{sideText}</Text>
        </View>
      )}
    </View>
  );
};

export default SosNavbar;

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.bottomViewColor,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: vs(8),
    paddingHorizontal: s(12),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(5),
    flex: 1,
  },
  backButton: {
    paddingRight: s(5),
  },
  headerText: {
    fontSize: s(16),
    color: "#ffffff",
    fontWeight: "600",
    maxWidth: "80%",
    marginStart:40
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: s(12),
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: s(10),
    marginTop: vs(2),
    fontWeight: 500,
  },
  textBody: {
    justifyContent: "center",
  },
  textStyle: {
    fontSize: s(14),
    color: "#ffffff",
    fontWeight: "400",
  },
});
