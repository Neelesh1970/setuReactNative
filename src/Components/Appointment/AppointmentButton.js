import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import DropShadow from "react-native-drop-shadow";

import { ms, vs } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
export default function AppointmentButton({ label, iconImg, onClickMenu, id }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onClickMenu(id)}
      style={{
        alignItems: "center",
        marginTop: 15,
        flex: 1,
        marginHorizontal: 10,
      }}
    >
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: -1, height: -1 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
        }}
      >
        <DropShadow
          style={{
            shadowColor: "#00000025",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }}
        >
          <View
            style={{
              height: ms(65),
              width: ms(65),
              backgroundColor: color.white,
              borderRadius: ms(25),
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
      </DropShadow>
      <Text
        style={{
          textAlign: "center",
          marginTop: 5,
          flexWrap: "wrap",
          fontFamily: "medium",
          fontSize: ms(12),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
