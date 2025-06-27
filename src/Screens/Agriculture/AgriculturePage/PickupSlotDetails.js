import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../../Utils/utils";
import { useNavigation } from "@react-navigation/native";
import AvailableDates from "../../Dashboard/Pickupslot/AvailableDates";
import CartHeader from "../../Dashboard/BookTest/Cart/CartHeader";
import SelectedAddress from "../../Dashboard/Pickupslot/SelectedAddress";
import NeedAssistance from "../../Dashboard/Checkout/NeedAssistance";
import { Picker } from '@react-native-picker/picker';
import AgroSampleCollectionSlot from "../AgroSampleCollectionSlot";
import ToastService from "../../../Utils/ToastService";
import { slotDetails } from "../../../features/booktest/booktestSlice";
import { SlotDetails } from "../../../Utils/api/bookTest";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import CustomTextInput from "../../../Components/CustomTextInput";
import { t } from "i18next";
import { color } from "../../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { validateEmail, validatePhoneNumber, validateTextField } from "../../../Utils/utils";
import AgroAvailableTimeSlots from "../../Dashboard/Pickupslot/AgroAvailableTimeSlot";



const AgroScreenSlotDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userID, setUserID] = useState(null);
    const scrollRef = useRef(null);
    const slotDetailsDataa = useSelector((state) => state.bookTest.slotDetailsData);
    const isComefromBookAppointment = useSelector((state) => state.agriculture.isComefromBookAppointment);

    console.log("isComefromBookAppointment :", isComefromBookAppointment)


    useEffect(() => {
        const fetchUserID = async () => {
            const id = await getItem('userID');
            if (id) {
                setUserID(id);
            }
        };
        fetchUserID();
    }, []);

    const SlotDetailsAPI = async () => {
        showLoader();
        try {
            const input = {
                'user_id': userID,
            }
            const response = await SlotDetails(input);
            if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
                dispatch(slotDetails({ data: response.data.data }));
            } else {
                ToastService.showError('Error!', response.data.message || "Something Went Wrong");
            }
        } catch (error) {
            ToastService.showError('Error!', error.message || "An error occurred. Please try again later.");
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        if (userID && userID != null) {
            SlotDetailsAPI();
        }
    }, [userID]);

    const [selectedTimee, setSelectedTimee] = useState('12:00');
    const [selectedPeriod, setSelectedPeriod] = useState('AM');

    // const time = useMemo(() => selectedTime + ' ' + selectedPeriod, [selectedTime, selectedPeriod]);

    const times = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];
    const periods = ['AM', 'PM'];



    // Add Details field
    const [FirstName, setFirstName] = useState();
    const [Phonenumber, setPhonenumber] = useState();
    const [Email, setEmail] = useState();


    // error field
    const [eFirstName, setEFirstName] = useState();
    const [ephonenumber, setEphonenumber] = useState();
    const [eEmail, setEemail] = useState();

    const scrollToInput = (reactNode) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    //     if (CheckValidation()) {
    //         const inpuData = {
    //             FirstName: FirstName,
    //             Phonenumber: Phonenumber,
    //             Email: Email,
    //         };

    //         console.log('inpuData', inpuData);
    //         showLoader();
    //         try {
    //             const response = await signupUser(inpuData);
    //             console.log('signupUser API Response:', response);

    //             if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
    //                 ToastService.showSuccess('Success!', response.data.message || "Registered Successfully!")
    //                 navigation.reset({
    //                     index: 0,
    //                     routes: [{ name: 'Login', hideModal: true }],
    //                 });
    //                 // dispatch(signupSuccess());
    //             } else {
    //                 ToastService.showError('Error!', response.data.message || "Failed to sign up")
    //             }
    //         } catch (error) {
    //             // dispatch(signupFailure(error.message));
    //             console.log('Error from signup API call:', error.response ? error.response.data : error.message);
    //             if (error.response && error.response.data && error.response.data.message) {
    //                 ToastService.showError('Error!', error.response.data.message)
    //             } else {
    //                 ToastService.showError('Error!', "An error occurred. Please try again later.")
    //             }
    //         } finally {
    //             hideLoader();
    //         }
    //     }
    // };


    const CheckValidation = () => {
        // Skip validation
        if (!isComefromBookAppointment) {
        return true;
    }

        var msg = "";
        if (!validateTextField(FirstName)) {
            msg = t("Please Enter Your Name");
            setEFirstName(msg);
            return false

        }
        if (!validatePhoneNumber(Phonenumber)) {
            msg = t("Enter Your Phone Number");
            setEphonenumber(msg);
            return false

        }
        if (!validateEmail(Email)) {
            msg = t("Enter Your Email Address");
            setEemail(msg);
            return false

        }

        return true
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <CartHeader name={'Sample Pickup Slot Details'} />
            <Loader />
            <View style={styles.container}>
                <Text style={styles.label}>Selected Address</Text>
                <SelectedAddress slotDetailsDataa={slotDetailsDataa} />


                {
                    isComefromBookAppointment && (
                    <View style={{ flexDirection: "column", flex: 1 }}>
                        <CustomTextInput
                            label={t("Name")}
                            labelTextColor={color.inputTextLabel}
                            labelStyle={{
                                fontFamily: "bold",
                                fontSize: ms(14),
                                marginBottom: 2,
                            }}
                            fullContainerStyle={{ flex: 1 }}
                            inputStyle={{
                                borderColor: color.colorPrimary,
                            }}
                            item_value={FirstName}
                            item_setValue={setFirstName}
                            errorMessage={eFirstName}
                            setErrorMessage={setEFirstName}
                            onFocus={(event) => {
                                scrollToInput(event.target);
                            }}
                        />

                        <CustomTextInput
                            label={t("Phone Number")}
                            labelTextColor={color.inputTextLabel}
                            // maxLength={10}
                            isPhoneNo={true}
                            labelStyle={{
                                fontFamily: "bold",
                                fontSize: ms(14),
                                marginBottom: 2,
                            }}
                            fullContainerStyle={{ flex: 1 }}
                            inputStyle={{
                                borderColor: color.colorPrimary,
                            }}
                            item_value={Phonenumber}
                            item_setValue={setPhonenumber}
                            errorMessage={ephonenumber}
                            setErrorMessage={setEphonenumber}
                            onFocus={(event) => {
                                scrollToInput(event.target);
                            }}
                        />

                        <CustomTextInput
                            label={t("Email Address")}
                            labelTextColor={color.inputTextLabel}
                            labelStyle={{
                                fontFamily: "bold",
                                fontSize: ms(14),
                                marginBottom: 2,
                            }}
                            fullContainerStyle={{ flex: 1 }}
                            inputStyle={{
                                borderColor: color.colorPrimary,
                            }}
                            item_value={Email}
                            item_setValue={setEmail}
                            errorMessage={eEmail}
                            setErrorMessage={setEemail}
                            onFocus={(event) => {
                                scrollToInput(event.target);
                            }}
                        />
                    </View>
                    )
                }

                <Text style={styles.label}>Select Dates</Text>
                <AvailableDates />

                <Text style={styles.label}>Available Slots</Text>
                {/* <View style={styles.slotContainer}>
                    <Text style={styles.label}>Select Time</Text>
                    <Picker
                        selectedValue={selectedTime}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedTime(itemValue)}
                    >
                        {times.map((time) => (
                            <Picker.Item style={{ backgroundColor: 'white', color: 'black' }} key={time} label={time} value={time} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Select AM/PM</Text>
                    <Picker
                        selectedValue={selectedPeriod}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
                    >
                        {periods.map((period) => (
                            <Picker.Item style={{ backgroundColor: 'white', color: 'black' }} key={period} label={period} value={period} />
                        ))}
                    </Picker>
                </View> */}
                <AgroAvailableTimeSlots setSelectedTimee={setSelectedTimee} />

                <NeedAssistance />
                <AgroSampleCollectionSlot time={selectedTimee} CheckValidation={CheckValidation} FirstName={FirstName} Phonenumber={Phonenumber} Email={Email} isComefromBookAppointment={isComefromBookAppointment} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        paddingHorizontal: 15,
        marginTop: 15,
        flex: 1,
    },
    label: {
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    slotContainer: {
        paddingVertical: 20,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default AgroScreenSlotDetails;
