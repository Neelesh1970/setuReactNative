import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Colors';

const CheckoutScreen = () => {
    const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState('Cash on Delivery');

  const paymentMethods = ['Cash on Delivery', 'UPI', 'Card'];
  const totalAmount = 125.99;

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
      

        {/* Address / Note Box */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter delivery address or note"
            placeholderTextColor="#999"
            style={styles.textArea}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.radioItem,
              selectedMethod === method && styles.radioItemActive,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.radioText}>{method}</Text>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === method && styles.radioSelected,
              ]}
            >
              {selectedMethod === method && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}

        {/* Total & Button */}
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total Payable</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={() => navigation.navigate('OrderPlaced')}>
          <Text style={styles.btnText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
  },
  scroll: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
    backgroundColor:color.bottomViewColor,
    padding: 20,  
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    marginBottom: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  textArea: {
    fontSize: 15,
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  radioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#F9FBFD',
  },
  radioItemActive: {
    backgroundColor: '#fff',
    borderColor: '#007BFF',
  },
  radioText: {
    fontSize: 15,
    color: '#000',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#007BFF',
  },
  radioDot: {
    width: 10,
    height: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  placeOrderBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
