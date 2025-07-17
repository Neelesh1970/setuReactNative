import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CasteSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIncome, setSelectedIncome] = useState('');
//   const [selectedDisability, setSelectedDisability] = useState('');
  const religions = [
    'Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'
  ];

  const categories = [
    'General', 'EWS', 'OBC', 'SC', 'ST', 'Minority'
  ];

  const incomeRanges = [
    'Below 1 Lakh', '1-3 Lakhs', '3-5 Lakhs', '5-10 Lakhs', 'Above 10 Lakhs'
  ];

  const onContinue = () => {
    if (!selectedReligion || !selectedCategory || !selectedIncome) {
      Alert.alert('Required', 'Please fill in all fields');
      return;
    }
    navigation.navigate('DisabilityScreen', {
      ...route.params,
      selectedReligion,
      selectedCategory,
      selectedIncome
    });
  };

  const onReset = () => {
    setSelectedReligion('');
    setSelectedCategory('');
    setSelectedIncome('');
  };

  const renderOption = (title, value, options, onSelect) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              value === option && styles.selectedOption
            ]}
            onPress={() => onSelect(value === option ? '' : option)}
          >
            <Text style={[
              styles.optionText,
              value === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 3/5</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.progressDots}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View 
            key={dot} 
            style={[
              styles.progressDot, 
              dot <= 3 && styles.activeProgressDot
            ]} 
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.title}>You belong to...</Text>
          <Text style={styles.subtitle}>We'll personalize the best schemes for your needs.</Text>
          
          {renderOption('Select Religion', selectedReligion, religions, setSelectedReligion)}
          {renderOption('Select Category', selectedCategory, categories, setSelectedCategory)}
          {renderOption('Annual Income', selectedIncome, incomeRanges, setSelectedIncome)}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedReligion || !selectedCategory || !selectedIncome) && styles.continueButtonDisabled
          ]}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onReset} 
          style={[
            styles.resetButton,
            (!selectedReligion && !selectedCategory && !selectedIncome) && styles.resetButtonDisabled
          ]}
          disabled={!selectedReligion && !selectedCategory && !selectedIncome}
        >
          <Text style={[
            styles.resetButtonText,
            (!selectedReligion && !selectedCategory && !selectedIncome) && styles.resetButtonTextDisabled
          ]}>⟲ Start Over or Reset All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1C39BB',
    paddingBottom: 0,  // Reduce bottom padding
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 1,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,     // Add top padding
    paddingBottom: 8,  // Adjust bottom padding
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor:'#1C39BB',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius:5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
  },
  activeProgressDot: {
    backgroundColor: '#4CAF50',
    width: 16,
  },
  scrollView: {
    flex: 1,
  },
  body: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 5,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#1C39BB',
    borderColor: '#1C39BB',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '500',
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
  },
  continueButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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

export default CasteSelectionScreen;
