import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Entypo';
import Loader, { hideLoader, showLoader } from '../../../../Utils/Loader';
import { cartDetailsSuccess } from '../../../../features/booktest/booktestSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AddtoCart, CartDetailsAPi, RemoveFromCart } from '../../../../Utils/api/bookTest';
import ToastService from '../../../../Utils/ToastService';
import { getItem } from '../../../../Utils/utils';
import Toast from 'react-native-simple-toast';



const CartListRow = ({ title, price, originalPrice, code, quantity }) => {
    const dispatch = useDispatch()
    const [userID, setUserID] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(quantity);

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

    const RemoveFromCartApi = async (code) => {
        showLoader();
        const data = {
            "productCode": code,
            'user_id': userID
        }
        try {
            console.log('RemoveFromCart data input:', data);
            const response = await RemoveFromCart(data);
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
            const response = await CartDetailsAPi(data);
            console.log('CartDetails Response:', response);

            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                console.log('CartDetails Response data:', Object.keys(response?.data?.data).length);

                if (Object.keys(response?.data?.data)?.length === 0) {
                    const data = {
                        cart_data: [],
                        cart_summary: {}
                    }
                    dispatch(cartDetailsSuccess({ data: data }));
                    // Alert.alert(response.data.message ?? "Cart is Empty");
                } else {
                    dispatch(cartDetailsSuccess({ data: response.data.data }));
                }
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

    const AddtoCartAPI = async (code,quantity) => {
        // showLoader();
        const data = {
          "productCode": code,
          "quantity": quantity,
          'user_id': userID
        }
    
        try {
          console.log('AddtoCartAPI data input:', data);
          const response = await AddtoCart(data);
          console.log('AddtoCartAPI Response:', response);
    
          if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
            // dispatch(categoriesInfoSuccess({ data: response.data.data }));
            ToastService.showSuccess('Success!', response.data.message ?? "Added to the Cart!")
            CartDetails()
          } else {
            ToastService.showError('Error!', response.data.message || "Something Went Wrong")
          }
        } catch (error) {
          console.log('Error from AddtoCartAPI call:', error.response ? error.response.data : error.message);
          if (error.response && error.response.data && error.response.data.message) {
            ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
          } else {
            ToastService.showError('Error!', error.response.data.message || "An error occurred. Please try again later.")
          }
        } finally {
          // hideLoader();
        }
      }

    // const totalPrice = price * itemQuantity;
    // const totalOriginalPrice = originalPrice * itemQuantity;


    const handleDecrease = () => {
        if (quantity) {
            // setItemQuantity(itemQuantity - 1);
            // setItemQuantity(prevQty => prevQty - 1);
            AddtoCartAPI(code,-1)
        } else {
            handleRemoveCart();
        }
    };

    const handleIncrease = (code) => {
        // setItemQuantity(itemQuantity + 1);
        // setItemQuantity(prevQty => prevQty + 1);
        AddtoCartAPI(code,1)
    };



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
                        if (code != '' && userID && userID != null) {
                            RemoveFromCartApi(code)
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };


    return (
        // <View style={styles.card}>
        //     <Loader />
        //     <View style={styles.iconContainer}>
        //         <Image source={require("../../../../assets/images/Group.png")} style={styles.icon} />
        //     </View>
        //     <View style={styles.textContainer}>
        //         <Text style={styles.title}>{title}</Text>
        //         <View style={styles.flexrow}>
        //             <Text style={styles.tests}>{quantity} Test</Text>
        //             <Text style={styles.price}>₹{price}</Text>
        //         </View>
        //     </View>
        //     <TouchableOpacity style={styles.iconCross} onPress={handleRemoveCart}>
        //         <Icon name="cross" size={25} color='red' />
        //         <Text style={styles.strikePrice}>₹{originalPrice}</Text>
        //     </TouchableOpacity>
        // </View>

        <View style={styles.card}>
            <Loader />
            <View style={styles.iconContainer}>
                <Image source={require("../../../../assets/images/Group.png")} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.flexrow}>
                    {/* <Text style={styles.tests}>{quantity} Test</Text> */}
                     {/* <Text style={styles.price}>₹{price}</Text> */}
                    {/* <Text style={styles.strikePrice}>₹{originalPrice}</Text>  */}
                </View>
            </View>

            {/* Added - and + icons with quantity in between */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {handleDecrease(code)}}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {handleIncrease(code)}}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                {/* Price Section */}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{price}</Text> 
                    <Text style={styles.strikePrice}>₹{originalPrice}</Text>
                </View>
            </View>
        </View>
    );
}

const CartList = ({ cartDetailsData }) => {

    console.log("CartListcartDetailss", cartDetailsData)

    return (
        <View style={styles.container}>
            <Loader />
            {
                Array.isArray(cartDetailsData?.cart_data) && cartDetailsData?.cart_data?.length > 0 && cartDetailsData?.cart_data?.map((item, index) => {
                    const { name = "N/A", product_code = "", category = '', price = "", offer_price = "", quantity = 1 } = item || {}
                    return (
                        <CartListRow key={index} title={name} price={offer_price} originalPrice={price} code={product_code} quantity={quantity} />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#E4E4E4',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'space-between',
        gap: 5,
        margin: ms(15),
        marginTop: ms(15)

    },
    iconContainer: {
        marginEnd: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 2
    },
    textContainer: {
        flex: 1,
        marginRight: 3
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tests: {
        fontSize: 14,
        color: "gray"
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    strikePrice: {
        fontSize: 14,
        color: 'gray',
        textDecorationLine: 'line-through'
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    /* Added styles for quantity buttons */
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#FFF',
        // borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    priceContainer: {
        alignItems: 'center', 
        marginTop: 5,
        marginLeft: ms(10)
    },
});
export default CartList;
