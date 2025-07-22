// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { color } from "../../assets/colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const matches = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 28,
    religion: "Hindu",
    location: "Mumbai",
    avatar: require("../../assets/images/matrimony/1home.png"),
  },
  {
    id: "2",
    name: "Ayesha Khan",
    age: 32,
    religion: "Muslim",
    location: "Delhi",
    avatar: require("../../assets/images/matrimony/2home.png"),
  },
  {
    id: "3",
    name: "Jaspreet Kaur",
    age: 30,
    religion: "Sikh",
    location: "Bangalore",
    avatar: require("../../assets/images/matrimony/3home.png"),
  },
];

const MatriHomeScreen = () => {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row', backgroundColor: color.bottomViewColor, padding: 10}}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={{ marginLeft: 10, marginTop: 10 }}
          onPress={() => navigation.navigate("DashboardScreen")}
        />

        <Text style={styles.header}>Matches</Text>
      </View>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DropShadow
            style={{
              shadowColor: "#00000030",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Lives in {item.location}</Text>
              <Text style={styles.subinfo}>
                {item.age}, {item.religion}, {item.location}
              </Text>
              <TouchableOpacity style={styles.likeBtn}>
                <Text style={styles.likeText}>♡ Like</Text>
              </TouchableOpacity>
            </View>
          </DropShadow>
        )}
      />
    </SafeAreaView>
  );
};

export default MatriHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: color.bottomViewColor,
    padding: 10,
    color: "#fff",
    marginStart:70
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  avatar: { width: "100%", height: 200, borderRadius: 12 },
  name: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  info: { fontSize: 14, color: "#444" },
  subinfo: { fontSize: 12, color: "#777", marginBottom: 10 },
  likeBtn: {
    backgroundColor: "#c9dafc",
    borderRadius: 24,
    padding: 10,
    alignItems: "center",
  },
  likeText: { color: "#111", fontWeight: "600" },
});
