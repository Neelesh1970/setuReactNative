import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../../Utils/utils';
import { FetchAddressList } from '../../../Utils/api/bookTest';
import { AddressList } from '../../../features/booktest/booktestSlice';
import CartHeader from './CartHeader';
import { CartDetailsApi, RemoveFromCartApi } from '../../../Utils/api/Agriculture';
import Loader, { hideLoader, showLoader } from '../../../Utils/Loader';
import ToastService from '../../../Utils/ToastService';
import { cartDetailsSuccess } from '../../../features/agriculture/agricultureSlice';


const CartListRow = ({ title, desc, price, originalPrice, fertiliser_id }) => {

    const dispatch = useDispatch()
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchUserID = async () => {
            const id = await getItem('userID');
            if (id) {
                setUserID(id);
            }
        };
        fetchUserID();
    }, []);

    console.log('userID', userID)

    const RemoveFromCart = async () => {
        showLoader();
        const data = {
            "user_id": userID,
            "fertiliser_id": fertiliser_id
        }

        try {
            console.log('RemoveFromCart data input:', data);
            const response = await RemoveFromCartApi(data);
            console.log('RemoveFromCart Response:', response);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                ToastService.showSuccess('Success!', response.data.message ?? "Product removed from the Cart!")
                CartDetails()
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from RemoveFromCart call:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
            } else {
                ToastService.showError('Error!', "An error occurred. Please try again later.")
            }
        } finally {
            hideLoader();
        }
    }

    const CartDetails = async () => {
        showLoader();
        const data = {
            // "productType": "profile",
            // "category": category?.name,
            'user_id': userID
        }
        try {
            console.log('CartDetails data input:', data);
            const response = await CartDetailsApi(data);
            console.log('CartDetails Response:', response);

            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                console.log('CartDetails Response data:', Object.keys(response?.data?.data).length);
                dispatch(cartDetailsSuccess({ data: response.data.data }));
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            // dispatch(clearCart());

            console.log('Error from CartDetails call:', error.response ? error.response.data : error.response.data.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', error.response.data.message)
            } else {
                ToastService.showError('Error!', "An error occurred. Please try again later.")
            }
        } finally {
            hideLoader();
        }
    }


    const handleRemoveCart = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this product?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Deletion cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log('Deletion confirmed');
                        if (fertiliser_id != '' && userID && userID != null) {
                            RemoveFromCart()
                            console.log('RemoveFromCart called');
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.cardContainer}>
            <Image
                source={require("../../../assets/images/product_image.png")}
                style={styles.productImage}
            />
            <Loader />

            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{title}</Text>
                <Text style={styles.productDescription}>
                    {desc}
                    <Text style={styles.knowMore}> Know More</Text>
                </Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>₹{price}</Text>
                    <Text style={styles.oldPrice}> ₹{originalPrice}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.closeButtonContainer} onPress={handleRemoveCart}>
                <Icon name="close" size={22} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const CartList = ({ cartDetailsData }) => {
    console.log("CartList CartListcartDetailss", cartDetailsData)

    return (
        <View style={styles.container}>
            {
                Array.isArray(cartDetailsData?.cart_data) && cartDetailsData?.cart_data?.length > 0 && cartDetailsData?.cart_data?.map((item, index) => {
                    const { product_name = "N/A", cart_id = '', mrp_inclusive_gst = '', total_price = '', quantity = 1, fertiliser_id = '' } = item || {}
                    return (
                        <CartListRow key={index} title={product_name} price={total_price} originalPrice={mrp_inclusive_gst} quantity={quantity} fertiliser_id={fertiliser_id} />
                        // <CartListRow title="DAP 18-46-0" desc="IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer." price={4000} originalPrice={4500} />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        height: ms(120),
        paddingTop: 0,
        paddingBottom: 0
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        marginLeft: 10,
        width: ms(190)
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
    },
    knowMore: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    oldPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    closeButtonContainer: {
        backgroundColor: '#D0E7FB',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: ms(8),
        position: 'absolute',
        right: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
})

export default CartList;