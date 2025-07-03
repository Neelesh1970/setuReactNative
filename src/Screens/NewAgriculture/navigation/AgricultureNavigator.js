import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import AgricultureHomeScreen from '../AgricultureHomeScreen';

// Import available screens from Dashboard
import ScheduleScreen from '../../Dashboard/Schedule';
import SetuChatScreen from '../../Dashboard/SetuChat';

// Create a placeholder for Reports screen
const ReportsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Reports Screen</Text>
  </View>
);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a placeholder component for screens that haven't been created yet
const PlaceholderScreen = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{route.name} Screen</Text>
  </View>
);

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' } // Hide the default tab bar since we're using our custom one
      }}
    >
      <Tab.Screen name="AgricultureHome" component={AgricultureHomeScreen} />
      <Tab.Screen name="AgricultureReports" component={ReportsPlaceholder} />
      <Tab.Screen name="AgricultureSchedule" component={ScheduleScreen} />
      <Tab.Screen name="AgricultureChat" component={SetuChatScreen} />
    </Tab.Navigator>
  );
};

const AgricultureNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* You can add modal screens or other stack screens here */}
    </Stack.Navigator>
  );
};

export default AgricultureNavigator;
