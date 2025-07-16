import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";

const ProfileRowSkeleton = () => {
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

  return <Animated.View style={[styles.cardBox, { opacity }]} />;
};

const styles = StyleSheet.create({
  cardBox: {
    height: verticalScale(45),

    borderRadius: moderateScale(8),
    backgroundColor: "#E0E0E0",

    borderWidth: 1,
    borderColor: "#BABABA",
    flex: 1,
    marginVertical: verticalScale(15),
  },
});

export default ProfileRowSkeleton;
