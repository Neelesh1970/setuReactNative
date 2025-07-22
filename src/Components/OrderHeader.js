import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { Icons } from "../assets/icons/Icons";
import { color } from "../assets/colors/Colors";
import DropShadow from "react-native-drop-shadow";

export default function OrderHeader({
  title,
  onIconPress,
  titleStyle,
  headerContainerStyle,
  titleTextStyle,
  iconStyle,
}) {
  return (
    <DropShadow style={styles.shadowProp}>
      <View
        style={[
          {
            flexDirection: "row",
            padding: ms(15),
            backgroundColor: color.colorPrimary,
          },
          headerContainerStyle,
        ]}
      >
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <Image source={Icons.back_icon} style={[styles.icon, iconStyle]} />
        </TouchableOpacity>
        <View
          style={[
            {
              flex: 1,
              //alignItems: "center",  //If you need to center the title give this style
              marginStart: ms(40),
            },
            titleStyle,
          ]}
        >
          <Text
            style={[
              {
                fontFamily: "medium",
                fontSize: ms(18),
                color: color.white,
              },
              titleTextStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    // backgroundColor: "red",
    paddingVertical: ms(8),
    left: 0,
    top: ms(15),
    paddingHorizontal: ms(20),
    zIndex: 2,
  },
  icon: {
    width: ms(10),
    height: ms(12),
    tintColor: color.white,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    zIndex: 10,
  },
});
