import { StyleSheet } from "react-native";
import { screenWidth } from "../../../Utils/utils";
import { normalize } from "../../../Utils/normalize";

export const styles = StyleSheet.create({
    ProductCardContainer: {
        borderWidth: 1,
        width: '48%',
        padding: normalize(10),
        borderRadius: 8,
        backgroundColor: '#d9d9d9',
        marginVertical: normalize(5),
        borderColor:'#c9c5c7',
    },
    image: {
        height: normalize(100),
        width: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 8,
    },
    label: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        marginVertical: normalize(8),
    },
    price: {
        color: '#51c0a5',
        fontSize: normalize(15),
        fontWeight: 'bold',
    },
})