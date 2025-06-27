import {
  FlatList,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import { ms } from "react-native-size-matters";
import { Icons } from "../../src/assets/icons/Icons";
export default function BottomSlider() {
  const DATA = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardStysle}>
        <Image
          source={Icons.dashboard_home_card}
          style={styles.doctorCardStyle}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 0 }}>
      <FlatList
        data={DATA}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal={true} // Horizontal scrolling for this FlatList
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  cardStysle: {
    marginHorizontal: 5,
  },
  doctorCardStyle: {
    height: ms(150),
    width: ms(300),
  },
});
