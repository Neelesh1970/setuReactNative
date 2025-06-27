import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { color } from "../assets/colors/Colors";
import { Icons } from "../assets/icons/Icons";
import { ms } from "react-native-size-matters";

export default function PrescriptionCard({ title }) {
  return (
    <View
      style={{
        borderRadius: 10,
        borderColor: color.grey,
        borderWidth: 1,
        padding: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={Icons.doc_icon}
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
        <View
          style={{
            borderRadius: 100,
            borderWidth: 1.4,
            borderColor: color.grey,
            backgroundColor: color.colorPrimary,
            width: ms(18),
            height: ms(18),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={Icons.tickMark}
            style={{ width: 10, height: 6, tintColor: color.white }}
          />
        </View>
      </View>

      <Text>I will attach a {"\n"}prescription</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
