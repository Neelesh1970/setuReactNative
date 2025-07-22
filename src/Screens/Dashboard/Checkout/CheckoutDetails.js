import React, { useEffect, useMemo, useState } from "react";
import { View, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from "react-native";
import CheckoutHeader from "./CheckoutHeader";
import AddOns from "./AddOns";
import BillDetails from "./BillDetails";
import SavingsScreen from "./SavingScreen";
import NeedAssistance from "./NeedAssistance";
import PaymentOptions from "./PaymentOptions";
import SampleCollectionSlot from "./SampleCollectionSlot";
import CartHeader from "../BookTest/Cart/CartHeader";
import { Provider as PaperProvider } from 'react-native-paper';
import { ScrollView } from "react-native";
import { ms } from "react-native-size-matters";
import { CheckoutDetailsAPI } from "../../../Utils/api/bookTest";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import ToastService from "../../../Utils/ToastService";
import { useDispatch, useSelector } from "react-redux";
import { setcheckoutDetails } from "../../../features/booktest/booktestSlice";
import { getItem } from "../../../Utils/utils";
import { agrocheckoutDetailsApi, checkoutDetailsApi } from "../../../Utils/api/Agriculture";

const CheckoutDetails = ({ navigation }) => {
    const [hardCopyChecked, setHardCopyChecked] = useState(false)
    const [dietConsultChecked, setDietConsultChecked] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(false)
    const activeModule = useSelector((state) => state.auth.activeModule);


    const dispatch = useDispatch()
    const CheckoutDetailsData = useSelector((state) => state.bookTest.checkoutDetails);

    console.log('CheckoutDetailsData', CheckoutDetailsData);
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

    useEffect(() => {
        console.log('hardCopyChecked', hardCopyChecked);
        console.log('dietConsultChecked', dietConsultChecked);

    }, [hardCopyChecked, dietConsultChecked])

    const fetchCheckoutDetails = async () => {
        showLoader();
        const data = {
            'user_id': userID
        }
        console.log('fetchCheckoutDetails data:', data);
        let response;
        try {
            if (activeModule === 'agri') {
                response = await agrocheckoutDetailsApi(data);
            } else {
                response = await CheckoutDetailsAPI(data);
            }
            console.log('fetchCheckoutDetails Response:', response);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                // navigation.navigate('PickupAppointmentSlot');
                dispatch(setcheckoutDetails({ data: response.data.response }))
                navigation.navigate('CheckoutDetails')
                // ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong")
            }
        } catch (error) {
            console.log('Error from fetchCheckoutDetails call:', error.response ? error.response.data : error.message);
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
            fetchCheckoutDetails()
        }
    }, [userID])

    const handleIshardcoyChecked = (data) => {
        console.log('handleIshardcoyChecked', data)
        setHardCopyChecked(data)
    }

    const handleDietConsultChecked = (data) => {
        console.log('handleDietConsultChecked', data)
        setDietConsultChecked(data)
    }

    const handlepaymentType = (data) => {
        console.log('handlepaymentType', data)
        setPaymentMethod(data)
    }
    const calculateTotalAmount = useMemo(() => {
        const balanceAmount = Number(CheckoutDetailsData?.billDetails?.balanceAmount) || 0 || Number(CheckoutDetailsData?.billDetails?.orderAmount);
        const dietConsultation = dietConsultChecked ? Number(CheckoutDetailsData?.billDetails?.dietConsultation) || 0 : 0;
        const hardcopyAmount = hardCopyChecked ? Number(CheckoutDetailsData?.addOns?.hardcopyAmount) || 0 : 0;
    
        return balanceAmount + dietConsultation + hardcopyAmount;
    }, [hardCopyChecked, dietConsultChecked, CheckoutDetailsData]);
     

    console.log('calculateTotalAmount', calculateTotalAmount)
    return (
        <PaperProvider>
            <ScrollView>
                <CartHeader name="Checkout" />
                <Loader />
                <View style={styles.container}>
                    {
                        activeModule === 'booktest' && <>
                            <Text style={styles.title}>Add Ons</Text>
                            <AddOns price={CheckoutDetailsData?.addOns?.hardcopyAmount || 0} text={"Get a hard copy"} handleIshardcoyChecked={handleIshardcoyChecked} />
                            <AddOns price={CheckoutDetailsData?.addOns?.dietConsultationAmount || 0} CheckoutDetailsData={CheckoutDetailsData} style={styles.marginTopp} text={`Need a diet consultation @Rs.${CheckoutDetailsData?.billDetails?.dietConsultation}`} text2={"Dietitian will call you post report generation"} handleDietConsultChecked={handleDietConsultChecked} />
                            <Text style={styles.title}>Bill Details</Text></>
                    }

                    <BillDetails data={CheckoutDetailsData?.billDetails} hardCopyChecked={hardCopyChecked} dietConsultChecked={dietConsultChecked} hardcopyAmount={CheckoutDetailsData?.addOns?.hardcopyAmount}/>
                    {/* <NeedAssistance /> */}
                    <Text style={styles.title}>Select Payment Mode</Text>
                    <PaymentOptions handlepaymentType={handlepaymentType} />
                    <SampleCollectionSlot paymentMethod={paymentMethod} hardCopyChecked={hardCopyChecked} dietConsultChecked={dietConsultChecked} data={calculateTotalAmount} />
                </View>
            </ScrollView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: ms(10),
        marginBottom: ms(10)
    },
    marginTopp: {
        marginTop: 10,
    }
})

export default CheckoutDetails;
