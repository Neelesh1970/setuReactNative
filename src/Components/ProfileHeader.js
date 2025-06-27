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

const ProfileHeader = ({
  title,
  onIconPress,
  rightButtonText,
  onRightButtonPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
        <Image source={Icons.back_icon} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      {rightButtonText ? (
        <TouchableOpacity
          onPress={onRightButtonPress}
          style={styles.rightButtonStyle}
        >
          <Text style={styles.rightButtonText}>{rightButtonText}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderView} />
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: color.white,
    justifyContent: "space-between",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    // backgroundColor: "orange",
  },
  icon: {
    width: 6.5,
    height: 13,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
    // backgroundColor: "yellow",
  },
  title: {
    fontSize: 16,
    fontFamily: "medium",
    color: color.black,
    textAlign: "center",
  },
  rightButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },
  rightButtonText: {
    fontFamily: "medium",
    color: color.editBlue,
  },
  placeholderView: {
    width: 30, // This matches the width of the iconContainer to maintain alignment
  },
});
