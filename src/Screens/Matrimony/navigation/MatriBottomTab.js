// src/navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MatriHomeScreen from '../MatriHomeScreen';
import ProfileDetailScreen from '../ProfileDetailScreen';
import ChatsScreen from '../ChatScreen';
import MatriProfileScreen from '../MatriProfileScreen';

const Tab = createBottomTabNavigator();

const MatriBottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Search') iconName = 'search-outline';
        else if (route.name === 'Chats') iconName = 'chatbubble-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#777',
    })}
  >
    <Tab.Screen name="Home" component={MatriHomeScreen} />
    <Tab.Screen name="Search" component={ProfileDetailScreen} />
    <Tab.Screen name="Chats" component={ChatsScreen} />
    <Tab.Screen name="Profile" component={MatriProfileScreen} />
  </Tab.Navigator>
);

export default MatriBottomTabs;
