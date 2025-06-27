import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const JobProfileSkeleton = () => {
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
    <Animated.View style={[styles.container, { opacity }]}>
      {/* First Column - Circle */}
      <View style={styles.circle} />

      {/* Second Column - Three Stacked Rectangles */}
      <View style={styles.textContainer}>
        <View style={styles.textLine} />
        <View style={[styles.textLine, { width: scale(70) }]} />
        <View style={[styles.textLine, { width: scale(50) }]} />
      </View>

      {/* Third Column - Square */}
      <View style={styles.square} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(15),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  circle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: "#E0E0E0",
  },
  textContainer: {
    flex: 1,
    marginLeft: scale(10),
  },
  textLine: {
    height: verticalScale(12),
    borderRadius: moderateScale(4),
    backgroundColor: "#E0E0E0",
    marginBottom: verticalScale(6),
    width: "100%",
  },
  square: {
    width: scale(30),
    height: scale(30),
    borderRadius: moderateScale(5),
    backgroundColor: "#E0E0E0",
  },
});

export default JobProfileSkeleton;
