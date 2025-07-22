import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import { setOrderPlaceData } from "../../../features/booktest/booktestSlice";
import ToastService from "../../../Utils/ToastService";
import { OrderCheckout, VerifyPayment } from "../../../Utils/api/bookTest";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../../Utils/utils";
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env';
import { agroOrderplace } from "../../../Utils/api/Agriculture";


const SampleCollectionSlot = ({ data, hardCopyChecked, dietConsultChecked, paymentMethod }) => {
  const orderplaceData = useSelector((state) => state.bookTest.orderplaceData);
  const activeModule = useSelector((state) => state.auth.activeModule);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [userID, setUserID] = useState(null);
  const razorpay_id = RAZORPAY_KEY_ID;
  const razorpay_secret = RAZORPAY_KEY_SECRET;
  const [razID, setRazID] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("");
  const amount = data;

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);


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
        OrderPlace();
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







  const handleCheckout = () => {

    handlePayment()


    // if (userID) {
    //   OrderPlace()
    // }
  }



  const OrderPlace = async () => {
    setLoadingMessage("Placing order...");
    showLoader();
    try {
      const dataa = {
        "hardcopySelected": hardCopyChecked,
        "dietConsultationSelected": dietConsultChecked,
        'user_id': userID,
      }

      const dataa2 = {
        'userId': userID,
      }
      let response;
      if (activeModule === 'agri') {
        console.log('agri called');
        response = await agroOrderplace(dataa2);
      } else {
        response = await OrderCheckout(dataa);
      }
      console.log('OrderPlace Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(setOrderPlaceData({ data: response?.data }))
        // handlePayment()
        navigation.navigate('OrderSuccess')
        // ToastService.showSuccess('Success!', response.data.message || 'Order Successful!.')
      } else {
        navigation.navigate('OrderFailure')
        // ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      navigation.navigate('OrderFailure')
      console.log('Error from OrderPlace call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
      setLoadingMessage("");
    }
  }
  return (
    <View style={styles.container}>
      <Loader />
      <View style={styles.textContainer}>
        <Text style={styles.label}>₹{data}</Text>
        {/* <Text style={styles.slot}>View Bill Summary</Text> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  slot: {
    fontSize: 16,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#0A4DA2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Loader Style 
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
  },
  loaderText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});

export default SampleCollectionSlot;
