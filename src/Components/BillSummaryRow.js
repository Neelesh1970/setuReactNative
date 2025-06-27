import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ms } from "react-native-size-matters";
import { color } from "../assets/colors/Colors";

function BillSummaryRow({ item }) {
  if (item.is_separator) {
    return (
      <View
        style={{
          backgroundColor: color.grey,
          height: 1,
          width: "100%",
          marginTop: 10,
          marginBottom: 10,
        }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: item.name_color,
            fontFamily: item.is_bold ? "bold" : "regular",
            fontSize: ms(12),
          }}
        >
          {item.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {item.is_strikeout && (
            <Text
              style={{
                color: item.value_color,
                fontFamily: item.is_bold ? "bold" : "regular",
                fontSize: item.is_bold ? ms(14) : ms(12),
                marginEnd: 5,
                textDecorationLine: "line-through",
              }}
            >
              {item.strikeout_value}
            </Text>
          )}
          <Text
            style={{
              color: item.value_color,
              fontFamily: item.is_bold ? "bold" : "regular",
              fontSize: item.is_bold ? ms(14) : ms(12),
            }}
          >
            {item.value}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: ms(20),
    alignItems: "center",
  },
});
export default BillSummaryRow;
