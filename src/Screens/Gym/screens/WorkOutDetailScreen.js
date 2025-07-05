// screens/WorkoutDetailScreen.js
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import DropShadow from "react-native-drop-shadow";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function WorkoutDetailScreen({ route }) {
  const { workout } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{workout["Work Out"]}</Text>

          <View style={styles.row}>
            <Ionicons name="barbell-outline" size={20} color="#1C39BB" />
            <Text style={styles.text}>Muscle: {workout.Muscle}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="repeat-outline" size={20} color="#1C39BB" />
            <Text style={styles.text}>Sets: {workout.Sets}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="fitness-outline" size={20} color="#1C39BB" />
            <Text style={styles.text}>Reps: {workout.Reps}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="timer-outline" size={20} color="#1C39BB" />
            <Text style={styles.text}>Breaks: {workout.Breaks} min</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="construct-outline" size={20} color="#1C39BB" />
            <Text style={styles.text}>Equipment: {workout.Equipments}</Text>
          </View>

          <Text style={styles.explain}>{workout.Explaination}</Text>
        </View>
      </DropShadow>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    // elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C39BB",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  explain: {
    marginTop: 20,
    fontSize: 15,
    color: "#666",
    fontStyle: "italic",
  },
});
