import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";

const TransactionLogSkeleton = () => {
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
      {/* Transaction List Skeleton */}
      {[...Array(5)].map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.transactionCard, { opacity }]}
        >
          <View style={styles.transactionLeft}>
            <Animated.View style={[styles.iconPlaceholder, { opacity }]} />
            <View style={styles.textContainer}>
              <Animated.View style={[styles.titleLine, { opacity }]} />
              <Animated.View style={[styles.subtitleLine, { opacity }]} />
            </View>
          </View>
          <Animated.View style={[styles.amountLine, { opacity }]} />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
  },

  tabItem: {
    width: scale(120),
    height: verticalScale(30),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(8),
  },
  transactionCard: {
    height: verticalScale(60),
    backgroundColor: "#F5F5F5",
    borderRadius: moderateScale(8),
    borderColor: "#BABABA",
    borderWidth: 1,
    marginBottom: verticalScale(15),
    padding: moderateScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: scale(25),
    height: scale(25),
    borderRadius: moderateScale(15),
    backgroundColor: "#E0E0E0",
    marginRight: moderateScale(15),
  },
  textContainer: {
    justifyContent: "center",
  },
  titleLine: {
    width: scale(150),
    height: verticalScale(14),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
  },
  subtitleLine: {
    width: scale(100),
    height: verticalScale(10),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
  amountLine: {
    width: scale(50),
    height: verticalScale(16),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
  },
});

export default TransactionLogSkeleton;
