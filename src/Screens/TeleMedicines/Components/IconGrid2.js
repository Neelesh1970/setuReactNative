import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icons } from "../../../assets/icons/Icons";
import { ms, s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

export default function IconGrid2({ title, data, navigation }) {
  const [visibleItems, setVisibleItems] = useState(4);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => setVisibleItems(visibleItems === 4 ? data?.length : 4)}
          style={styles.viewMoreBody}
        >
          <Text style={styles.viewMore}>
            {visibleItems === 4 ? "View More" : "View Less"}
          </Text>
          <Ionicons
            name={
              visibleItems === 4 ? "chevron-down-outline" : "chevron-up-outline"
            }
            size={s(20)}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Grid Icons */}
      <FlatList
        data={data.filter((item) => item.showInSymtoms).slice(0, visibleItems)}
        numColumns={4}
        extraData={visibleItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Doctors", {
                symptomId: item.symptomId,
              })
            }
            style={styles.iconContainer}
          >
            <View style={styles.iconImageBody}>
              <Image source={Icons.stomach_pain} style={styles.iconImage} />
            </View>
            <Text
              style={styles.iconLabel}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item?.symptomName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.symptomId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: vs(10),
    paddingHorizontal: s(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: vs(10),
    paddingHorizontal: s(10),
  },
  title: {
    fontSize: s(13),
    fontWeight: "bold",
    color: "#444",
  },
  viewMoreBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMore: {
    fontSize: s(11),
    color: "#333",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: vs(8),
    paddingVertical: vs(4),
    paddingHorizontal: s(2),
    minWidth: width / s(4) - s(20),
  },
  iconImageBody: {
    paddingVertical: vs(5),
    paddingHorizontal: s(10),
    borderRadius: width <= 400 ? 18 : 20,
    borderWidth: 1,
    borderColor: "#c7c7c7",
  },
  iconImage: {
    width: ms(45),
    height: ms(50),
    marginBottom: vs(5),
  },
  iconLabel: {
    fontSize: s(8),
    fontWeight: width <= 400 ? 500 : 700,
    textAlign: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    paddingHorizontal: s(3),
  },
});
