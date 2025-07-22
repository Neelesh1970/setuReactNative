import React, { useEffect, useRef, version } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ReportScreenSkeleton = () => {
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
      {/* Skeleton Grid Icons */}
      <View style={styles.cardBody}>
        {[...Array(8)].map((_, index) => (
          <Animated.View key={index} style={[styles.card, { opacity }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: verticalScale(10),
    // paddingHorizontal: scale(10),
    width: "100%",
  },

  cardBody: {
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(10),
    gap: verticalScale(20),
  },
  card: {
    height: verticalScale(80),
    backgroundColor: "#e1e1e1",
    borderRadius: moderateScale(5),
    width: "100%",
  },
});

export default ReportScreenSkeleton;
