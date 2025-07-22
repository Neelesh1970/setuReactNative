import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import Ionicons from "react-native-vector-icons/Ionicons";

// Full staticWorkoutPlan stays the same...
// [same as your current workout data above]

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
    workout_img: require("../../../assets/images/fitness/barbell_curl.png"),
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
    workout_img: require("../../../assets/images/fitness/hammer_curl.png"),
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
    workout_img: require("../../../assets/images/fitness/Concentration_Curl.png"),
  },
  {
  Muscle: "Biceps",
  "Work Out": "Preacher Curl",
  Sets: "3",
  Reps: "10-12",
  Breaks: 1,
  Equipments: "EZ Bar, Preacher Bench",
  Explaination:
    "Sit on a preacher bench and curl the EZ bar upward while keeping your upper arms fixed. Slowly lower under control.",
  workout_img: require("../../../assets/images/fitness/preacher_curl.png"),
},
{
  Muscle: "Biceps",
  "Work Out": "Zottman Curl",
  Sets: "3",
  Reps: "8-10",
  Breaks: 1,
  Equipments: "Dumbbells",
  Explaination:
    "Curl with palms up, rotate to palms down at the top, and lower slowly. Works both biceps and forearms.",
  workout_img: require("../../../assets/images/fitness/zottman_curl.png"),
},
{
  Muscle: "Biceps",
  "Work Out": "Incline Dumbbell Curl",
  Sets: "3",
  Reps: "10-12",
  Breaks: 1,
  Equipments: "Dumbbells, Incline Bench",
  Explaination:
    "Sit on an incline bench with arms hanging down. Curl the dumbbells without swinging.",
  workout_img: require("../../../assets/images/fitness/incline_dumbbell_curl.png"),
},
{
  Muscle: "Biceps",
  "Work Out": "Cable Curl",
  Sets: "4",
  Reps: "12",
  Breaks: 1,
  Equipments: "Cable Machine",
  Explaination:
    "Stand at a cable machine and curl the bar or rope toward your shoulders. Focus on a slow eccentric phase.",
  workout_img: require("../../../assets/images/fitness/cable_curl.png"),
},
{
  Muscle: "Biceps",
  "Work Out": "Spider Curl",
  Sets: "3",
  Reps: "10-12",
  Breaks: 1,
  Equipments: "EZ Bar or Dumbbells",
  Explaination:
    "Lie on an incline bench chest-down and let your arms hang. Curl with strict form to isolate biceps.",
  workout_img: require("../../../assets/images/fitness/spider_curl.png"),
},
{
  Muscle: "Biceps",
  "Work Out": "Resistance Band Curl",
  Sets: "3",
  Reps: "15",
  Breaks: 1,
  Equipments: "Resistance Band",
  Explaination:
    "Stand on a resistance band and curl handles upward. Great for at-home workouts.",
  workout_img: require("../../../assets/images/fitness/resistance_band_curl.png"),
},


  // Tricep WorkOuts
  {
    Muscle: "Triceps",
    "Work Out": "Tricep Dips",
    Sets: "3",
    Reps: "10-15",
    Breaks: 1,
    Equipments: "Parallel Bars / Bench",
    Explaination:
      "Tricep Dips: Place hands on a bench behind you, feet forward. Lower your body by bending elbows, then push back up.",
    workout_img: require("../../../assets/images/fitness/tricep_dips.png"),
  },
  {
    Muscle: "Triceps",
    "Work Out": "Overhead Tricep Extension",
    Sets: "3",
    Reps: "10-12",
    Breaks: 1,
    Equipments: "Dumbbell",
    Explaination:
      "Hold a dumbbell with both hands overhead. Lower behind the head by bending elbows, then extend arms back up.",
    workout_img: require("../../../assets/images/fitness/overhead_extension.png"),
  },
  {
    Muscle: "Triceps",
    "Work Out": "Cable Pushdowns",
    Sets: "4",
    Reps: "12",
    Breaks: 1,
    Equipments: "Cable Machine",
    Explaination:
      "Grip the bar with palms facing down, elbows at your sides. Push down until arms are fully extended, then return slowly.",
    workout_img: require("../../../assets/images/fitness/cable_pushdown.png"),
  },

  // chest workout

  {
    Muscle: "Chest",
    "Work Out": "Barbell Bench Press",
    Sets: "4",
    Reps: "8-10",
    Breaks: 1,
    Equipments: "Barbell, Bench",
    Explaination:
      "Lie flat on a bench holding a barbell with a medium grip. Lower the bar to your chest, then press it back up until arms are straight.",
    workout_img: require("../../../assets/images/fitness/barbell_bench_press.png"),
  },
  {
    Muscle: "Chest",
    "Work Out": "Incline Dumbbell Press",
    Sets: "3-4",
    Reps: "10-12",
    Breaks: 1,
    Equipments: "Dumbbells, Incline Bench",
    Explaination:
      "Sit on an incline bench with dumbbells in hand. Press upward until arms are extended, then lower slowly to shoulder level.",
    workout_img: require("../../../assets/images/fitness/incline_dumbbell_press.png"),
  },
  {
    Muscle: "Chest",
    "Work Out": "Push-Ups",
    Sets: "3",
    Reps: "15-20",
    Breaks: 1,
    Equipments: "Bodyweight",
    Explaination:
      "Start in a plank position with hands under shoulders. Lower your chest to the ground, then push back to starting position.",
    workout_img: require("../../../assets/images/fitness/push_up.png"),
  },
];

export default function WorkoutPlanScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Biceps");

  const filteredWorkouts = staticWorkoutPlan.filter(
    (item) => item.Muscle === selectedTab
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Tab Header */}
      <View style={styles.tabRow}>
        {["Biceps", "Triceps", "Chest"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredWorkouts.map((item, index) => (
          <DropShadow
            key={index}
            style={{
              shadowColor: "#00000030",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("WorkOutDetails", { workout: item })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.workoutName}>{item["Work Out"]}</Text>
                  <View style={styles.row}>
                    <Ionicons name="barbell-outline" size={18} color="#000" />
                    <Text style={styles.rowText}>Muscle: {item.Muscle}</Text>
                  </View>
                </View>
                <Image source={item.workout_img} style={styles.image} />
              </View>
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
    color: "#1C39BB",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rowText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
    fontWeight: "bold",
  },
  explain: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
    // fontStyle: "italic",
  },
  image: {
    height: 80,
    width: 100,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  activeTab: {
    backgroundColor: "#1C39BB",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
});
