import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Navbar = ({ navText, backPress, functionIconName, functionPress }) => {
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
      {functionIconName && (
        <TouchableOpacity style={styles.functionButton} onPress={functionPress}>
          <MaterialCommunityIcons
            name={functionIconName}
            size={s(24)}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2372B5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(5),
  },
  backButton: {
    paddingVertical: vs(5),
    paddingHorizontal: s(10),
  },
  headerText: {
    fontSize: s(16),
    color: "#ffffff",
    fontWeight: "600",
    paddingVertical: vs(10),
  },
  functionButton: {
    paddingHorizontal: s(15),
    paddingVertical: vs(5),
  },
});
