import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import EcartBottomNavBar from "./EcartBottomNavbar";
import { color } from "../../assets/colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 125.99,
    description: "Premium headphones with noise cancellation.",
    image: require("../../assets/images/e_cart/headphones.png"),
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 89.99,
    description: "Fitness tracking and smart notifications.",
    image: require("../../assets/images/e_cart/smartwatch.png"),
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: 59.99,
    description: "Crisp sound and portable design.",
    image: require("../../assets/images/e_cart/speaker.png"),
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 49.99,
    description: "Comfortable and lightweight for daily runs.",
    image: require("../../assets/images/e_cart/shoes.png"),
  },
  {
    id: 5,
    title: "Backpack",
    price: 39.99,
    description: "Spacious and stylish for everyday carry.",
    image: require("../../assets/images/e_cart/backpack.png"),
  },
  {
    id: 6,
    title: "Sunglasses",
    price: 29.99,
    description: "UV protected and stylish.",
    image: require("../../assets/images/e_cart/sunglasses.png"),
  },
];

const ShopScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={{ margin: 16 }}
          onPress={() => navigation.goBack()}
        />

        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "700",
            marginStart: 60,
          }}
        >
          E_Cart
        </Text>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("productHomeScreen", { product: item })
            }
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <EcartBottomNavBar
        activeTab="Home"
        onTabPress={(tab) => navigation.navigate("Shop")}
      />
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FBFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 50,
    marginBottom: 10,
    padding: 20,
    color: "#fff",
    backgroundColor: color.bottomViewColor,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    width: width * 0.44,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
    color: "#000",
  },
  price: {
    fontSize: 14,
    color: "#4A7BD3",
    fontWeight: "500",
  },
});
