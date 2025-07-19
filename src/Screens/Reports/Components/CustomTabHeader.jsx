import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";

const CustomTabHeader = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabHeader}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
          onPress={() => setActiveTab(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomTabHeader;

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: "row",
    marginBottom: vs(10),
  },
  tabButton: {
    paddingHorizontal: s(10),
    paddingVertical: vs(12),
    flex: 1,
    alignItems: "center",
    borderBottomWidth: s(1),
    borderColor: "#D9D9D9",
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
