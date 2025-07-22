import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';

const BookingSummary = ({cartDetailsData}) => {
  console.log("cartDetailsData",cartDetailsData)
  const {discount = 0,order_amount = 0,total_amount = 0} =cartDetailsData?.cart_summary || {}
  return (
    <View style={styles.container}>
      {/* Assistance Section */}
      {/* <View style={styles.assistanceBox}>
        <Text style={styles.assistanceText}>
          <Text style={styles.boldText}>Need assistance</Text>{"\n"}
          <Text>in completing booking?</Text>
        </Text>
        <TouchableOpacity style={styles.callBackButton}>
          <Text style={styles.callBackText}>Get A Call Back</Text>
        </TouchableOpacity>
      </View> */}

      {/* Cart Summary */}
      <View style={styles.cartSummary}>
        <Text style={styles.summaryTitle}>Cart Summary</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Order Amount</Text>
          <Text style={styles.amount}>₹{order_amount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.discountText]}>Discount</Text>
          <Text style={[styles.amount, styles.discountAmount]}>-₹{discount}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.amount}>₹{total_amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  assistanceBox: {
    height: ms(74),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  assistanceText: {
    fontSize: 14,
    color: '#777',
    display:'flex',
    flexDirection:'column'
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  callBackButton: {
    backgroundColor: '#53C275',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    padding: ms(10)
  },
  callBackText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartSummary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  discountText: {
    color: 'green',
  },
  discountAmount: {
    color: 'green',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default BookingSummary;
