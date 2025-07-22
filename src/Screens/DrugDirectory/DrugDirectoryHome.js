import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { ms, s, vs } from "react-native-size-matters";

export default function DrugDirectoryHome({ navigation }) {
  const drugData = [
    {
      id: "1",
      image: require("./images/atoz.png"),
      navigate: "DrugDirectoryAtoZ",
      title: "Drugs A-Z",
      description:
        "Drug A-Z is an online directory listing medications with details on uses, side effects, and interactions.",
    },
  ];

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DashboardScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBody}>
        <Text style={styles.header}>Drugs Discovery</Text>
      </View>
      <View style={styles.subHeaderBody}>
        <Text style={styles.subHeader}>
          Drug discovery is the process of identifying and developing new
          medicines to treat diseases by targeting specific biological
          mechanisms.
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() =>
            navigation.navigate("DrugSearch", {
              searchQuery: "",
              showSearch: true,
              backClick: "DrugDirectoryHome",
            })
          }
        >
          <AntDesign
            name="search1"
            size={s(20)}
            color="#A0A0A0"
            style={styles.searchIcon}
          />
          <Text style={styles.input}>Search</Text>
        </TouchableOpacity>
      </View>

      <View>
        {drugData.map((item) => (
          <TouchableOpacity
            key={item?.id}
            style={styles.navigateCard}
            onPress={() => navigation.navigate(item.navigate)}
          >
            <View style={styles.imageContainer}>
              <Image source={item?.image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item?.title}</Text>
              <Text
                style={styles.cardDescription}
                ellipsizeMode="tail"
                numberOfLines={4}
              >
                {item?.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomImageContainer}>
        <Image
          source={require("./images/drug_home.png")}
          style={styles.bottomImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: s(20),
  },
  headerBody: {
    alignItems: "center",
  },
  header: {
    fontSize: s(14),
    fontWeight: "bold",
    marginBottom: vs(9),
  },
  subHeaderBody: {
    alignSelf: "stretch",
  },
  subHeader: {
    textAlign: "justify",
    fontSize: s(12),
    lineHeight: vs(17),
    marginBottom: vs(8),
  },
  searchContainer: {
    marginTop: vs(9),
    marginBottom: vs(25),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 10,
    paddingHorizontal: s(9),
    marginTop: vs(9),
  },
  searchIcon: { marginRight: s(9) },
  input: {
    flex: 1,
    color: "#666",
    paddingVertical: s(8),
    fontSize: s(13),
  },
  navigateCard: {
    flexDirection: "row",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 8,
    marginBottom: vs(10),
    padding: ms(10),
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: vs(90),
    borderRadius: 10,
    resizeMode: "contain",
  },
  textContainer: {
    width: "60%",
    borderLeftWidth: 1,
    paddingLeft: s(9),
    paddingRight: s(5),
    marginLeft: s(9),
    borderStyle: "dashed",
    borderColor: "#555",
  },
  cardTitle: {
    fontSize: s(14),
    fontWeight: "bold",
  },
  cardDescription: {
    marginTop: 5,
    fontSize: s(10),
    lineHeight: vs(15),
  },
  bottomImageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomImage: {
    width: "100%",
    height: vs(280),
    resizeMode: "contain",
    marginBottom: vs(30),
  },
});
