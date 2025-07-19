import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const MedicationCardSkeleton = () => {
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
    <Animated.View style={[styles.cardBody, { opacity }]}>
      <View style={styles.cardCol}>
        <Animated.View style={[styles.skeletonText, { width: "70%" }]} />
        <Animated.View
          style={[styles.skeletonText, { width: "50%", marginTop: vs(5) }]}
        />
      </View>
      <Animated.View style={[styles.skeletonText, { width: "15%" }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    width: "100%",
    overflow: "hidden",
    alignItems: "flex-start",
    padding: ms(12),
    marginBottom: vs(10),
    flexDirection: "row",
    gap: s(10),
  },
  cardCol: {
    flex: 1,
  },
  skeletonText: {
    height: vs(16),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
});

export default MedicationCardSkeleton;
