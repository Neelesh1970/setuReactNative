import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../assets/colors/Colors";
import DropShadow from "react-native-drop-shadow";

const { width } = Dimensions.get("window");

const chatData = [
  {
    id: "1",
    name: "Sophia Carter",
    message: "Hey! How's your day going?",
    time: "10m",
    avatar: require("../../assets/images/matrimony/avtar1.png"),
  },
  {
    id: "2",
    name: "Ethan Walker",
    message: "I'm at the park, come join!",
    time: "30m",
    avatar: require("../../assets/images/matrimony/avtar2.png"),
  },
  {
    id: "3",
    name: "Olivia Bennett",
    message: "Just finished a great book!",
    time: "1h",
    avatar: require("../../assets/images/matrimony/avtar1.png"),
  },
  {
    id: "4",
    name: "Noah Thompson",
    message: "Let's grab coffee tomorrow?",
    time: "2h",
    avatar: require("../../assets/images/matrimony/avtar4.png"),
  },
  {
    id: "5",
    name: "Ava Harris",
    message: "I love hiking, what about you?",
    time: "3h",
    avatar: require("../../assets/images/matrimony/avtar5.png"),
  },
  {
    id: "6",
    name: "Liam Cooper",
    message: "That new restaurant is amazing!",
    time: "4h",
    avatar: require("../../assets/images/matrimony/avtar6.png"),
  },
];

const ChatsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.chatText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => alert("New Chat")}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </DropShadow>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    // marginTop: 12,
    // marginBottom: 12,
    backgroundColor: color.bottomViewColor,
    padding: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  searchContainer: {
    marginHorizontal: 20,
    backgroundColor: "#f1f3f6",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
    color: "#000",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  chatText: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "#6e7e91",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#6e7e91",
    marginLeft: 6,
  },
  floatingBtn: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: "#0a74f9",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
