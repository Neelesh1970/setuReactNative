// screens/WorkoutPlanScreen.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DropShadow from "react-native-drop-shadow";
import Ionicons from "react-native-vector-icons/Ionicons";

const staticWorkoutPlan = [
  {
    Muscle: "Biceps",
    "Work Out": "Barbell Curl",
    Sets: "3-4",
    Reps: "8-12",
    Breaks: 1,
    Equipments: "Barbell",
    Explaination:
      "Barbell Curl: Stand with feet shoulder-width apart, hold a barbell with an underhand grip and curl it towards your shoulders.",
  },
  {
    Muscle: "Biceps",
    "Work Out": "Hammer Curl",
    Sets: "3-4",
    Reps: "10-12",
    Breaks: 1,
    Equipments: "Dumbbells",
    Explaination:
      "Hammer Curl: Perform dumbbell curls with palms facing each other, targeting the brachialis muscle.",
  },
  {
    Muscle: "Biceps",
    "Work Out": "Concentration Curl",
    Sets: "3",
    Reps: "12-15",
    Breaks: 1,
    Equipments: "Dumbbell",
    Explaination:
      "Concentration Curl: Sit with a dumbbell in one hand, elbow on the thigh, and curl the weight focusing on the bicep.",
  },
];

export default function WorkoutPlanScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>💪 Workout Plan</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {staticWorkoutPlan.map((item, index) => (
          <DropShadow
            style={{
              shadowColor: "#00000030",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={ () =>
                navigation.navigate("WorkOutDetails", { workout: item })
              }
            >
              <Text style={styles.workoutName}>{item["Work Out"]}</Text>

              <View style={styles.row}>
                <Ionicons name="barbell-outline" size={18} color="#1C39BB" />
                <Text style={styles.rowText}>Muscle: {item.Muscle}</Text>
              </View>

              {/* <View style={styles.row}>
                <Ionicons name="repeat-outline" size={18} color="#1C39BB" />
                <Text style={styles.rowText}>
                  Sets: {item.Sets} | Reps: {item.Reps}
                </Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="timer-outline" size={18} color="#1C39BB" />
                <Text style={styles.rowText}>Rest: {item.Breaks} min</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="construct-outline" size={18} color="#1C39BB" />
                <Text style={styles.rowText}>Equipment: {item.Equipments}</Text>
              </View> */}

              <Text style={styles.explain}>{item.Explaination}</Text>
            </TouchableOpacity>
          </DropShadow>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C39BB",
    textAlign: "center",
    marginBottom: 20,
  },
  scroll: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 8,
    marginTop: 8,
    //     // elevation: 4,
    //     shadowColor: '#000',
    //     shadowOpacity: 0.08,
    //     shadowOffset: { width: 0, height: 2 },
    //     // shadowRadius: 6,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rowText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
  },
  explain: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
    // fontStyle: "italic",
  },
});
