import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { s, vs, ms } from "react-native-size-matters";

const HistoryLogSkeleton = ({ count = 4 }) => {
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
    <View style={{ padding: ms(20) }}>
      {[...Array(count)].map((_, index) => (
        <Animated.View key={index} style={[styles.card, { opacity }]}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Animated.View style={[styles.titlePlaceholder, { opacity }]} />
            <View style={styles.pointsWrap}>
              <Animated.View style={[styles.pointsPlaceholder, { opacity }]} />
              <Animated.View style={[styles.iconPlaceholder, { opacity }]} />
            </View>
          </View>

          {/* Time Row */}
          <View style={styles.infoRow}>
            <Animated.View style={[styles.iconSmall, { opacity }]} />
            <Animated.View style={[styles.textLine, { opacity }]} />
          </View>

          {/* Date Row */}
          <View style={styles.infoRow}>
            <Animated.View style={[styles.iconSmall, { opacity }]} />
            <Animated.View style={[styles.textLine, { opacity }]} />
          </View>

          {/* Sent To Section */}
          <Animated.View style={[styles.sentToText, { opacity }]} />
          <View style={styles.sentToContainer}>
            <Animated.View style={[styles.chip, { opacity }]} />
            <Animated.View style={[styles.chip, { opacity }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    padding: ms(12),
    backgroundColor: "#FFFFFF",
    marginBottom: vs(15),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(8),
  },
  titlePlaceholder: {
    width: s(120),
    height: vs(16),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  pointsWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: s(10),
  },
  pointsPlaceholder: {
    width: s(40),
    height: vs(12),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  iconPlaceholder: {
    width: s(26),
    height: s(26),
    backgroundColor: "#E0E0E0",
    borderRadius: s(13),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    marginVertical: vs(2),
  },
  iconSmall: {
    width: s(16),
    height: s(16),
    backgroundColor: "#E0E0E0",
    borderRadius: s(8),
  },
  textLine: {
    width: s(80),
    height: vs(12),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
  },
  sentToText: {
    width: s(60),
    height: vs(14),
    backgroundColor: "#E0E0E0",
    borderRadius: s(4),
    marginTop: vs(10),
  },
  sentToContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: s(8),
    marginTop: vs(6),
  },
  chip: {
    width: s(60),
    height: vs(24),
    backgroundColor: "#E0E0E0",
    borderRadius: s(20),
  },
});

export default HistoryLogSkeleton;
