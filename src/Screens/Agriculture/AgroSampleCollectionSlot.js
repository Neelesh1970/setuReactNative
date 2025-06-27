import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Loader, { hideLoader, showLoader } from "../../Utils/Loader";
import ToastService from "../../Utils/ToastService";
import { getItem } from "../../Utils/utils";
import { bookSlotApi } from "../../Utils/api/Agriculture";
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env';
import { VerifyPayment } from "../../Utils/api/bookTest";



const AgroSampleCollectionSlot = ({ time, CheckValidation, FirstName, Phonenumber, Email, isComefromBookAppointment }) => {
    const navigation = useNavigation();
    const selectedTimee = useSelector((state) => state.bookTest.selectedSlotData);
    const selectedDate = useSelector((state) => state.bookTest.selectedDate);
    const slotAddressID = useSelector((state) => state.bookTest.slotAddressID);
    const pincode = useSelector((state) => state.bookTest.slotDetailspincode);

    const razorpay_id = RAZORPAY_KEY_ID;
    const razorpay_secret = RAZORPAY_KEY_SECRET;
    const [razID, setRazID] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const amount = 300;

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

    const AppointmentSlot = async () => {

        if (!selectedDate || !time) {
            ToastService.showError('Error!', "Please select date and slot to proceed!")
            return;
        }
        showLoader();
        let data = {
            "user_id": userID,
            "pinCode": pincode,
            "slot_date": selectedDate,
            "slot_time": time,
            "name": FirstName ?? '',
            "phone": Phonenumber ?? '',
            "email": Email ?? '',

        }

        if (isComefromBookAppointment) {
            // navigation.navigate('AgriOrderSuccess')
            data = { ...data, "type": "bookappointment" }
        }

        console.log("AppointmentSlot Input data", data)
        try {
            const response = await bookSlotApi(data);
            console.log('AppointmentSlot Response:', response);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                // navigation.navigate('PickupAppointmentSlot');
                // navigation.navigate('CheckoutDetails') new page adding
                if (isComefromBookAppointment) {
                    navigation.navigate('AgriOrderSuccess')
                }
                else {
                    navigation.navigate('CheckoutDetails')
                }
                ToastService.showSuccess('Success!', response.data.message || 'Slot Booked successfully.')
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from AppointmentSlot call:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
            } else {
                ToastService.showError('Error!', error.message || "An error occurred. Please try again later.")
            }
        } finally {
            hideLoader();
        }
    }

    // Payment Section

    const handleCheckout = () => {
        handlePayment()
    }

    const handlePayment = () => {
        console.log("Cliked")
        var options = {
            description: 'Payment for Order #1234',
            currency: 'INR',
            key: razorpay_id,
            amount: Math.round(Number(amount) * 100),

            name: 'SETU',
            order_id: '',
            prefill: {
                email: '',
                contact: '',
                name: '',
            },
            theme: { color: '#3399cc' },
            method: {
                netbanking: true,
                card: true,
                upi: true,
                wallet: true,
            },
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                // Payment successful
                console.log('Payment Success:', data);
                setRazID(data?.razorpay_payment_id);
                CallVerifyPayment(data?.razorpay_payment_id);
            })
            .catch((error) => {
                navigation.navigate('OrderFailure')
                ToastService.showError('Error!', "Payment failed. Please try again.");
                console.log('Error', `Payment failed: ${error}`);
            });
    };

    const CallVerifyPayment = async (paymentID) => {
        // if (!paymentID) {
        //   console.log("Payment verification failed");
        //   navigation.navigate('OrderFailure');
        //   return;
        // }
        setLoadingMessage("Verifying payment...");
        showLoader();

        try {
            const dataa = {
                "user_id": userID,
                "payment_id": paymentID,
                // "order_id": orderplaceData?.orderId,
            };
            const response = await VerifyPayment(dataa);
            console.log('CallVerifyPayment Response:', response);

            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {

                // loading Message for Placing Order 
                setLoadingMessage("Placing order...");
                AppointmentSlot();
            } else {
                navigation.navigate('OrderFailure');
                hideLoader();
                // ToastService.showError('Error!', response.data.message || "Payment verification failed!");
                setLoadingMessage("");
            }
        } catch (error) {
            console.log('Error from CallVerifyPayment:', error.response ? error.response.data : error.message);
            ToastService.showError('Error!', error.response ? error.response.data : error.message);
            setLoadingMessage("");
        } finally {
            hideLoader();
        }
    };



    return (
        <View style={styles.container}>
            <Loader />
            <View style={styles.textContainer}>
                <Text style={styles.label}>Sample Collection Slot: </Text>
                <Text style={styles.slot}>{selectedDate} {`${time ? ',' : ''}`} {time}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress=
                {
                    () => {
                        if (userID && userID != null) {
                            if (isComefromBookAppointment) {
                                handleCheckout();
                            }
                            else {
                                if (CheckValidation()) {
                                    AppointmentSlot();
                                }
                                else {
                                    ToastService.showError('Error!', "Validation failed. Please check your inputs.");
                                }

                            }

                        }
                        // navigation.navigate('CheckoutDetails')
                    }
                }>
                <Text style={styles.buttonText}>{isComefromBookAppointment ? 'Pay now ₹300' : 'Continue'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 12,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 50
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    slot: {
        fontSize: 16,
        color: "#007AFF", // Blue color for the date and time
    },
    button: {
        backgroundColor: "#0A4DA2", // Blue button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AgroSampleCollectionSlot;