import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const JobCardSkeleton = () => {
  const [opacity] = useState(new Animated.Value(0.4));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.jobCard, { opacity }]}>
      {/* Header */}
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonTextContainer}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonCompany} />
        </View>
      </View>

      {/* Salary Chip */}
      <View style={styles.skeletonSalaryContainer}>
        <View style={styles.skeletonSalaryChip} />
      </View>

      {/* Tags */}
      <View style={styles.skeletonTags}>
        <View style={styles.skeletonChip} />
        <View style={styles.skeletonChip} />
      </View>

      {/* View Details Button */}
      <View style={styles.skeletonViewButton} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    padding: moderateScale(20),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    shadowColor: "transparent",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#BABABA",
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  skeletonTextContainer: {
    marginLeft: scale(10),
    flex: 1,
  },
  skeletonTitle: {
    height: verticalScale(20),
    width: "60%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
  skeletonCompany: {
    height: verticalScale(15),
    width: "40%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    marginTop: verticalScale(10),
  },
  skeletonSalaryContainer: {
    marginBottom: verticalScale(8),
  },
  skeletonSalaryChip: {
    height: verticalScale(25),
    width: scale(120),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(12),
  },
  skeletonTags: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
  },
  skeletonChip: {
    height: verticalScale(30),
    width: scale(80),
    marginRight: scale(8),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(25),
  },
  skeletonViewButton: {
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "#E0E0E0",
    marginTop: verticalScale(10),
  },
});

export default JobCardSkeleton;
