import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const SkeletonIconGrid = () => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    breathingAnimation.start();

    return () => breathingAnimation.stop();
  }, [opacity]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Animated.View style={[styles.skeletonTitle, { opacity }]} />
        <Animated.View style={[styles.skeletonViewMore, { opacity }]} />
      </View>

      {/* Skeleton Grid Icons */}
      <View style={styles.grid}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.iconContainer}>
            <Animated.View
              style={[styles.skeletonIconImageBody, { opacity }]}
            />
            <Animated.View style={[styles.skeletonIconLabel, { opacity }]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(2),
    minWidth: scale(80),
  },
  skeletonTitle: {
    height: verticalScale(20),
    backgroundColor: "#e1e1e1",
    borderRadius: moderateScale(5),
    width: scale(140),
  },
  skeletonViewMore: {
    height: verticalScale(20),
    backgroundColor: "#e1e1e1",
    borderRadius: moderateScale(5),
    width: scale(80),
  },
  skeletonIconImageBody: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: "#e1e1e1",
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(5),
  },
  skeletonIconLabel: {
    height: verticalScale(10),
    backgroundColor: "#e1e1e1",
    borderRadius: moderateScale(5),
    marginTop: verticalScale(5),
    width: scale(60),
  },
});

export default SkeletonIconGrid;
