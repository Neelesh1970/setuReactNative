import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IonIcons } from "expo/vector-icons";
// import styles from "../Splash/firstScreen/styles";
import { check } from "../../assets/images/check_circle.png";

const PickupSlotHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        {/* <Ionicons name="arror-back" size={24} color="white"/> */}
        <Image
          style={styles.imgheight}
          source={require("../../../assets/images/left-arrow.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sample Pickup Slot Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1976D2",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    paddingEnd: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  imgheight: {
    width: 20,
    height: 20,
    padding: 12,
    alignItems: "center",
  },
});

export default PickupSlotHeader;
