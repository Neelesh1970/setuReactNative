import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Icons } from "../assets/icons/Icons";
import { ms } from "react-native-size-matters";
import { color } from "../assets/colors/Colors";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropShadow from "react-native-drop-shadow";

export default function ProductViewCard({
  product_img,
  name,
  ratings,
  tablets,
  stars,
  curr_price,
  og_price,
  discount,
  delivery,
}) {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(0);

  // Function to handle increment
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decrement
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={product_img}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{name}</Text>

          <View style={styles.tabletsContainer}>
            <Text style={styles.tabletsText}>
              {tablets} {t("tablets")}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.starText}>{stars}</Text>
              <Image source={Icons.star_fill} style={styles.starIcon} />
            </View>

            <Text style={styles.ratingsText}>
              {ratings} {t("ratings")}
            </Text>
          </View>

          <Text style={styles.deliveryText}>{delivery}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.currPrice}>{curr_price}</Text>

            <Text style={styles.ogPrice}>{og_price}</Text>

            <Text style={styles.discount}>{discount}</Text>
          </View>

          <DropShadow style={styles.shadowProp}>
            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.addButton} // Refactored style for "Add" button
                onPress={handleIncrement} // Set initial quantity to 1 on "Add" press
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.incrementDecrementButton} // Refactored style for decrement button
                  onPress={handleDecrement}
                >
                  <Text style={styles.incrementDecrementText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.incrementDecrementButton} // Refactored style for increment button
                  onPress={handleIncrement}
                >
                  <Text style={styles.incrementDecrementText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </DropShadow>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    gap: ms(5),
    alignItems: "flex-start",
  },
  imageContainer: {
    // backgroundColor: "green",
  },
  productImage: {
    width: ms(102),
    height: ms(115),
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontFamily: "medium",
    fontSize: ms(10),
    flexWrap: "wrap",
  },
  tabletsContainer: {
    flexDirection: "row",
    marginTop: ms(3),
  },
  tabletsText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: ms(5),
    marginTop: ms(5),
    alignItems: "center",
  },
  ratingBox: {
    flexDirection: "row",
    backgroundColor: color.rating_green,
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: ms(5),
    paddingVertical: ms(2),
    gap: ms(3),
  },
  starText: {
    color: color.white,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  starIcon: {
    width: ms(10),
    height: ms(10),
    alignItems: "center",
  },
  ratingsText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  deliveryText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
    marginTop: ms(3),
  },
  priceContainer: {
    flexDirection: "row",
    gap: ms(5),
    alignItems: "baseline",
  },
  currPrice: {
    color: color.black,
    fontSize: ms(14),
    fontFamily: "bold",
    marginTop: ms(2),
  },
  ogPrice: {
    color: color.appointment_grey,
    fontSize: ms(10),
    fontFamily: "medium",
    marginTop: ms(2),
  },
  discount: {
    color: color.rating_green,
    fontSize: ms(10),
    fontFamily: "bold",
    marginTop: ms(2),
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: ms(1.5),
    shadowRadius: ms(1.5),
    borderColor: color.shadow_grey,
    flex: 1,
    marginEnd: ms(6),
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: color.white,
    height: ms(35),
    width: ms(100),
    marginTop: ms(15),
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "bold",
    color: color.colorPrimary,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ms(15),
    backgroundColor: color.colorPrimary,
    borderRadius: 8,
    height: ms(35),
    width: ms(100),
  },
  incrementDecrementButton: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(30),
    height: "100%",
  },
  incrementDecrementText: {
    fontFamily: "bold",
    color: color.white,
  },
  quantityText: {
    fontFamily: "bold",
    color: color.white,
  },
});
