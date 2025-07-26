import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import EcartBottomNavBar from "./EcartBottomNavbar";
import { color } from "../../assets/colors/Colors";

const initialCartItems = [
  {
    id: 1,
    name: "Organic Strawberries",
    price: 12.99,
    qty: 2,
    image: require("../../assets/images/e_cart/strawberry.png"),
  },
  {
    id: 2,
    name: "Whole Milk",
    price: 4.5,
    qty: 1,
    image: require("../../assets/images/e_cart/milk.png"),
  },
  {
    id: 3,
    name: "Avocados (3)",
    price: 3.75,
    qty: 3,
    image: require("../../assets/images/e_cart/avocados.png"),
  },
  {
    id: 4,
    name: "Bananas",
    price: 2.25,
    qty: 1,
    image: require("../../assets/images/e_cart/bannanas.png"),
  },
];

const ECartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [cartItems, setCartItems] = useState(initialCartItems);

  // ✅ Check for product passed from ProductDetailScreen
  useEffect(() => {
    const { product } = route.params || {};
    if (product) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          // If product exists, increment quantity
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          // Add new product
          return [...prevItems, { ...product, qty: 1 }];
        }
      });
    }
  }, [route.params]);

  const updateQty = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                action === "increment"
                  ? item.qty + 1
                  : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Cart</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Items */}
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.qtyButtons}>
              <TouchableOpacity
                onPress={() => updateQty(item.id, "decrement")}
                style={styles.qtyBtn}
              >
                <Icon name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <TouchableOpacity
                onPress={() => updateQty(item.id, "increment")}
                style={styles.qtyBtn}
              >
                <Icon name="add" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Subtotal */}
        <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Common Bottom Navigation */}
      <EcartBottomNavBar
        activeTab="Home"
        onTabPress={(tab) => navigation.navigate(tab)}
      />
    </SafeAreaView>
  );
};

export default ECartScreen;

// Styles (same as yours)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FBFD" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    paddingBottom: 10,
    backgroundColor:color.bottomViewColor,
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#fff" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: "#000" },
  itemPrice: { fontSize: 14, color: "#5270A2", marginTop: 4 },
  qtyButtons: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    backgroundColor: "#E5ECF6",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 16, fontWeight: "500" },
  subtotal: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
