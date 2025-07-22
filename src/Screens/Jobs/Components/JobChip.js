import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";

const JobChip = ({ label, icon, color = "#1C57A5" }) => {
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: color === "grey" ? "#E0E0E0" : "#E2F2FF" },
      ]}
    >
      <View style={styles.chipContent}>
        <View>
          <Text
            style={[
              styles.chipText,
              { color: color === "grey" ? "#676869" : "#1C57A5" },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
        </View>
        {icon && <View style={styles.icon}>{icon()}</View>}
      </View>
    </View>
  );
};

export default JobChip;

const styles = StyleSheet.create({
  chip: {
    marginRight: s(8),
    marginBottom: s(8),
    paddingHorizontal: s(16),
    paddingVertical: vs(7),
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  chipContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipText: {
    fontWeight: "bold",
    fontSize: s(11),
    flexShrink: 1,
    marginRight: s(5),
    maxWidth: s(120),
  },
  icon: {
    marginLeft: s(5),
  },
});
