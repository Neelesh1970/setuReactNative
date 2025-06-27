import { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
function CartItem({ item }) {
  const [cartCount, setCartCount] = useState(item?.cart_count);
  return (
    <View style={styles.container}>
      <Image source={Icons.image_1} style={styles.imageContainer} />
      <View style={{ flex: 1, marginStart: 10, marginEnd: 10 }}>
        <Text style={styles.productName}>{item?.name}</Text>
        <Text style={styles.productQTY}>{item?.qty}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.productPrice, { color: color.black }]}>
            {item?.discount_price}
          </Text>
          <Text
            style={[
              styles.productPrice,
              {
                color: color.black,
                marginStart: 5,
                color: color.profileGrey,
                textDecorationLine: "line-through",
              },
            ]}
          >
            {item?.price}
          </Text>
          <Text
            style={[
              styles.productPrice,
              {
                color: color.discount_green,
                marginStart: 5,
                color: color.discount_green,
              },
            ]}
          >
            {item?.discount}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() => {
              if (cartCount > 1) {
                setCartCount((cartCount) => cartCount - 1);
              }
            }}
          >
            <Text
              style={{
                fontSize: ms(20),
                padding: 2,
                width: moderateScale(30),
                textAlign: "center",
                color: color.red,
                fontFamily: "bold",
              }}
            >
              {"-"}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(14),
              color: color.black,
              padding: 5,
              minWidth: moderateScale(30),
              textAlign: "center",
            }}
          >
            {cartCount}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCartCount((cartCount) => cartCount + 1);
            }}
          >
            <Text
              style={{
                fontSize: ms(20),
                padding: 2,
                width: moderateScale(30),
                textAlign: "center",
                color: color.red,
              }}
            >
              {"+"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  imageContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    resizeMode: "contain",
  },
  counterContainer: {
    flexDirection: "row",
    borderColor: color.red,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
  },
  productName: {
    fontFamily: "regular",
    fontSize: ms(12),
    color: color.black,
  },
  productQTY: {
    fontFamily: "regular",
    fontSize: ms(11),
    color: color.profileGrey,
    marginTop: 3,
  },
  productPrice: {
    fontFamily: "medium",
    fontSize: ms(12),
    color: color.profileGrey,
    marginTop: 3,
  },
});
export default CartItem;
