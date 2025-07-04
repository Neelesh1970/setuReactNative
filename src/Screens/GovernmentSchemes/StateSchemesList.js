// StateSchemesList.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const StateSchemesList = () => {
  const navigation = useNavigation();

  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [reserved, setReserved] = useState(false);
  
  // Get user data from Redux store with detailed logging
  const userState = useSelector((state) => state.user);
  
  // Debug logs
  console.log('=== DEBUGGING USER DATA ===');
  console.log('Full user state:', userState);
  console.log('User data keys:', userState ? Object.keys(userState) : 'No user state');
  if (userState?.profileData) {
    console.log('Profile data keys:', Object.keys(userState.profileData));
  } else {
    console.log('No profile data found');
  }
  console.log('==========================');
  
  // Extract user data
  const { userData, profileData } = userState || {};

  const handleSubmit = () => {
    // Prepare user details object
    const userDetails = {
      // Try different possible name properties
      name: userState?.profileData?.full_name || 
             userState?.profileData?.name ||
             userState?.userData?.full_name ||
             userState?.userData?.name ||
             'User',
      age: age,
      gender: gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Other',
      state: state,
      income: income === 'below_1' ? 'Below ₹1 Lakh' : 
              income === '1_5' ? '₹1-5 Lakhs' : 'Above ₹5 Lakhs',
      occupation: occupation.charAt(0).toUpperCase() + occupation.slice(1),
      isReservedCategory: reserved ? 'Yes' : 'No'
    };
    
    // Navigate to EligibleSchemesScreen with user details
    navigation.navigate('EligibleSchemes', { userDetails });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eligibility Form</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <View style={styles.pickerWrapper}>
          <Picker 
            selectedValue={age} 
            onValueChange={setAge} 
            style={styles.picker}
            mode="dropdown"
            dropdownIconColor="#4A6F44"
          >
            <Picker.Item label={age ? `Age: ${age}` : "Select Age"} value={age} />
            {[...Array(100).keys()].map((n) => (
              <Picker.Item key={n} label={`${n + 1} years`} value={`${n + 1}`} />
            ))}
          </Picker>
        </View>

        {/* Income */}
        <Text style={styles.label}>Income</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={income} onValueChange={setIncome} style={styles.picker}>
            <Picker.Item label="Enter Income" value="" />
            <Picker.Item label="Below ₹1 Lakh" value="below_1" />
            <Picker.Item label="₹1–5 Lakhs" value="1_5" />
            <Picker.Item label="Above ₹5 Lakhs" value="above_5" />
          </Picker>
        </View>

        {/* Occupation */}
        <Text style={styles.label}>Occupation</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={occupation} onValueChange={setOccupation} style={styles.picker}>
            <Picker.Item label="Enter Occupation" value="" />
            <Picker.Item label="Farmer" value="farmer" />
            <Picker.Item label="Laborer" value="laborer" />
            <Picker.Item label="Professional" value="professional" />
            <Picker.Item label="Student" value="student" />
          </Picker>
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Enter Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* State */}
        <Text style={styles.label}>Select Your State</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={state} onValueChange={setState} style={styles.picker}>
            <Picker.Item label="Choose a state" value="" />
            {states.map((s) => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>

        {/* Reserved Category Switch */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Are you from a reserved category?</Text>
          <Switch
            value={reserved}
            onValueChange={setReserved}
            trackColor={{ true: '#4A6F44', false: '#ccc' }}
            thumbColor="#fff"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 0.4,
    borderBottomColor: '#ddd',
  },
  backIcon: { fontSize: 24, color: '#234522' },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234522',
    textAlign: 'center',
  },
  container: { padding: 16, paddingBottom: 40 },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 16,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A6F44',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  submitBtn: {
    backgroundColor: '#1a73e8',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StateSchemesList;
