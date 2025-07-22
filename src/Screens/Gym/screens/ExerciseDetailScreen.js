import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ExerciseDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Details</Text>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View> */}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Image */}
        <Image
          source={require("../../../assets/images/fitness/push_up.png")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Exercise Info */}
        <Text style={styles.title}>Push-Up</Text>
        <Text style={styles.subtitle}>Bodyweight | Chest | Strength</Text>

        {/* How to Perform */}
        <Text style={styles.sectionTitle}>How to Perform</Text>
        <Text style={styles.paragraph}>
          1. Start in a plank position with hands under shoulders.
        </Text>
        <Text style={styles.paragraph}>
          2. Lower your body until your chest nearly touches the ground.
        </Text>
        <Text style={styles.paragraph}>
          3. Push back to starting position. Repeat.
        </Text>

        {/* Target Muscles */}
        <Text style={styles.sectionTitle}>Target Muscles</Text>
        <View style={styles.chipContainer}>
          {["Chest", "Triceps", "Shoulders"].map((muscle) => (
            <View key={muscle} style={styles.chip}>
              <Text style={styles.chipText}>{muscle}</Text>
            </View>
          ))}
        </View>

        {/* Suggested Routine */}
        <Text style={styles.sectionTitle}>Suggested Routine</Text>
        <View style={styles.routineRow}>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>3 Sets</Text>
          </View>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>12 Reps</Text>
          </View>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>Rest: 60s</Text>
          </View>
        </View>

        {/* Trainer Tips */}
        <Text style={styles.sectionTitle}>Trainer Tips</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            • Keep your back flat during the movement.{"\n"}• Avoid flaring
            elbows out.
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Add to Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Start Timer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical:16
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    padding:10
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: "#EEE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  routineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  routineBox: {
    backgroundColor: "#FFE0B2",
    padding: 12,
    borderRadius: 8,
  },
  routineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E65100",
  },
  tipBox: {
    backgroundColor: "#FFF8DC",
    padding: 12,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  primaryButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  outlineButton: {
    borderColor: "#FF5722",
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  outlineButtonText: {
    color: "#FF5722",
    fontSize: 14,
    fontWeight: "600",
  },
});
