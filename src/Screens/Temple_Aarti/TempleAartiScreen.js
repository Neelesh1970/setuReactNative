import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Icons } from "../../assets/icons/Icons";
import DropShadow from "react-native-drop-shadow";

const { width } = Dimensions.get("window");

const recordedAartis = [
  {
    id: "1",
    title: "Ganesh Aarti",
    description: "Start your day with divine blessings.",
    thumbnail: require("../../assets/images/temple_aarti/Ganesh.png"),
  },
  {
    id: "2",
    title: "Evening Aarti",
    description: "Peaceful aarti to end the day.",
    // thumbnail: require('../assets/lord2.png'),
  },
  {
    id: "3",
    title: "Shiv Aarti",
    description: "Offer prayers to Lord Shiva.",
    // thumbnail: require('../assets/lord_shiva.png'),
  },
];

export default function TempleAartiScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const filteredAartis = recordedAartis.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <DropShadow
      style={{
        shadowColor: "#00000030",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RecordedAartiPlayer", { aarti: item })
        }
        activeOpacity={0.9}
        style={styles.shadowContainer}
      >
        <View style={styles.cardInnerRow}>
          <View style={styles.textContent}>
            <Text style={styles.aartiTitle}>{item.title}</Text>
            <Text style={styles.aartiDescription}>{item.description}</Text>
          </View>
          <Image
            source={item.thumbnail}
            style={styles.rightImage}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </DropShadow>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1C39BB", "#3542d5"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={Icons.back_icon} // Replace with your own back icon path
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>🛕 Temple Aarti</Text>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <DropShadow
          style={{
            shadowColor: "#00000030",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <TextInput
            placeholder="Search Aarti..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </DropShadow>
      </View>

      <FlatList
        data={filteredAartis}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.liveButton}
        // onPress={() => navigation.navigate('LiveAartiScreen')}
        activeOpacity={0.8}
      >
        <Text style={styles.liveText}>🔴 Live Aarti</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
    left: "10%",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#f2f2f2",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
    shadowColor: "#000",
    // elevation: 5,
  },
  list: {
    padding: 12,
    paddingBottom: 100,
  },
  shadowContainer: {
    marginBottom: 14,
    marginHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      android: {
        // elevation: 5,
      },
    }),
  },
  cardInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
    paddingRight: 10,
  },
  aartiTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 4,
  },
  aartiDescription: {
    fontSize: 13,
    color: "#555",
  },
  rightImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  liveButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1C39BB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#e53935",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  liveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },

  backButton: {
    marginRight: 10,
    padding: 4,
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff", // or any suitable color
  },
});