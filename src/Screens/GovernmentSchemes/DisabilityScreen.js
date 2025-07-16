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

const DisabilityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [hasDisability, setHasDisability] = useState('');
  const [disabilityPercentage, setDisabilityPercentage] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [disabilityCertification, setDisabilityCertification] = useState('');

  const disabilityTypes = [
    'Visual Impairment',
    'Hearing Impairment',
    'Locomotor Disability',
    'Intellectual Disability',
    'Mental Illness',
    'Multiple Disabilities',
    'Other'
  ];

  const certificationOptions = ['Yes', 'No'];
  const percentageOptions = ['<40%', '40-60%', '>60%'];

  const onContinue = () => {
    if (!hasDisability) {
      Alert.alert('Required', 'Please select if you have any disability');
      return;
    }
    
    if (hasDisability === 'Yes' && (!disabilityType || !disabilityPercentage || !disabilityCertification)) {
      Alert.alert('Required', 'Please fill all disability related fields');
      return;
    }

    navigation.navigate('QualificationScreen', {
      ...route.params,
      hasDisability,
      disabilityType: hasDisability === 'Yes' ? disabilityType : 'None',
      disabilityPercentage: hasDisability === 'Yes' ? disabilityPercentage : 'N/A',
      disabilityCertification: hasDisability === 'Yes' ? disabilityCertification : 'N/A',
    });
  };

  const onReset = () => {
    setHasDisability('');
    setDisabilityType('');
    setDisabilityPercentage('');
    setDisabilityCertification('');
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
            onPress={() => {
              // Toggle the selection - if clicking the already selected option, unselect it
              onSelect(value === option ? '' : option);
            }}
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
        <Text style={styles.headerTitle}>Step 4/5</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.progressDots}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View 
            key={dot} 
            style={[
              styles.progressDot, 
              dot <= 4 && styles.activeProgressDot
            ]} 
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.title}>Do you have any disability?</Text>
          <Text style={styles.subtitle}>Some schemes are designed especially for people with disabilities.</Text>
          
          <View style={styles.yesNoContainer}>
            {['Yes', 'No'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.yesNoButton,
                  hasDisability === option && styles.selectedYesNo
                ]}
                onPress={() => {
                  // Toggle the selection - if clicking the already selected option, unselect it
                  setHasDisability(hasDisability === option ? '' : option);
                  // Clear disability details when unselecting or selecting No
                  if (hasDisability === option || option === 'No') {
                    setDisabilityType('');
                    setDisabilityPercentage('');
                    setDisabilityCertification('');
                  }
                }}
              >
                <Text style={[
                  styles.yesNoText,
                  hasDisability === option && styles.selectedYesNoText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {hasDisability === 'Yes' && (
            <>
              {renderOption('Type of Disability', disabilityType, disabilityTypes, setDisabilityType)}
              {renderOption('Disability Percentage', disabilityPercentage, percentageOptions, setDisabilityPercentage)}
              {renderOption('Do you have a disability certificate?', disabilityCertification, certificationOptions, setDisabilityCertification)}
            </>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!hasDisability || 
             (hasDisability === 'Yes' && (!disabilityType || !disabilityPercentage || !disabilityCertification))) && 
            styles.continueButtonDisabled
          ]}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onReset} 
          style={[
            styles.resetButton,
            (!hasDisability) && styles.resetButtonDisabled
          ]}
          disabled={!hasDisability}
        >
          <Text style={[
            styles.resetButtonText,
            (!hasDisability) && styles.resetButtonTextDisabled
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
    paddingBottom: 1,  // Reduce bottom padding
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
    paddingTop: 1,     // Reduced top padding to move dots up
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
  scrollView: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  yesNoButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedYesNo: {
    backgroundColor: '#1C39BB',
    borderColor: '#1C39BB',
  },
  yesNoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedYesNoText: {
    color: 'white',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
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
    color: '#374151',
  },
  selectedOptionText: {
    color: 'white',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
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
});

export default DisabilityScreen;
