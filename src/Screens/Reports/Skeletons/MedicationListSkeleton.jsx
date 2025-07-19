import React from "react";
import { View, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const MedicationListSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.cardBody}>
          <View style={styles.titleSkeleton} />
          <View style={styles.rowSkeleton} />
          <View style={styles.rowSkeleton} />

          <View style={styles.dosageTable}>
            <View style={styles.dosageColumn}>
              <View style={styles.dosageHeaderSkeleton} />
              <View style={styles.iconSkeleton} />
            </View>
            <View style={styles.dosageColumn}>
              <View style={styles.dosageHeaderSkeleton} />
              <View style={styles.iconSkeleton} />
            </View>
            <View style={[styles.dosageColumn, styles.lastColumn]}>
              <View style={styles.dosageHeaderSkeleton} />
              <View style={styles.iconSkeleton} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  cardBody: {
    borderWidth: s(1),
    borderColor: "#E0E0E0",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    width: "100%",
    overflow: "hidden",
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    marginBottom: vs(10),
    gap: s(5),
    alignItems: "flex-start",
  },
  titleSkeleton: {
    height: vs(16),
    width: "70%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    marginBottom: vs(2),
  },
  rowSkeleton: {
    height: vs(12),
    width: "90%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    marginLeft: s(23),
  },
  dosageTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: vs(5),
    borderWidth: s(1),
    borderColor: "#E0E0E0",
    borderRadius: s(6),
    overflow: "hidden",
  },
  dosageColumn: {
    alignItems: "center",
    flex: 1,
    paddingVertical: vs(5),
    borderRightWidth: s(1),
    borderRightColor: "#E0E0E0",
  },
  lastColumn: {
    borderRightWidth: 0,
  },
  dosageHeaderSkeleton: {
    height: vs(16),
    width: "80%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    marginBottom: vs(10),
  },
  iconSkeleton: {
    height: s(24),
    width: s(24),
    backgroundColor: "#E0E0E0",
    borderRadius: s(12),
  },
});

export default MedicationListSkeleton;
