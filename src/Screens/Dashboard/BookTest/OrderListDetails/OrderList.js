import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CartHeader from "../Cart/CartHeader";
import { ms } from "react-native-size-matters";
import { getItem } from "../../../../Utils/utils";
import Loader, { hideLoader, showLoader } from "../../../../Utils/Loader";
import ToastService from "../../../../Utils/ToastService";
import { OrderListing } from "../../../../Utils/api/bookTest";
import { useNavigation } from '@react-navigation/native';


const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const BookingOrderList = ({ item, index }) => {
  const orderDate = new Date(item.created_at).toLocaleDateString();
  const orderTime = formatTime(item.created_at);

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftStripe}></View>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.bookingpkgname}>
              {item.name}
            </Text>
            <Text style={styles.bookingIdText}>
              Order ID: {item.order_id}
            </Text>
          </View>

          <View style={styles.detailsContainer}>

            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Date:</Text>
              <Text style={styles.valueText}>{orderDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Time:</Text>
              <Text style={styles.valueText}>{orderTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Fees:</Text>
              <Text style={styles.valueText}>₹{item.price}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Quantity:</Text>
              <Text style={styles.valueText}>{item.quantity}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Status:</Text>
              <Text style={[
                styles.statusText,
                {
                  color: item.status.toLowerCase() === "placed"
                    ? "green"
                    : item.status.toLowerCase() === "pending"
                      ? "#FFA500"
                      : "black"
                }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const AppointmentsList = () => {
  const [orders, setOrders] = useState([]);
  const [userID, setUserID] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem("userID");
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    console.log("User ID: ", userID)
    if (userID) {
      showLoader();
      callOrderListing();
    }
  }, [userID]);

  const callOrderListing = async () => {
    showLoader();
    try {
      const response = await OrderListing({ user_id: userID });
      console.log("callOrderListing Response:", response);
      if (response && response.status >= 200 && response.status < 300 && !response?.data?.hasError) {
        setOrders(response.data.data);
      } else {
        ToastService.showError("Error!", response.data.message || "Something Went Wrong");
      }
    } catch (error) {
      console.log("Error from callOrderListing call:", error.response ? error.response.data : error.message);
      ToastService.showError("Error!", "An error occurred. Please try again later.");
    } finally {
      hideLoader();
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Loader />
      <CartHeader name="My Bookings" showCart={true} />
      <Text style={styles.mybooking}>My Bookings</Text>

      {orders.length === 0 ? (
        <View style={styles.noOrderContainer}>
          <Text style={styles.noOrderText}>No Order Founds</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BookTestScreen")}
            style={styles.backButton}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        orders.map((item, index) => (
          <BookingOrderList key={item.order_id + (item.product_code || '')} item={item} index={index} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
  },
  leftStripe: {
    width: 7,
    backgroundColor: '#1976D2',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    marginBottom: 10,
  },
  bookingIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  bookingpkgname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  labelText: {
    flex: 2,
    fontSize: 14,
    color: '#666',
  },
  valueText: {
    flex: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    flex: 5,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noOrderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  noOrderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginTop: 30,
  },
  mybooking: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    margin: 15,
    textAlign: 'center',
  }
});

export default AppointmentsList;