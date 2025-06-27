import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import DropShadow from "react-native-drop-shadow";
import { color } from "../assets/colors/Colors";
import { ms, vs } from "react-native-size-matters";
export default function HomeButton({ label, iconImg, onClickMenu, id }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onClickMenu(id)}
      style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}
    >
      {/* <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: -2, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
        }}
      > */}
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <View
          style={{
            height: ms(70),
            width: ms(70),
            backgroundColor: color.white,
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={iconImg}
            resizeMode="contain"
            style={{
              height: ms(52),
              width: ms(52),
            }}
          />
        </View>
      </DropShadow>
      {/* </DropShadow> */}
      <Text
        style={{
          textAlign: "center",
          marginTop: 5,
          flexWrap: "wrap",
          fontFamily: "medium",
          fontSize: ms(12),
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
