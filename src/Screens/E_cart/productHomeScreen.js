import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EcartBottomNavBar from "./EcartBottomNavbar";
import { color } from "../../assets/colors/Colors";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 🔹 Product Info */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.desc}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Cart", { product })}
            >
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* 🔹 Bottom Nav */}
      <EcartBottomNavBar
        activeTab="Home"
        onTabPress={(tab) => navigation.navigate("Shop")}
      />
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: color.bottomViewColor ,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  desc: {
    fontSize: 14,
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
