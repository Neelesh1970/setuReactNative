import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../../assets/colors/Colors';
import { useTranslation } from 'react-i18next';

// Import screens
import MatrujyotiWelcomeScreen from '../MatrujyotiwelcomeScreen';
import MatrujyotiMainScreen from '../PregnancyTrackerScreen';
import PregnancyTrackerScreen from '../PregnancyTrackerScreen';
import PregnancyDetailsScreen from '../PregnancyDetailsScreen';
import ReportScreen from '../ReportScreen';
import SettingsScreen from '../SettingsScreen';
import PHRScreen from '../PHRScreen';
import DocumentUploadScreen from '../DocumentUploadScreen';

const Stack = createStackNavigator();

// Custom header component
const CustomHeader = ({ title, showBack = true }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{t(title)}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

const MatrujyotiNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MatrujyotiWelcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="MatrujyotiWelcome" 
        component={MatrujyotiWelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen 
        name="MatrujyotiMain" 
        component={MatrujyotiMainScreen}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader 
              title="matrujyoti.main_title"
              showBack={true}
            /> */}
          {/* ),
        }}
      /> */}
      <Stack.Screen 
        name="MatrujyotiMain" 
        component={PregnancyTrackerScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ 
          returnToProfile: false,
          initialDate: null 
        }}
      />

      <Stack.Screen 
        name="PregnancyDetailsScreen" 
        component={PregnancyDetailsScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ selectedDate: null }}
      />
      <Stack.Screen 
        name="ReportScreen" 
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="PHR" 
        component={PHRScreen}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen 
        name="DocumentUploadScreen" 
        component={DocumentUploadScreen}
        options={{
          headerShown: false,
          header: () => null,
         
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: color.primaryBlue,
    borderBottomWidth: 1,
    borderBottomColor: color.primaryBlue,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default MatrujyotiNavigator;
