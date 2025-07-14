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

export default function WorkoutDetailScreen({ route }) {
  const { workout } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image */}
        <Image
          source={workout.workout_img}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Title + Subtitle */}
        <Text style={styles.title}>{workout["Work Out"]}</Text>
        <Text style={styles.subtitle}>{`${workout.Equipments} | ${workout.Muscle}`}</Text>

        {/* How to Perform */}
        <Text style={styles.sectionTitle}>How to Perform</Text>
        <Text style={styles.paragraph}>{workout.Explaination}</Text>

        {/* Target Muscles */}
        <Text style={styles.sectionTitle}>Target Muscles</Text>
        <View style={styles.chipContainer}>
          {workout.Muscle.split(/[,\s]+/).map((muscle) => (
            <View key={muscle} style={styles.chip}>
              <Text style={styles.chipText}>{muscle}</Text>
            </View>
          ))}
        </View>

        {/* Suggested Routine */}
        <Text style={styles.sectionTitle}>Suggested Routine</Text>
        <View style={styles.routineRow}>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>{workout.Sets} Sets</Text>
          </View>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>{workout.Reps} Reps</Text>
          </View>
          <View style={styles.routineBox}>
            <Text style={styles.routineText}>Rest: {workout.Breaks} min</Text>
          </View>
        </View>

        {/* Trainer Tips (Optional placeholder) */}
        <Text style={styles.sectionTitle}>Trainer Tips</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            • Maintain form throughout the lift.{"\n"}• Avoid swinging the barbell.
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

// screens/WorkoutDetailScreen.styles.js

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
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

