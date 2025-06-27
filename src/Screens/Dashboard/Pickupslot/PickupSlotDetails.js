import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import SelectedAddress from "./SelectedAddress";
import AvailableDates from "./AvailableDates";
import SampleCollectionSlot from "./SampleCollectionSlot";
import CartHeader from "../BookTest/Cart/CartHeader";
import NeedAssistance from "../Checkout/NeedAssistance";
import { AvailableTimeSlot, SlotDetails } from "../../../Utils/api/bookTest";
import { availableTimeDataSuccess, slotDetails } from "../../../features/booktest/booktestSlice";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../../Utils/ToastService";
import BottomBar from "../BookTest/BottomBar";
import { getItem } from "../../../Utils/utils";
import { useNavigation } from "@react-navigation/native";
import AvailableTimeSlots from "./AvailableTimeSlot";
import NeedAssistanceBooktest from "../Checkout/NeedAssistanceBooktest";


const PickupSlotDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
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


    const availableTime = useSelector((state) => state.bookTest.availableTimeData);
    const selectedDate = useSelector((state) => state.bookTest.selectedDate);
    const slotDetailsDataa = useSelector((state) => state.bookTest.slotDetailsData);
    const pincode = useSelector((state) => state.bookTest.slotDetailspincode);


    console.log('selectedDate', selectedDate)
    console.log('availableTime', availableTime)
    console.log('slotDetailsDataa', slotDetailsDataa)
    console.log('pincode', pincode)

    // addressId:''
    // date:''
    // time: 


    const fetchAvailableTime = async () => {
        showLoader();
        const data = {
            "Pincode": pincode,
            "Date": selectedDate,
            // 'user_id': userID
        }
        try {
            const response = await AvailableTimeSlot(data);
            console.log('fetchAvailableTime Response:', response);

            if (response && (response.status === 200 || response.status === 201)) {
                dispatch(availableTimeDataSuccess({ data: response.data }));
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from availableTimeApi call:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', error.response.data.message)
            } else {
                ToastService.showError('Error!', "An error occurred. Please try again later.")
            }
        } finally {
            hideLoader();
        }
    }


    const SlotDetailsAPI = async () => {
        showLoader();
        try {
            const input = {
                'user_id': userID
            }
            const response = await SlotDetails(input);
            console.log('SlotDetails Response:', response);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                // navigation.navigate('PickupSlotDetails');
                // ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
                dispatch(slotDetails({ data: response.data.data }));
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from SlotDetails call:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            } else {
                ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
            }
        } finally {
            hideLoader();
        }
    }

    useEffect(() => {
        if (userID && userID != null) {
            SlotDetailsAPI()
        }
    }, [userID])

    useEffect(() => {
        if (selectedDate && pincode) {
            fetchAvailableTime()
        }
    }, [selectedDate, pincode, userID]);


    return (
        <ScrollView >
            <CartHeader name={'Sample Pickup Slot Details'} />
            <Loader />
            <View style={styles.container}>
                <Text style={styles.label}>Selected Address</Text>
                <SelectedAddress slotDetailsDataa={slotDetailsDataa} />

                <Text style={styles.label}>Available Dates</Text>
                <AvailableDates />

                <Text style={styles.label}>Available Slots</Text>
                <AvailableTimeSlots availableTime={availableTime} />


                <NeedAssistanceBooktest />
                <SampleCollectionSlot />
                {/* <BottomBar /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 15,
        marginTop: -15,
        height: '100%'
    },
    label: {
        fontSize: 16,
        paddingVertical: 20,
        fontWeight: 'bold'
    },
})

export default PickupSlotDetails;
