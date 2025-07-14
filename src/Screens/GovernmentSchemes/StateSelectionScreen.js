import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const StateSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState('');
  const [residence, setResidence] = useState('');

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const onContinue = () => {
    navigation.navigate('SchemesList', {
      selectedState,
      residence,
      ...route.params
    });
  };

  const onReset = () => {
    setSelectedState('');
    setResidence('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 2/5</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.progressDots}>
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <View 
                      key={dot} 
                      style={[
                        styles.progressDot, 
                        dot <= 2 && styles.activeProgressDot
                      ]} 
                    /> ))}
      </View>

      {/* Content */}
      <View style={styles.body}>
        <Text style={styles.label}>Select your state or union territory</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedState}
            onValueChange={setSelectedState}
            dropdownIconColor="#4CAF50"
            style={[
              styles.picker,
              !selectedState && { color: '#757575' }
            ]}
            mode="dropdown"
          >
            <Picker.Item label="--Choose your state --" value="" />
            {states.map(s => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>

        </View>

        <Text style={[styles.label, { marginTop: 32 }]}>
          Where do you currently live?
        </Text>
        <View style={styles.chipContainer}>
          {['Urban', 'Rural'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,
                residence === option && styles.chipSelected
              ]}
              onPress={() => setResidence(option)}
            >
              <Text
                style={[
                  styles.chipText,
                  residence === option && styles.chipTextSelected
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continue,
            (!selectedState || !residence) && styles.continueDisabled
          ]}
          disabled={!selectedState || !residence}
          onPress={onContinue}
        >
          <Text style={styles.continueText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onReset} style={{ marginTop: 12 }}>
          <Text style={styles.reset}>⟲ Start Over or Reset All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,  // Reduce bottom padding
    backgroundColor:'#1C39BB',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: 'white' },

  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor:'#1C39BB',
  },
  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#E0E0E0',
  //   marginHorizontal: 4,
  // },
  // dotActive: { backgroundColor: '#07C168' },

  body: { 
    flex: 1, 
    paddingHorizontal: 16,
    marginTop: 25,  // Added margin to move content down
  },
  label: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 8,
  },
  picker: {
    height: 55,
    color: '#000',
  },
  pickerIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },

  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  chipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#07C168',
  },
  chipText: { fontSize: 16, color: '#000' },
  chipTextSelected: {
    color: '#07C168',
    fontWeight: '600',
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  continue: {
    backgroundColor: '#07C168',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueDisabled: { backgroundColor: '#BDBDBD' },
  continueText: { color: '#fff', fontSize: 18, fontWeight: '600' },

  reset: {
    color: '#757575',
    fontSize: 15,
    textAlign: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,     // Add top padding
    paddingBottom: 10,  // Adjust bottom padding
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor:'#1C39BB',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 3,

  },
  activeProgressDot: {
    backgroundColor: '#4CAF50',
    width: 16,
  },
});

export default StateSelectionScreen;
