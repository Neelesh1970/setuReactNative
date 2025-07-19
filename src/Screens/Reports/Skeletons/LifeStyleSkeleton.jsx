import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";

const LifeStyleSkeleton = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Grid Body Skeleton */}
        <View style={styles.gridBody}>
          <GridCardSkeleton />
          <GridCardSkeleton />
          <GridCardSkeleton />
          <GridCardSkeleton />
          <GridCardSkeleton />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    paddingBottom: vs(50),
  },

  gridBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
    flex: 1,
  },
  gridCard: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#F5F5F5", // Lighter color for skeleton
    justifyContent: "flex-start",
    width: "47%",
    overflow: "hidden",
    alignItems: "center",
    padding: ms(10),
    marginBottom: vs(10),
  },
  gridCardValue: {
    paddingVertical: vs(10),
    alignItems: "center",
  },
  gridCardLabel: {
    alignItems: "center",
    paddingBottom: vs(10),
  },
  gridCardValueText: {
    fontSize: s(20),
    color: "#E0E0E0", // Light color for skeleton text
    fontWeight: "700",
    backgroundColor: "#E0E0E0", // Background color for skeleton text
    width: "70%",
    height: 24,
    borderRadius: 4,
  },
  gridCardValueLabel: {
    fontSize: s(12),
    color: "#E0E0E0", // Light color for skeleton text
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#E0E0E0", // Background color for skeleton text
    width: "90%",
    height: 14,
    borderRadius: 4,
    marginTop: 4,
  },
  iconBody: {
    backgroundColor: "#E0E0E0",
    padding: ms(10),
    borderRadius: s(6),
  },
});

const GridCardSkeleton = () => {
  return (
    <View style={styles.gridCard}>
      <View style={styles.iconBody}>
        <Ionicons name="image-outline" size={s(30)} color="#C0C0C0" />
      </View>
      <View style={styles.gridCardValue}>
        <View style={styles.gridCardValueText} />
      </View>
      <View style={styles.gridCardLabel}>
        <View style={styles.gridCardValueLabel} />
      </View>
    </View>
  );
};

export default LifeStyleSkeleton;
