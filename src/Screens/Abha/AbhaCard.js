import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";
import { Icons } from "../../assets/icons/Icons";

const AbhaCard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.createAbha}>
        <Text style={styles.createAbhaTitle}>
          Your ABHA card has been successfully created
        </Text>
        <Image
          source={Icons.aadhar_image}
          resizeMode="contain"
          style={styles.aabhaImg}
        />
      </View>

      <View style={styles.createButtonBody}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("DashboardScreen")}
        >
          <Text style={styles.createButton_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AbhaCard;

const styles = StyleSheet.create({
  createAbha: {
    padding: ms(20),
  },
  createAbhaTitle: {
    fontSize: s(12),
    fontWeight: "bold",
    color: "green",
    width: "100%",
    textAlign: "center",
    marginTop: vs(20),
  },

  aabhaImg: {
    marginTop: vs(20),
    width: "auto",
    height: vs(200),
  },

  createButtonBody: {
    position: "absolute",
    bottom: vs(10),
    paddingHorizontal: ms(20),
    paddingVertical: ms(20),
    width: "100%",
  },
  createButton: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(10),
    borderRadius: ms(8),
    backgroundColor: "#1C57A5",
  },
  createButton_text: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "bold",
  },
});
