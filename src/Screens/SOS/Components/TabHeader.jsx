import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
const TabHeader = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabHeader}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "history" && styles.activeTab]}
        onPress={() => setActiveTab("history")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "history" && styles.activeTabText,
          ]}
        >
          History
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "transaction" && styles.activeTab,
        ]}
        onPress={() => setActiveTab("transaction")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "transaction" && styles.activeTabText,
          ]}
        >
          Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: "row",
  },
  tabButton: {
    paddingHorizontal: s(10),
    paddingVertical: vs(12),
    flex: 1,
    alignItems: "center",
    borderBottomWidth: s(1),
    borderLeftWidth: s(1),
    borderRightWidth: s(1),
    borderColor: "#D9D9D9",
    borderBottomRightRadius: s(8),
    borderBottomLeftRadius: s(8),
  },
  tabText: {
    color: "#666666",
    fontSize: s(14),
    fontWeight: 500,
  },
  activeTab: {
    borderBottomWidth: s(3),
    borderColor: "#2372B5",
  },
  activeTabText: {
    color: "#2372B5",
    fontWeight: "600",
  },
});
