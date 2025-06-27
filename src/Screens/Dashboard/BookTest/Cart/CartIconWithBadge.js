import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const CartIconWithBadge = ({ navigation }) => {
    const cartDetailsData = useSelector((state) => state.bookTest.cartDetails);
    console.log("cartDetailsData", cartDetailsData?.cart_data?.length)

    return (
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
                <Icon name="shopping-cart" size={25} color='white' />
            </TouchableOpacity>
            {
                cartDetailsData?.cart_data?.length > 0 && <View style={styles.badgeContainer}>
                    {<Text style={styles.badgeText}>{ cartDetailsData?.cart_data?.length}</Text>}
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    width: 30,
    height: 30,
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#F43A3A",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default CartIconWithBadge;
