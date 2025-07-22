import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';

const { width } = Dimensions.get('window');

const EligibilityCriteriaScreen = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState('');
  const [showAgePicker, setShowAgePicker] = useState(false);


  // Initialize selectedAge as null
  const [selectedAge, setSelectedAge] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.stepText}>Step 1/5</Text>
          <View style={styles.progressDots}>
            {[1, 2, 3, 4, 5].map((dot) => (
              <View 
                key={dot} 
                style={[
                  styles.progressDot, 
                  dot === 1 && styles.activeProgressDot
                ]} 
              />
            ))}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Let's Get to Know You</Text>
        <Text style={styles.subtitle}>We'll personalize the best schemes for your needs.</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Identity</Text>
          <View style={styles.identityOptions}>
            {[
              { id: 'Male', emoji: '♂️' },
              { id: 'Female', emoji: '♀️' },
              { id: 'Transgender', emoji: '⚧️' }
            ].map((gender) => (
              <TouchableOpacity
                key={gender.id}
                style={[
                  styles.identityOption,
                  selectedGender === gender.id && styles.selectedIdentityOption
                ]}
                onPress={() => setSelectedGender(selectedGender === gender.id ? '' : gender.id)}
              >
                <Text style={styles.identityEmoji}>{gender.emoji}</Text>
                <Text style={[
                  styles.identityText,
                  selectedGender === gender.id && styles.selectedIdentityText
                ]}>
                  {gender.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Selection</Text>
          <View style={styles.pickerContainer}>
            <Picker 
              selectedValue={selectedAge || ''}
              onValueChange={(itemValue) => setSelectedAge(itemValue || null)}
              style={[
                styles.picker,
                !selectedAge && { color: '#757575' }
              ]}
              mode="dropdown"
              dropdownIconColor="#4CAF50"
            >
              <Picker.Item 
                label="Choose Age" 
                value="" 
              />
              {[...Array(100).keys()].map((n) => {
                const age = n + 1;
                return (
                  <Picker.Item 
                    key={age} 
                    label={`${age} years`} 
                    value={age.toString()} 
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedAge && styles.continueButtonActive
          ]}
          onPress={() => {
            if (!selectedGender) {
              Alert.alert('Required', 'Please select your gender');
              return;
            }
            if (!selectedAge) {
              Alert.alert('Required', 'Please select your age');
              return;
            }
            navigation.navigate('StateSelection', {
              selectedAge,
              selectedGender
            });
          }}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.resetButton,
            (!selectedGender && !selectedAge) && styles.resetButtonDisabled
          ]}
          onPress={() => {
            setSelectedGender('');
            setSelectedAge(null);
          }}
          disabled={!selectedGender && !selectedAge}
        >
          <Text style={[
            styles.resetButtonText,
            (!selectedGender && !selectedAge) && styles.resetButtonTextDisabled
          ]}>⟲ Start Over or Reset All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#1C39BB',
   
  },
  backButton: {
    padding: 5,
    marginRight: 10,
    color: 'white',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  identityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  identityOption: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedIdentityOption: {
    // backgroundColor: '#1C39BB',
    borderColor: '#1C39BB',
  },
  identityEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  identityText: {
    fontSize: 16,
    color: '#333',
  },
  selectedIdentityText: {
    color: '#333',
    fontWeight: '600',
  },
  pickerContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 55,
    color: '#000',
  },
  ageScrollView: {
    padding: 10,
  },
  ageOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ageOptionText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#1C39BB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueButtonActive: {
    backgroundColor: '#1C39BB',
  },
  continueButtonInactive: {
    backgroundColor: '#a0a0a0',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#fff',
  },
  resetButton: {
    alignItems: 'center',
    padding: 10,
  },
  resetButton: {
    marginTop: 12,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#1C39BB',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  resetButtonTextDisabled: {
    color: '#CCCCCC',
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
});

export default EligibilityCriteriaScreen;
