import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import CartList from "./CartList";
import AddMoreTestButton from "./AddMoreTestButton";
import BookingSummary from "./BookingSummary";
import ContinueButton from "./ContinueButton";
import { TouchableOpacity, Text } from "react-native";
import { ms } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../../Utils/Loader";
import { CartDetailsAPi, FetchAddressList } from "../../../../Utils/api/bookTest";
import { AddressList, cartDetailsSuccess } from "../../../../features/booktest/booktestSlice";
import BottomModal from "./BottomModal";
import AddressForm from "../../Address/AddressForm";
import { getItem } from "../../../../Utils/utils";
import CartHeader from "../../BookTest/Cart/CartHeader";
import ToastService from "../../../../Utils/ToastService";
import NeedAssistanceBooktest from "../../Checkout/NeedAssistanceBooktest";

const CartScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const AddressListDataa = useSelector((state) => state.bookTest.AddressListData);


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


    const FetchAddressListAPI = async () => {
        // showLoader();
        try {
            const data = {
                'user_id': userID
            }
            const response = await FetchAddressList(data);
            console.log('FetchAddressList Response:', response);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                dispatch(AddressList({ data: response.data.data }));
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from FetchAddressListAPI call:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            } else {
                ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
            }
        } finally {
            //   hideLoader();
        }
    }


    useEffect(() => {
        if (userID) {
            FetchAddressListAPI()
        }
    }, [userID])


    const openModal = () => {
        if (AddressListDataa?.length === 0 || AddressListDataa === undefined || AddressListDataa === null) {
            setModalVisible(true);
            return;
        }
        navigation.navigate("PickupSlotDetails")
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const dispatch = useDispatch()
    const cartDetailsData = useSelector((state) => state.bookTest.cartDetails);

    console.log('cartDetailsDataaa', cartDetailsData)
    if (cartDetailsData?.cart_data?.length === 0 || !cartDetailsData || cartDetailsData === undefined || cartDetailsData?.length == 0) {
        return (
            <View>
                <CartHeader name="My Cart" />
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Cart is Empty</Text>
                </View>
            </View>
        );
    }
    return (
        <ScrollView>
            <CartHeader name="My Cart" />
            <CartList cartDetailsData={cartDetailsData} />
            {/* <AddMoreTestButton/> */}

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("BookTestScreen") }}>
                <Text style={styles.buttonText}>Add More Tests</Text>
            </TouchableOpacity>

            <View style={styles.assistance}>
                <NeedAssistanceBooktest />
            </View>


            <BookingSummary cartDetailsData={cartDetailsData} />

            {/* <TouchableOpacity style={styles.buttonContinue} onPress={() => navigation.navigate('Address', { FromChangeScreen: false })}>
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.buttonContinue}
                onPress={openModal}
            >
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>

            <BottomModal isVisible={isModalVisible} onClose={closeModal}>
                <AddressForm navigation={navigation} closeModal={closeModal} />
            </BottomModal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginVertical: ms(20),
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#E0F1FF",
        paddingVertical: ms(10),
        borderRadius: 5,
        height: ms(40),
        fontWeight: 'bold',
        fontSize: ms(14),
        borderRadius: ms(12),
        marginBottom: ms(12),
        marginTop: ms(12),
        width: '50%',
        alignItems: 'center',
        margin: 'auto'
    },
    buttonText: {
        color: "#0D4690",
        fontSize: ms(14),
        fontWeight: "bold",
    },
    buttonContinue: {
        width: '92%',
        backgroundColor: '#1666C0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyCartContainer: {
        marginTop: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    assistance: {
        paddingHorizontal: ms(20)
    }
})

export default CartScreen;
