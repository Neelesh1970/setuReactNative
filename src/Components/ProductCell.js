import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { ms, vs } from "react-native-size-matters";
import { color } from "../assets/colors/Colors";
import { Icons } from "../assets/icons/Icons";
import { screenWidth } from "../Utils/utils";
function ProductCell({ data, onPressProduct }) {
  const [quantity, setQuantity] = useState(0);

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
    <DropShadow
      style={{
        shadowColor: "#00000025",
        shadowOffset: { width: 0, height: ms(2) },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: ms(8),
      }}
    >
      <TouchableOpacity
        onPress={onPressProduct}
        style={{
          backgroundColor: color.white,
          padding: ms(10),
          borderRadius: ms(10),
          borderColor: color.subtitleGrey,
          borderWidth: 1,
          width: ms(screenWidth / ms(2.3)),
          alignItems: "center",
        }}
      >
        <Image
          source={data.index % 2 == 0 ? Icons.image_1 : Icons.image_2}
          style={{
            width: screenWidth / ms(2.8),
            resizeMode: "contain",
            height: screenWidth / ms(2.8),
            marginTop: vs(5),
          }}
        />
        <Text
          style={{
            fontFamily: "medium",
            fontSize: ms(12),
            color: color.black,
            //padding: ms(2),

            textAlign: "center",
          }}
          numberOfLines={2}
        >
          {data.item.name}
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: ms(10),
            color: color.grey,
          }}
          numberOfLines={1}
        >
          {data.item.qty}
        </Text>
        <View
          style={{
            backgroundColor: color.grey,
            height: 1,
            width: "100%",
            marginTop: ms(8),
            marginBottom: ms(8),
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",

            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textDecorationLine: "line-through",
              fontFamily: "medium",
              fontSize: ms(10),
              color: color.searchInputBorder,
            }}
          >
            {data.item.price}
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(14),
              marginStart: ms(8),
              flex: 1,
            }}
          >
            {data.item.price}
          </Text>
          {quantity === 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: color.add_green,
                borderRadius: 4,
                paddingStart: ms(10),
                paddingEnd: ms(10),
                paddingTop: ms(3),
                paddingBottom: ms(3),
              }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(12),
                  color: color.white,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{}}>
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
            </View>
          )}
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
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

    backgroundColor: color.colorPrimary,
    borderRadius: 6,
    height: ms(25),
    width: ms(50),
  },
  incrementDecrementButton: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(20),
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

export default ProductCell;
