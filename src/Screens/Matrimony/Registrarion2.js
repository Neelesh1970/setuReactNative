import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const AboutYouScreen = () => {
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  const handleNext = () => {
     if (!religion.trim()) {
      alert("Please select your religion.");
      return;
    }
    if (!caste) {
      alert("Please select your caste.");
      return;
    }
    if (!maritalStatus) {
      alert("Please select your marital status.");
      return;
    }

    navigation.navigate("Register3");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>About you</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step Info */}
      <Text style={styles.stepText}>Step 2 of 3</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Dropdowns */}
      <Dropdown
        label="Religion"
        value={religion}
        options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']}
        onSelect={setReligion}
      />
      <Dropdown
        label="Caste"
        value={caste}
        options={['General', 'OBC', 'SC', 'ST', 'Other']}
        onSelect={setCaste}
      />
      <Dropdown
        label="Marital Status"
        value={maritalStatus}
        options={['Single', 'Married', 'Divorced', 'Widowed']}
        onSelect={setMaritalStatus}
      />

      {/* Footer buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  progressBar: {
    width: '66%',
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
  nextButton: {
    backgroundColor: '#0a74f9',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AboutYouScreen;
