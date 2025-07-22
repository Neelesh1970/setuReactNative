import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../assets/colors/Colors";

const { width } = Dimensions.get("window");

const ProfileDetailScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Nav */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Menu")}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <Image
          source={require("../../assets/images/matrimony/profile.png")} // Replace with your image
          style={styles.profileImage}
          resizeMode="cover"
        />

        {/* Basic Info */}
        <Text style={styles.nameText}>Priya Sharma, 28</Text>
        <Text style={styles.metaText}>
          5'6'' | Hindu | Mumbai | Software Engineer
        </Text>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {["About", "Family", "Preferences", "Horoscope"].map((tab, idx) => (
            <TouchableOpacity key={idx} onPress={() => alert(tab)}>
              <Text style={[styles.tabText, idx === 0 && styles.tabActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bio */}
        <Text style={styles.bioText}>
          I am a software engineer with a passion for technology and innovation.
          I enjoy exploring new ideas and solving complex problems. In my free
          time, I love to read, travel, and spend time with my family and
          friends.
        </Text>
      </ScrollView>

      {/* CTA Buttons (Sticky above BottomNav) */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.expressBtn}
          onPress={() => alert("Expressed Interest")}
        >
          <Text style={styles.expressText}>Express Interest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => alert("Chat Now")}
        >
          <Text style={styles.chatText}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 120, // prevent CTA buttons from being overlapped
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 12,
    backgroundColor: color.bottomViewColor,
    padding: 16,
  },
  profileImage: {
    width: width,
    height: 350,
    // marginTop: 8,
    // padding:10,
    // margin:10
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  metaText: {
    textAlign: "center",
    color: "#6e7e91",
    marginVertical: 4,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 14,
    color: "#6e7e91",
  },
  tabActive: {
    color: "#000",
    fontWeight: "600",
    borderBottomWidth: 2,
    borderColor: "#000",
    paddingBottom: 6,
  },
  bioText: {
    fontSize: 15,
    color: "#111",
    lineHeight: 22,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  expressBtn: {
    backgroundColor: "#0a74f9",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  expressText: {
    color: "#fff",
    fontWeight: "600",
  },
  chatBtn: {
    backgroundColor: "#f1f3f6",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  chatText: {
    fontWeight: "600",
    color: "#111",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    paddingBottom: 16,
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
