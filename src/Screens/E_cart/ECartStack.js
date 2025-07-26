import React from 'react';

import E_cartHomescreen from './E_cartHomescreen';
import productHomeScreen from './productHomeScreen';
import E_CartScreen from './E_CartScreen';
import CheckOutScreen from './CheckOutScreen';
import OrderPlacedScreen from './OrderPlacedScreen';
import OrderDetailScreen from './OrderDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const EcartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EHome" component={E_cartHomescreen} />
      <Stack.Screen name="productHomeScreen" component={productHomeScreen} />
      <Stack.Screen name="Cart" component={E_CartScreen} />
      <Stack.Screen name="Checkout" component={CheckOutScreen} />
      <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default EcartStack;
