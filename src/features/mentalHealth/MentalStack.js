import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Screens
import MentalHealthHomeScreen from './screens/MentalHealthHomeScreen';
import SelfAssessment from './screens/SelfAssessment';
import AssessmentRunner from './screens/AssessmentRunner';
import AssessmentResults from './screens/AssessmentResults';
import ActivityLog from './screens/ActivityLog';
import BookSpecialistScreen from './screens/BookSpecialistScreen';

const Stack = createStackNavigator();

const MentalStack = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="MentalHealthDashboard" 
        component={MentalHealthHomeScreen} 
        options={{ 
          title: 'Mental Wellness',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="SelfAssessment" 
        component={SelfAssessment} 
        options={{ 
          title: 'Self-Assessments',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="AssessmentRunner" 
        component={AssessmentRunner} 
        options={({ route }) => ({
          title: route.params?.title || 'Assessment',
          headerShown: true,
        })} 
      />
      <Stack.Screen 
        name="AssessmentResults" 
        component={AssessmentResults} 
        options={{
          title: 'Assessment Results',
          headerShown: true
        }}
      />
      <Stack.Screen 
        name="ActivityLog" 
        component={ActivityLog} 
        options={({ route }) => ({
          title: route.params?.type === 'mood' ? 'Log Mood' : 'Log Activity',
          headerShown: true,
        })} 
      />
      <Stack.Screen 
        name="BookSpecialist" 
        component={BookSpecialistScreen} 
        options={{ 
          title: 'Book a Specialist',
          headerShown: true,
        }} 
      />
    </Stack.Navigator>
  );
};

export default MentalStack;
