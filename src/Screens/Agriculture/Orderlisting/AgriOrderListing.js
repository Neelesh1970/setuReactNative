import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CartHeader from "../Cart/CartHeader";
import ToastService from "../../../Utils/ToastService";
import { getItem } from "../../../Utils/utils";
import { hideLoader, showLoader } from "../../../Utils/Loader";
import { callOrderList } from "../../../Utils/api/Agriculture";

const BookingOrderList = ({ item }) => {
  const orderDate = new Date(item.created_at).toLocaleDateString();
  const orderTime = new Date(item.created_at).toLocaleTimeString();

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.fertiliser_name}</Text>
          <Text style={styles.info}>
            <FontAwesome name="hashtag" size={14} /> Order Item ID: {" "}
            <Text style={styles.boldText}>{item.order_item_id}</Text>
          </Text>
          <Text style={styles.orderInfo}>
            <FontAwesome name="money" size={14} /> Price: {" "}
            <Text style={styles.boldText}>₹{item.price}</Text>
          </Text>
          <Text style={styles.orderInfo}>
            <FontAwesome name="shopping-cart" size={14} /> Quantity: {" "}
            <Text style={styles.boldText}>{item.quantity}</Text>
          </Text>
          <Text style={styles.orderInfo}>
            <FontAwesome name="calendar" size={14} /> Date: {" "}
            <Text style={styles.boldText}>{orderDate}</Text>
          </Text>
          <Text style={styles.orderInfo}>
            <FontAwesome name="clock-o" size={14} /> Time: {" "}
            <Text style={styles.boldText}>{orderTime}</Text>
          </Text>
          <Text style={[styles.status, { color: item.status === 'pending' ? 'orange' : 'green' }]}>Status: {item.status}</Text>
        </View>
      </View>
    </Card>
  );
};

const ConsultListing = ({ item }) => (
  <Card style={styles.card}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.orderInfo}>
        <FontAwesome name="money" size={14} /> Price: {" "}
        <Text style={styles.boldText}>₹{item.price}</Text>
      </Text>
      <Text style={styles.orderInfo}>
        <FontAwesome name="calendar" size={14} /> Date: {" "}
        <Text style={styles.boldText}>{new Date(item.date).toLocaleDateString()}</Text>
      </Text>
      <Text style={styles.orderInfo}>
        <FontAwesome name="clock-o" size={14} /> Time: {" "}
        <Text style={styles.boldText}>{item.time}</Text>
      </Text>
      <Text style={[styles.status, { color: 'green' }]}>Status: {item.status}</Text>
    </View>
  </Card>
);


const AgriAppointmentsList = () => {
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [userID, setUserID] = useState(null);

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
    if (userID) {
      callOrderListing();
    }
  }, [userID]);

  const callOrderListing = async () => {
    showLoader();
    try {
      const response = await callOrderList({ user_id: userID });
      if (response && response.status >= 200 && response.status < 300 && !response?.data?.hasError) {
        const data = response.data.data;
        setOrders(data.filter(item => item.order_item_id));
        setConsultations(data.filter(item => item.name));
      } else {
        ToastService.showError("Error!", response.data.message || "Something Went Wrong");
      }
    } catch (error) {
      ToastService.showError("Error!", "An error occurred. Please try again later.");
    } finally {
      hideLoader();
    }
  };

  return (
    // <ScrollView style={styles.screen}>
    //   <CartHeader name="Order List" showCart={true} />
    //   {orders.map((item) => (
    //     <BookingOrderList key={item.order_item_id} item={item} />
    //   ))}
    //   {consultations.map((item) => (
    //     <ConsultListing key={item.name + item.date} item={item} />
    //   ))}
    // </ScrollView>
    <ScrollView style={styles.screen}>
    <CartHeader name="Order List" showCart={true} />

    {orders.length === 0 && consultations.length === 0 ? (
      <View style={styles.noOrderContainer}>
        <Text style={styles.noOrderText}>No Orders Found</Text>
      </View>
    ) : (
      <>
        {orders.map((item) => (
          <BookingOrderList key={item.order_item_id} item={item} />
        ))}
        {consultations.map((item) => (
          <ConsultListing key={item.name + item.date} item={item} />
        ))}
      </>
    )}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10, 
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 10
  },
  info: {
    fontSize: 14,
    marginVertical: 2,
  },
  orderInfo: {
    fontSize: 14,
    marginVertical: 2,
  },
  boldText: {
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "blue",
  },
  noOrderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  noOrderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});

export default AgriAppointmentsList;