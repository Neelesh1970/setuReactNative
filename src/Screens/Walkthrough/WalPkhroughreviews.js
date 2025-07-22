import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
import { screenWidth } from "../../Utils/utils";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from "react-native-drop-shadow";

export default WalkthroughPreview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <TouchableOpacity
      style={[styles.videoContainer]}
      onPress={() => onPress(item)}
    >
      <View style={[styles.imageContainer]}>
        <LinearGradient
          colors={[item.color_1, item.color_1]}
          style={styles.videoPreview}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        ></LinearGradient>

        {/* <Image style={[styles.videoPreview]} source={{ uri: item[imageKey] }} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: (screenWidth * 90) / 100,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  videoPreview: {
    width: (screenWidth * 90) / 100 - 80,
    height: (screenWidth * 90) / 100 - 80,
    borderRadius: 16,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: ms(50),
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    shadowProp: {
      shadowColor: "#00000025",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
  },
});
