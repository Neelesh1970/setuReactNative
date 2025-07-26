import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EcartBottomNavBar from './EcartBottomNavbar';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../assets/colors/Colors';
// import BottomNavBar from '../components/BottomNavBar';

const OrderPlacedScreen = () => {
    const navigation = useNavigation();
  const orderItems = [
    {
      id: 1,
      name: 'Cozy Knit Sweater',
      quantity: 1,
      image: require('../../assets/images/e_cart/sweater.png'),
    },
    {
      id: 2,
      name: 'Classic Denim Jeans',
      quantity: 2,
      image: require('../../assets/images/e_cart/jeans.png'),
    },
    {
      id: 3,
      name: 'Leather Ankle Boots',
      quantity: 1,
      image: require('../../assets/images/e_cart/boots.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Placed</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Thank You */}
        <View style={styles.thankYou}>
          <Text style={styles.thankYouHeading}>Thank you for your order!</Text>
          <Text style={styles.thankYouText}>
            Your order has been placed and is on its way.{"\n"}You'll receive a confirmation email shortly.
          </Text>
        </View>

        {/* Order Info */}
        <View style={styles.row}>
          <Text style={styles.label}>Order Number</Text>
          <Text style={styles.value}>#123456789</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estimated Delivery</Text>
          <Text style={styles.value}>July 15, 2024</Text>
        </View>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {orderItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.itemImage} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        ))}

        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>Credit Card</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>$150.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>$10.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>$160.00</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.orderDetailsBtn} onPress={() => navigation.navigate('OrderDetail')}>
          <Text style={styles.btnText}>View Order Details</Text>
        </TouchableOpacity>
      </ScrollView>

      <EcartBottomNavBar activeTab="Home" onTabPress={(tab) => console.log(tab)} />
    </SafeAreaView>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   padding:20,
   backgroundColor:color.bottomViewColor,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  thankYou: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  thankYouHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
    color: '#000',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  itemName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  itemQty: {
    fontSize: 14,
    color: '#4A7BD3',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: '#000',
  },
  value: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  orderDetailsBtn: {
    marginHorizontal: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
