import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Dropdown = ({ label, value, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={value ? styles.dropdownText : styles.placeholderText}>
          {value || label}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6e7e91" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const Step3Screen = () => {
  const navigation = useNavigation();

  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [income, setIncome] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFinish = () => {
    if (!education || !profession || !location || !income) {
      alert('Please fill out all fields.');
      return;
    }

    const formData = {
      education,
      profession,
      location,
      income,
    };

    console.log('Collected Data:', formData);
    alert('Registration Complete!');
    navigation.navigate("FilterScreen")
    // Submit formData or move to next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>About you</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Step Info */}
      <Text style={styles.stepText}>Step 3 of 3</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFull} />
      </View>

      {/* Dropdowns */}
      <Dropdown
        label="Education"
        value={education}
        options={[
          'High School',
          'Diploma',
          'Graduate',
          'Post Graduate',
          'PhD',
        ]}
        onSelect={setEducation}
      />
      <Dropdown
        label="Profession"
        value={profession}
        options={[
          'Student',
          'Engineer',
          'Doctor',
          'Business',
          'Government',
          'Other',
        ]}
        onSelect={setProfession}
      />
      <Dropdown
        label="Location"
        value={location}
        options={[
          'Rural',
          'Urban',
          'Metro',
          'Semi-Urban',
        ]}
        onSelect={setLocation}
      />
      <Dropdown
        label="Income"
        value={income}
        options={[
          'Below ₹1L',
          '₹1L - ₹3L',
          '₹3L - ₹5L',
          '₹5L - ₹10L',
          'Above ₹10L',
        ]}
        onSelect={setIncome}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#dbe0e6',
    borderRadius: 4,
    marginBottom: 24,
  },
  progressBarFull: {
    width: '100%',
    height: 6,
    backgroundColor: '#111',
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#6e7e91',
  },
  dropdownText: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000066',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 32,
    borderRadius: 10,
    padding: 20,
  },
  optionItem: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  backButton: {
    backgroundColor: '#f1f3f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
  },
  finishButton: {
    backgroundColor: '#0a74f9',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  finishText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Step3Screen;
