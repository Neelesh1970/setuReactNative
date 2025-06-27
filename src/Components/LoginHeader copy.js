import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Icons } from "../assets/icons/Icons";
import React from "react";
import { color } from "../assets/colors/Colors";
import DropShadow from "react-native-drop-shadow";
import { ms } from "react-native-size-matters";
const LoginHeader = ({
  title,
  onIconPress,

  isOptionMenu,
  isOptionMenu2,
  optionMenuSrc2,
  onOptionPress2,
  optionMenuSrc,
  onIconStyle,
  onIconStyle2,
  onOptionPress,
}) => {
  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <Image source={Icons.leftArrow} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {isOptionMenu && !isOptionMenu2 && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              bottom: 0,
              end: 15,
              paddingTop: 20,
            }}
            onPress={onOptionPress}
          >
            <Image
              source={optionMenuSrc}
              style={{ height: ms(30), width: ms(30), resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}
        {isOptionMenu && isOptionMenu2 && (
          <View
            style={{
              marginEnd: 15,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 5,
              }}
              onPress={onOptionPress}
            >
              <Image
                source={optionMenuSrc}
                style={[
                  {
                    height: 22,
                    width: 22,
                    resizeMode: "contain",
                    tintColor: color.white,
                  },
                  onIconStyle,
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 5,
              }}
              onPress={onOptionPress2}
            >
              <Image
                source={optionMenuSrc2}
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </DropShadow>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",

    // elevation: 10,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "rgba(0, 0, 0, 0.3)", // rgba(0, 0, 0, 0.3) color
    //     shadowOffset: { width: 0, height: 4 }, // x: 0, y: 4
    //     shadowOpacity: 1, // Set opacity to full since rgba handles the transparency
    //     shadowRadius: 3, // Blur radius 3
    //   },
    //   android: {
    //     elevation: 1,
    //     //backgroundColor: "#000000",
    //     borderBottomColor: "rgba(0, 0, 0, 0.3)",
    //     borderBottomWidth: 3,
    //   },
    // }),
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingTop: 20,

    height: 80,
    backgroundColor: color.editBlue,
  },
  iconContainer: {
    position: "absolute",

    left: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 20,
    marginStart: 10,
    flex: 1,
    //   fontWeight: "bold",
    fontFamily: "bold",
    textAlign: "center",
    color: color.white,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
