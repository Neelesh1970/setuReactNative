import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const QualificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [selectedQualifications, setSelectedQualifications] = useState([]);

  const qualifications = [
    'Student',
    '10th Pass',
    '12th Pass',
    'Graduate',
    'Post Graduate',
    'Professional Degree',
    'Doctorate',
    'Diploma',
    'ITI',
    'No Formal Education'
  ];

  const onContinue = () => {
    if (selectedQualifications.length === 0) {
      Alert.alert('Required', 'Please select at least one qualification');
      return;
    }
    
    // Navigate to the next screen with the selected qualifications
    navigation.navigate('NextScreen', {
      ...route.params,
      qualifications: selectedQualifications,
    });
  };

  const onReset = () => {
    setSelectedQualifications([]);
  };

  const toggleQualification = (qualification) => {
    setSelectedQualifications(prev => {
      // If the clicked qualification is already selected, clear the selection
      if (prev.length > 0 && prev[0] === qualification) {
        return [];
      }
      // Otherwise, select the clicked qualification
      return [qualification];
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 5/5</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.progressDots}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View 
            key={dot} 
            style={[
              styles.progressDot, 
              dot <= 5 && styles.activeProgressDot
            ]} 
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.title}>What is your highest qualification?</Text>
          <Text style={styles.subtitle}>Select all that apply</Text>
          
          <View style={styles.optionsContainer}>
            {qualifications.map((qualification) => (
              <TouchableOpacity
                key={qualification}
                style={[
                  styles.optionButton,
                  selectedQualifications.includes(qualification) && styles.selectedOption
                ]}
                onPress={() => toggleQualification(qualification)}
              >
                <Text style={[
                  styles.optionText,
                  selectedQualifications.includes(qualification) && styles.selectedOptionText
                ]}>
                  {qualification}
                </Text>
                {selectedQualifications.includes(qualification) && (
                  <Icon name="checkmark" size={20} color="#1C39BB" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedQualifications.length === 0 && styles.continueButtonDisabled
          ]}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onReset} 
          style={[
            styles.resetButton,
            selectedQualifications.length === 0 && styles.resetButtonDisabled
          ]}
          disabled={selectedQualifications.length === 0}
        >
          <Text style={[
            styles.resetButtonText,
            selectedQualifications.length === 0 && styles.resetButtonTextDisabled
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
    padding: 12,
    backgroundColor: '#1C39BB',
    paddingBottom: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#1C39BB',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
    justifyContent: 'space-between',
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
  checkIcon: {
    marginLeft: 8,
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
    fontSize: 16,
  },
  resetButtonTextDisabled: {
    color: '#CCCCCC',
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
});

export default QualificationScreen;
