import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icons } from "../../assets/icons/Icons";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import { API_URL_AUTH } from "@env";
import { getItem, getToken } from "../../Utils/utils";
import Error from "../Error/Error";
const { width, height } = Dimensions.get("window");
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@env";
import ToastService from "../../Utils/ToastService";
import { ms, s, vs } from "react-native-size-matters";

export default function DoctorReview({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctor, review } = route.params;
  const [check, setCheck] = useState(false);
  const [terms, setTerms] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const razorpay_id = RAZORPAY_KEY_ID;

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getItem("userID");
      const tokenData = await getToken();
      setToken(tokenData);
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DoctorAppointment", { doctor });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const userResponse = await axios.get(
        `${API_URL_AUTH}/auth/user/${userId}`
      );

      setUserData(userResponse?.data);

      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleCall = () => {
    Linking.openURL("tel:9764799870");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1C57A5" />
      </View>
    );
  }

  if (error) {
    return <Error />;
  }

  const formatDate = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatAppointmentDate = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatUserDob = (dob) => {
    if (!dob) return "";

    const date = new Date(dob);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return String(age);
  };

  const handlePayment = async (payment_id) => {
    const requestBody = {
      appointmentReason: "",
      appointmentService: "1",
      appointmentDate: formatAppointmentDate(review?.selectedDate),
      appointmentTime: review?.timeSlot,
      appointmentAmount: doctor?.doctorRate || 50,
      isCheckConsent1: terms,
      isCheckConsent2: check,
      ehsUserId: userData?.user_id,
      appointmentUserId: {
        userFirstname: userData?.first_name,
        userLastname: userData?.last_name,
        userDob: formatUserDob(userData?.dob),
        userAge: calculateAge(userData?.dob),
        userEmail: userData?.email,
        userMobile: userData?.phone_number,
        userArea: "Pune",
        userAddress: "Pune",
        userPincode: 412308,
      },
      appointmentUnitId: 1,
      userCityId: 41391,
      userNationalityId: 1,
      userGenderId: 1,
      insuranceCoveredAppointment: true,
      staffId: doctor?.staff_id,
      isVartualConsultation: true,
    };

    try {
      const response = await fetch(
        `${API_URL_AUTH}/telemedicine/api/v1/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Appointment Created Successfully:", responseData);

      processPayment(responseData, payment_id);
    } catch (error) {
      console.error("Appointment Error:", error);
      setError(error);
      setLoading(false);
      navigation.navigate("MyAppointment", { bookingStatus: "failed" });
    }
  };

  const verifyPayment = async (payment_id) => {
    try {
      const response = await axios.post(
        `${API_URL_AUTH}/pay/verifyPayment`,
        {
          user_id: userData?.user_id,
          payment_id: payment_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      ToastService.showSuccess("Payment Successfull");
      console.log("API Response:", response.data);
      handlePayment(payment_id);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  const processPayment = async (appointmentData, payment_id) => {
    const { data } = appointmentData;

    const appointmentDate = data?.appointmentDate;
    let formattedAppointmentDate;

    if (appointmentDate && !isNaN(appointmentDate)) {
      const date = new Date(Number(appointmentDate));
      if (!isNaN(date.getTime())) {
        formattedAppointmentDate = date.toISOString();
      } else {
        console.warn("Invalid appointmentDate:", appointmentDate);
        formattedAppointmentDate = new Date().toISOString();
      }
    } else {
      console.warn("Invalid or missing appointmentDate:", appointmentDate);
      formattedAppointmentDate = new Date().toISOString();
    }

    const appointmentBody = {
      userId: String(userData?.user_id),
      patientId: String(data?.patientId),
      doctorId: String(doctor?.staff_id),
      appointmentId: String(data?.appointmentId),
      meetingId: String(data?.meetingId),
      appointmentSlot: data?.appointmentSlot,
      appointmentDate: formattedAppointmentDate,
      transactionId: payment_id,
      appointmentFees: data.appointmentAmount || 500,
      status: "pending",
    };

    try {
      const paymentResponse = await fetch(
        `${API_URL_AUTH}/telemedicine/api/v1/telemedappointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentBody),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error(`Payment Error! Status: ${paymentResponse.status}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log("Payment Success:", paymentResult);

      setLoading(false);
      navigation.navigate("MyAppointment", { bookingStatus: "success" });
    } catch (error) {
      console.error("Payment Processing Error:", error);
      setError(error);
      setLoading(false);
      navigation.navigate("MyAppointment", { bookingStatus: "failed" });
    }
  };

  const handleRazorPay = () => {
    setLoading(true);
    var options = {
      description: "Doctor Payment",
      currency: "INR",
      key: razorpay_id,
      amount: doctor?.doctorRate * 100 || 500 * 100,
      name: "SETU",
      order_id: "",
      prefill: {
        email: "",
        contact: "",
        name: "",
      },
      theme: { color: "#3399cc" },
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
        console.log("Payment Success:", data);
        // setRazID(data?.razorpay_payment_id);
        // CallVerifyPayment(data?.razorpay_payment_id);

        // handlePayment();
        verifyPayment(data?.razorpay_payment_id);
      })
      .catch((error) => {
        navigation.navigate("DoctorPaymentFailure");
        ToastService.showError("Error!", "Payment failed. Please try again.");
        console.log("Error", `Payment failed: ${error}`);
        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* header section */}
      <View style={styles.cardHeader}>
        <Image source={Icons.doctor_lady} style={styles.cardImage} />
        <View style={styles.headerMid}>
          <Text
            style={styles.doctorName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {doctor?.name}
          </Text>
          <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
            {doctor?.sname}
          </Text>
          <Text style={styles.subText} numberOfLines={2} ellipsizeMode="tail">
            {doctor?.education || "MBBS"}
          </Text>
          <View style={styles.headerFooter}>
            {/* <Text style={styles.experienceText}>{doctor?.experience}</Text> */}
            <Text style={styles.ratingText}>
              {doctor?.rating || "70"} % positive ratings
            </Text>
          </View>
          <View style={styles.headerFooter2}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={s(13)} color="#555" />
              <Text style={styles.locationText}>{doctor?.city_name}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.separator}></View>

      {/* appointment details section*/}
      <View style={styles.appointmentDetailBody}>
        <Text style={styles.appointmentDetailText}>Appointment Details</Text>
        {/* user name row */}
        <View style={styles.detailRow}>
          <Ionicons
            name="person"
            size={s(23)}
            color="#555"
            style={styles.rowIcon}
          />
          <View>
            <Text style={styles.mainText}>
              {userData?.first_name} {userData?.last_name}
            </Text>
            <Text style={styles.subText}>
              {" "}
              {userData?.gender} {calculateAge(userData?.dob)}
            </Text>
          </View>
        </View>

        {/* Appointment date row */}
        <View style={styles.detailRow}>
          <MaterialIcons
            name="calendar-month"
            size={s(23)}
            color="#555"
            style={styles.rowIcon}
          />
          <View>
            <Text style={styles.mainText}>{review?.timeSlot}</Text>
            <Text style={styles.subText}>{review?.selectedDate}</Text>
          </View>
        </View>

        <View style={styles.separator2}></View>
        <Text style={styles.headerText}>Payment Details</Text>
        <View style={styles.paymentBody}>
          <Text style={styles.paymentText}>Doctor Consultation</Text>
          <Text style={styles.paymentText}>
            {" "}
            {/* {doctor?.doctorRate} {doctor?.currencyName} */}₹
            {doctor?.doctorRate || 500}
          </Text>
        </View>
        <View style={styles.paymentBody2}>
          <Text style={styles.paymentText}>Total to Pay</Text>
          <Text style={styles.paymentText}>
            {" "}
            {/* {doctor?.doctorRate} {doctor?.currencyName} */}
            {doctor?.doctorRate || 500}
          </Text>
        </View>
      </View>

      <View style={styles.separator3}></View>

      {/* help section*/}
      <View style={styles.helpBody}>
        <Text style={styles.headerText}>
          Want more help? Talk to our agents
        </Text>

        {/* help call box */}
        <View style={styles.helpCallBox}>
          <View style={styles.callBody}>
            <Ionicons name="call-outline" color="#fff" size={s(23)} />
          </View>
          <View style={styles.callMid}>
            <Text style={styles.headerText}>Request to Call Back</Text>
            <Text style={styles.subText}>Connect with our experts on call</Text>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callBTNText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* safety measure box */}
        <View style={styles.footerBox}>
          {/* Terms & Conditions Checkbox */}
          <View style={styles.checkBoxBody}>
            <Checkbox
              status={terms ? "checked" : "unchecked"}
              onPress={() => setTerms(!terms)}
              color="#2372B5"
            />
            <Text style={styles.footerText}>I agree to FinServ Health's</Text>
            <TouchableOpacity>
              <Text style={styles.termsText}> T&C</Text>
            </TouchableOpacity>
          </View>

          {/* Get Updates Checkbox */}
          <View style={styles.checkBoxBody}>
            <Checkbox
              status={check ? "checked" : "unchecked"}
              onPress={() => setCheck(!check)}
              color="#2372B5"
            />
            <Text style={styles.termsText}>
              Get Updates/Information on WhatsApp/SMS
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              { backgroundColor: terms ? "#1C57A5" : "#999" },
            ]}
            disabled={!terms}
            onPress={handleRazorPay}
          >
            <Text style={styles.paymentButtonText}>
              {/* Pay {doctor?.doctorRate} {doctor?.currencyName} */}
              Pay ₹ {doctor?.doctorRate || 500}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    paddingBottom: vs(50),
  },
  cardHeader: {
    flexDirection: "row",
    paddingHorizontal: s(18),
    marginVertical: vs(18),
    alignItems: "flex-start",
  },
  cardImage: {
    height: ms(90),
    width: ms(90),
  },
  headerMid: {
    flex: 1,
    paddingHorizontal: s(9),
  },
  doctorName: {
    fontWeight: "bold",
    fontSize: s(12),
  },
  subText: {
    fontSize: s(10.5),
  },
  headerFooter: {
    flexDirection: "row",
    gap: s(9),
  },

  experienceText: {
    fontWeight: 700,
    fontSize: s(10.5),
  },
  ratingText: {
    color: "#086608",
    fontSize: s(10.5),
    fontWeight: 700,
  },
  headerFooter2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: "#555",
    fontSize: s(10.5),
    fontWeight: "bold",
  },
  separator: {
    height: vs(5),
    width: "100%",
    backgroundColor: "#cee8fe",
  },
  appointmentDetailBody: {
    paddingHorizontal: s(20),
  },
  appointmentDetailText: {
    marginTop: vs(20),
    fontWeight: "bold",
    fontSize: s(12),
  },
  detailRow: {
    flexDirection: "row",
    gap: s(9),
    marginVertical: vs(9),
    alignItems: "flex-start",
  },
  rowIcon: {
    marginTop: vs(5),
  },
  mainText: {
    fontWeight: "bold",
    fontSize: s(12),
  },
  separator2: {
    height: vs(2),
    width: "100%",
    backgroundColor: "#cee8fe",
    marginVertical: vs(9),
  },
  paymentBody: {
    borderBottomWidth: width <= 400 ? 1 : 2,
    paddingBottom: vs(9),
    borderColor: "#7d7d7d",
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: vs(5),
  },
  paymentText: {
    fontWeight: width <= 400 ? 500 : "bold",
    fontSize: s(10),
  },
  paymentBody2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: s(9),
  },
  separator3: {
    height: vs(2),
    width: "100%",
    backgroundColor: "#9c9c9c",
    marginTop: vs(9),
  },
  helpBody: {
    paddingHorizontal: s(20),
    marginTop: vs(20),
  },
  helpCallBox: {
    paddingHorizontal: s(8),
    paddingVertical: vs(18),
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 8,
    marginTop: vs(9),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(8),
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: s(12),
  },
  callBody: {
    backgroundColor: "#2372B5",
    padding: ms(5),
    borderRadius: 50,
  },
  callMid: {
    flex: 1,
  },
  callButton: {
    paddingVertical: vs(9),
    paddingHorizontal: s(18),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2372B5",
  },
  callBTNText: {
    fontSize: s(10),
    color: "#2372B5",
    fontWeight: "bold",
  },
  footerBox: {
    paddingVertical: vs(20),
  },
  footerText: {
    fontSize: s(10.5),
    fontWeight: "bold",
  },
  termsText: {
    fontSize: s(10.5),
    color: "#2372B5",
    fontWeight: "bold",
  },
  checkBoxBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: vs(9),
    borderRadius: 10,
    marginVertical: vs(9),
  },
  paymentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(13),
  },
});
