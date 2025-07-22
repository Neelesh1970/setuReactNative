import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const DoctorCardSkeleton = () => {
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
    <Animated.View style={[styles.skeletonCard, { opacity }]}>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonTextContainer}>
          <View style={styles.skeletonText} />
          <View style={styles.skeletonTextSmall} />
          <View style={styles.skeletonTextSmall} />
        </View>
      </View>
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonBox} />
          <View style={styles.skeletonPrice} />
        </View>
        <View style={[styles.skeletonRow, { marginTop: verticalScale(10) }]}>
          <View style={styles.skeletonBox} />
          <View style={styles.skeletonButton} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(20),
    backgroundColor: "#fff",
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonImage: {
    height: scale(70),
    width: scale(70),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(8),
  },
  skeletonTextContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  skeletonText: {
    height: verticalScale(16),
    width: "60%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
  skeletonTextSmall: {
    height: verticalScale(12),
    width: "50%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    marginTop: verticalScale(6),
  },
  skeletonContent: {
    marginTop: verticalScale(10),
  },
  skeletonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skeletonBox: {
    height: verticalScale(20),
    width: "40%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
  skeletonPrice: {
    height: verticalScale(20),
    width: "20%",
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
  skeletonButton: {
    height: verticalScale(35),
    width: scale(120),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(6),
  },
});

export default DoctorCardSkeleton;
