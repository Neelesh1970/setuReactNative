import React from "react";
import { View, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const TestListSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.cardBody}>
          {/* Header row with title and icon */}
          <View style={styles.headerRow}>
            <View style={styles.titleSkeleton} />
            <View style={styles.iconSkeleton} />
          </View>

          {/* Appointment No row */}
          <View style={styles.row}>
            <View style={styles.iconSkeletonSmall} />
            <View style={styles.labelSkeleton} />
            <View style={styles.valueSkeleton} />
          </View>

          {/* Remark row */}
          <View style={styles.row}>
            <View style={styles.iconSkeletonSmall} />
            <View style={styles.labelSkeleton} />
            <View style={styles.valueSkeleton} />
          </View>

          {/* Type row */}
          <View style={styles.row}>
            <View style={styles.iconSkeletonSmall} />
            <View style={styles.labelSkeleton} />
            <View style={styles.valueSkeleton} />
          </View>

          {/* Buttons row (only shown for pending status) */}
          <View style={styles.buttonsRow}>
            <View style={styles.buttonSkeleton} />
            <View style={styles.buttonSkeletonCancel} />
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
  headerRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: vs(5),
  },
  titleSkeleton: {
    height: vs(16),
    width: "60%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  iconSkeleton: {
    height: s(18),
    width: s(18),
    backgroundColor: "#E0E0E0",
    borderRadius: s(9),
  },
  row: {
    flexDirection: "row",
    gap: s(5),
    alignItems: "center",
    width: "100%",
    marginBottom: vs(2),
  },
  iconSkeletonSmall: {
    height: s(14),
    width: s(14),
    backgroundColor: "#E0E0E0",
    borderRadius: s(7),
  },
  labelSkeleton: {
    height: vs(12),
    width: "20%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  valueSkeleton: {
    height: vs(12),
    width: "60%",
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  buttonsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap: s(10),
    marginTop: vs(10),
  },
  buttonSkeleton: {
    paddingHorizontal: s(15),
    paddingVertical: vs(3),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    width: s(60),
    height: vs(24),
  },
  buttonSkeletonCancel: {
    paddingHorizontal: s(10),
    paddingVertical: vs(3),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: s(60),
    height: vs(24),
  },
});

export default TestListSkeleton;
