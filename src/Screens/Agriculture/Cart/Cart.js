import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import AddMoreTestButton from "./AddMoreTestButton";
import BookingSummary from "./BookingSummary";
import ContinueButton from "./ContinueButton";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FetchAddressList } from "../../../Utils/api/bookTest";
import BottomModal from "../../Dashboard/BookTest/Cart/BottomModal";
import AddressForm from "../../Dashboard/Address/AddressForm";
import { AddressList } from "../../../features/booktest/booktestSlice";
import ToastService from "../../../Utils/ToastService";
import { getItem } from "../../../Utils/utils";
import { setisComefromBookAppoint } from "../../../features/agriculture/agricultureSlice";

const AgriCartScreen = ({ navigation }) => {
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
        navigation.navigate("AgroScreenSlotDetails")
    };

    const handleContinue = () => {
        dispatch(setisComefromBookAppoint({ data: false }));
        openModal();
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const dispatch = useDispatch()
    const cartDetailsData = useSelector((state) => state.agriculture.cartDetails);

    console.log('cartDetailsDataaa', cartDetailsData)
    console.log('AddressListDataa', AddressListDataa)

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
            <CartList cartDetailsData={cartDetailsData}/>
            {/* <AddMoreTestButton/> */}

            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Categories')}
            >
                <Text style={styles.buttonText}>Add More Tests</Text>
            </TouchableOpacity>
            <BookingSummary cartDetailsData={cartDetailsData} />

            <TouchableOpacity
                style={styles.buttonContinue}
                onPress={handleContinue}
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
        marginVertical: 20,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#E0EEFF",
        paddingVertical: 10,
        borderRadius: 5,
        height: 40,
        fontWeight: 'bold',
        borderRadius: 12,
        marginBottom: 12,
        width: '50%',
        alignItems: 'center',
        justifyContent: "center",
        margin: 'auto'
    },
    buttonText: {
        color: "#0A3D91",
        fontSize: 12,
        fontWeight: "bold",
    },
    buttonContinue: {
        backgroundColor: '#1666C0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        margin: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
})

export default AgriCartScreen;