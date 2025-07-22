// screens/BrowseExercisesScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getExercisesByMuscle } from "../api/apiService";
import DropShadow from "react-native-drop-shadow";

export default function BrowseExercisesScreen() {
  const [muscle, setMuscle] = useState("");
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    try {
      const result = await getExercisesByMuscle(muscle.toLowerCase());
      setData(result);
    } catch {
      setData([]);
    }
  };

  const renderItem = ({ item }) => (
    <DropShadow
      style={{
         shadowColor: "#00000030",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
    >
      <View style={styles.card}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="barbell-outline" size={18} color="#1C39BB" />
          <Text style={styles.detailText}>Type: {item.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="speedometer-outline" size={18} color="#1C39BB" />
          <Text style={styles.detailText}>Difficulty: {item.difficulty}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="construct-outline" size={18} color="#1C39BB" />
          <Text style={styles.detailText}>Equipment: {item.equipment}</Text>
        </View>
      </View>
    </DropShadow>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search Exercises by Muscle</Text>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="e.g. biceps"
          style={styles.input}
          value={muscle}
          onChangeText={setMuscle}
        />
        <TouchableOpacity onPress={handleFetch} style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C39BB",
    marginBottom: 10,
    marginTop: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 15,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#1C39BB",
    padding: 10,
    borderRadius: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    marginTop: 8,
    marginHorizontal:8,
    justifyContent: "center",
    // elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
});
