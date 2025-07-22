import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";

const SosPlanSkeleton = () => {
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
    <View style={styles.container}>
      {/* Plan Cards Skeleton */}
      <View style={styles.cardsContainer}>
        {[1, 2, 3].map((item) => (
          <Animated.View key={item} style={[styles.card, { opacity }]}>
            <View style={styles.cardLeft}>
              <Animated.View style={[styles.titleLine, { opacity }]} />
              <Animated.View style={[styles.detailLine, { opacity }]} />
              <Animated.View style={[styles.detailLine, { opacity }]} />
            </View>
            <Animated.View style={[styles.cardRight, { opacity }]} />
          </Animated.View>
        ))}
      </View>

      {/* Button Skeleton */}
      <Animated.View style={[styles.button, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: "#fefefe",
  },

  cardsContainer: {
    flex: 1,
    gap: verticalScale(10),
  },
  card: {
    flexDirection: "row",
    height: verticalScale(100),
    borderRadius: moderateScale(4),
    overflow: "hidden",
  },
  cardLeft: {
    flex: 1,
    padding: moderateScale(15),
    backgroundColor: "#F0F0F0",
    justifyContent: "space-between",
  },
  cardRight: {
    width: "25%",
    backgroundColor: "#F0F0F0",
  },
  titleLine: {
    height: verticalScale(16),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    width: "60%",
  },
  detailLine: {
    height: verticalScale(12),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    width: "80%",
    marginTop: verticalScale(8),
  },
  button: {
    height: verticalScale(40),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(8),
  },
});

export default SosPlanSkeleton;
