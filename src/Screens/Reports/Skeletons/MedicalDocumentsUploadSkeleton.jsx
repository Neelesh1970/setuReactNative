import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const MedicalDocumentsUploadSkeleton = () => {
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
      {[...Array(5)].map((_, index) => (
        <Animated.View key={index} style={[styles.documentCard, { opacity }]}>
          <View style={styles.documentHeader}>
            <Animated.View style={[styles.skeletonText, { width: "70%" }]} />
            <View style={styles.iconRow}>
              <Animated.View style={[styles.skeletonIcon]} />
              <Animated.View style={[styles.skeletonIcon]} />
            </View>
          </View>
          <View style={styles.documentDetails}>
            <Animated.View style={[styles.skeletonText, { width: "50%" }]} />
            <Animated.View
              style={[styles.skeletonText, { width: "40%", marginTop: vs(8) }]}
            />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  documentCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: vs(10),
  },
  documentHeader: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    padding: ms(10),
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    gap: s(10),
    alignItems: "center",
  },
  documentDetails: {
    padding: ms(10),
  },
  skeletonText: {
    height: vs(16),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  skeletonIcon: {
    width: s(24),
    height: s(24),
    backgroundColor: "#E0E0E0",
    borderRadius: s(12),
  },
  iconRow: {
    flexDirection: "row",
    gap: s(10),
  },
});

export default MedicalDocumentsUploadSkeleton;
