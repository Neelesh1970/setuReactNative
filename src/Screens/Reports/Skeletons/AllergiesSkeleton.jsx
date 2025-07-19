import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";

const AllergiesSkeleton = () => {
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
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Animated.View key={index} style={[styles.cardBody, { opacity }]}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.allergyDetails}>
              <View style={styles.allergyRow}>
                <Animated.View style={[styles.labelPlaceholder, { opacity }]} />
                <Animated.View style={[styles.valuePlaceholder, { opacity }]} />
              </View>
              <View style={styles.allergyRow}>
                <Animated.View style={[styles.labelPlaceholder, { opacity }]} />
                <Animated.View style={[styles.valuePlaceholder, { opacity }]} />
              </View>
              <View style={styles.allergyRow}>
                <Animated.View style={[styles.labelPlaceholder, { opacity }]} />
                <Animated.View style={[styles.valuePlaceholder, { opacity }]} />
              </View>
              <View style={styles.allergyRow}>
                <Animated.View style={[styles.labelPlaceholder, { opacity }]} />
                <Animated.View style={[styles.valuePlaceholder, { opacity }]} />
              </View>
            </View>
            <View style={styles.editCol}>
              <Animated.View
                style={[styles.editIconPlaceholder, { opacity }]}
              />
            </View>
          </Animated.View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: moderateScale(8),
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: moderateScale(8),
    marginBottom: verticalScale(8),
    flexDirection: "row",
    gap: moderateScale(8),
    height: verticalScale(90),
    alignItems: "center",
  },
  imagePlaceholder: {
    backgroundColor: "#E0E0E0",
    width: moderateScale(60),
    height: verticalScale(68),
    borderRadius: moderateScale(4),
  },
  allergyDetails: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: verticalScale(4),
  },
  allergyRow: {
    flexDirection: "row",
    gap: moderateScale(4),
    alignItems: "center",
    height: verticalScale(12),
  },
  labelPlaceholder: {
    backgroundColor: "#E0E0E0",
    width: moderateScale(50),
    height: verticalScale(12),
    borderRadius: moderateScale(2),
  },
  valuePlaceholder: {
    backgroundColor: "#E0E0E0",
    width: moderateScale(80),
    height: verticalScale(12),
    borderRadius: moderateScale(2),
  },
  editCol: {
    justifyContent: "center",
    height: "100%",
  },
  editIconPlaceholder: {
    backgroundColor: "#E0E0E0",
    width: moderateScale(20),
    height: verticalScale(20),
    borderRadius: moderateScale(10),
  },
});

export default AllergiesSkeleton;
