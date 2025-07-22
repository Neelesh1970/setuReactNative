// components/CommonBottomBar.js

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icons } from "../assets/icons/Icons"; // adjust path if needed

export default function CommonBottomBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("DashboardScreen")} style={styles.tabItem}>
        <Image source={Icons.dashboard_home} style={styles.icon} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ReportScreen")} style={styles.tabItem}>
        <Image source={Icons.dashboard_report} style={styles.icon} />
        <Text style={styles.label}>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate("Emergency")}
      >
        <Text style={styles.helpText}>HELP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Schedule")} style={styles.tabItem}>
        <Image source={Icons.dashboard_calendar_new} style={styles.icon} />
        <Text style={styles.label}>Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Setuchat")} style={styles.tabItem}>
        <Image source={Icons.dashboard_robo} style={styles.icon} />
        <Text style={styles.label}>SetuChat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    backgroundColor: "#1C39BB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    marginBottom: 4,
  },
  label: {
    color: "#fff",
    fontSize: 12,
  },
  helpButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  helpText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
