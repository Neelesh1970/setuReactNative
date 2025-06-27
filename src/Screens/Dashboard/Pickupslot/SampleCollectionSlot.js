import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import ToastService from "../../../Utils/ToastService";
import { AppointmentSlotApi } from "../../../Utils/api/bookTest";
import Toast from "react-native-toast-message";
import { getItem } from "../../../Utils/utils";


const SampleCollectionSlot = () => {
  const navigation = useNavigation();
  const selectedTimee = useSelector((state) => state.bookTest.selectedSlotData);
  const selectedDate = useSelector((state) => state.bookTest.selectedDate);
  const slotAddressID = useSelector((state) => state.bookTest.slotAddressID);
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
    if (!slotAddressID || !selectedDate || !selectedTimee) {
      ToastService.showError('Error!', "Please select date and slot to proceed!")
      return;
    }
    showLoader();
    const data = {
      "addressId": slotAddressID , // slotAddressID,
      "date": selectedDate,
      "time": selectedTimee,
      'user_id': userID
    }
    try {
      const response = await AppointmentSlotApi(data);
      console.log('AppointmentSlot Response:', data);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // navigation.navigate('PickupAppointmentSlot');
        navigation.navigate('CheckoutDetails')
        ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
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



  return (
    <View style={styles.container}>
      <Loader />
      <View style={styles.textContainer}>
        <Text style={styles.label}>Sample Collection Slot: </Text>
        <Text style={styles.slot}>{selectedDate} {`${selectedTimee ? ',' : ''}`} {selectedTimee}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress=
        {
          () => {
            if (userID && userID != null) {
              AppointmentSlot()
            }
            // navigation.navigate('CheckoutDetails')
          }
        }>
        <Text style={styles.buttonText}>Continue</Text>
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

export default SampleCollectionSlot;
