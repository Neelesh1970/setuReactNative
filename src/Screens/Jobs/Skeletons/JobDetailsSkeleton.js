import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const SkeletonLine = ({ style }) => {
  return <Animated.View style={[styles.skeletonLine, style]} />;
};

const JobDetailsSkeleton = () => {
  const animation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.jobTitleContainer}>
        <SkeletonLine style={{ width: "70%", height: verticalScale(20) }} />
        <SkeletonLine
          style={{
            width: "50%",
            height: verticalScale(15),
            marginTop: verticalScale(5),
          }}
        />
      </View>

      <View style={styles.separator} />

      {/* Contact Section Skeleton */}
      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index} style={styles.contactRow}>
          <SkeletonLine
            style={{
              width: scale(20),
              height: scale(20),
              borderRadius: scale(10),
            }}
          />
          <SkeletonLine
            style={{
              width: "60%",
              height: verticalScale(16),
              marginLeft: scale(10),
            }}
          />
          <SkeletonLine
            style={{
              width: "30%",
              height: verticalScale(16),
              marginLeft: scale(10),
            }}
          />
        </View>
      ))}

      <View style={styles.separator} />

      {/* Job Details Section Skeleton */}
      <View style={styles.jobDetailsContainer}>
        <SkeletonLine style={{ width: "60%", height: verticalScale(20) }} />
        <SkeletonLine
          style={{
            width: "80%",
            height: verticalScale(16),
            marginTop: verticalScale(5),
          }}
        />
      </View>

      <View style={styles.separator} />

      {/* Job Description Section Skeleton */}
      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index} style={styles.jobDetailsContainer}>
          <SkeletonLine style={{ width: "60%", height: verticalScale(20) }} />
          <SkeletonLine
            style={{
              width: "100%",
              height: verticalScale(15),
              marginTop: verticalScale(10),
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  jobTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(20),
  },
  separator: {
    height: verticalScale(1.5),
    backgroundColor: "#979797A1",
    marginVertical: verticalScale(10),
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(5),
  },
  jobDetailsContainer: {
    padding: moderateScale(20),
  },
  skeletonLine: {
    backgroundColor: "#E0E0E0",
    marginVertical: verticalScale(5),
    borderRadius: scale(4),
  },
});

export default JobDetailsSkeleton;
