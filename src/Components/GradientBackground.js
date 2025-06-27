import { LinearGradient } from "react-native-linear-gradient";
import { color } from "../assets/colors/Colors";
import { StyleSheet, Text } from "react-native";
import { ms } from "react-native-size-matters";

function GradientBackGround({ containerStyle, title, textStyle }) {
  return (
    <LinearGradient
      style={[styles.mainContainer, containerStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[color.select_plan_color_2, color.select_plan_color_1]}
    >
      <Text style={[styles.titleStyle, textStyle]}>{title}</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 30,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  titleStyle: {
    fontFamily: "bold",
    fontSize: ms(13),
    color: color.white,
  },
});
export default GradientBackGround;
