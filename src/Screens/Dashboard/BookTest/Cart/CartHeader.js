import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { IonIcons } from "expo/vector-icons";
// import styles from "../Splash/firstScreen/styles";
import { check } from "../../assets/images/check_circle.png"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartIconWithBadge from "./CartIconWithBadge";
import { ms } from "react-native-size-matters";


const CartHeader = ({ name, showCart = false  , showOrderIcon=  false}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={
                        () => {
                            // if (name === 'Sample Pickup Slot Details') {
                            //     navigation.navigate('CartScreen')
                            // } else {
                            //     navigation.goBack()
                            // }
                            navigation.goBack()
                        }
                    } style={styles.backButton}>
                    {/* <Ionicons name="arror-back" size={24} color="white"/> */}
                    {/* <Image  source={require("../../../../assets/images/left-arrow.png")} /> */}
                    <FontAwesome style={styles.imgheight} name="chevron-left" size={16} />
                </TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
                {showOrderIcon && (
                    <TouchableOpacity onPress={() => navigation.navigate('BookingOrderList')}>
                        <FontAwesome style={[styles.imgheight, { marginLeft: ms(130) }]} name="truck" size={22} />
                    </TouchableOpacity>
                )
                }
            </View>
            {showCart && <CartIconWithBadge navigation={navigation} />}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1976D2",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    backButton: {
        paddingEnd: 10,
        marginTop: 7
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 11
    },
    imgheight: {
        // width: 20,
        // height: 20,
        padding: 12,
        // alignItems: 'center',
        color: "#FFFFFF"
    }
})

export default CartHeader;