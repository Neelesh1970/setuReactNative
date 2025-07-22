import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";
import { color } from "../assets/colors/Colors";
import Entypo from "react-native-vector-icons/Entypo";
function ListHeader({
  headerTitle,
  optionTitle,
  onPressOption,
  option = true,
  icon,
  containerStyle,
  headerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.headerTitle, headerStyle]}>{headerTitle}</Text>
      {option && (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onPressOption}
        >
          <Text style={styles.optionTitle}>{optionTitle}</Text>
          <Entypo
            name={icon ? icon : "chevron-down"}
            size={20}
            color={color.grey}
            style={{ marginStart: 5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ListHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: ms(50),
  },
  headerTitle: {
    fontFamily: "interBold",
    fontSize: ms(18),
    color: color.black,
  },
  optionTitle: {
    fontFamily: "bold",
    fontSize: ms(12),
    color: color.black,
  },
});
