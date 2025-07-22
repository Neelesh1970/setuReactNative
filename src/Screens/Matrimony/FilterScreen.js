import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Dropdown = ({ label, value, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={value ? styles.dropdownText : styles.placeholderText}>
          {value || `Select ${label}`}
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

const FilterScreen = () => {
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(165);

  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');

  const navigation = useNavigation();



  const resetFilters = () => {
    setAge(25);
    setHeight(165);
    setReligion('');
    setCaste('');
    setMaritalStatus('');
    setLocation('');
    setEducation('');
  };

  const applyFilters = () => {
    const filters = {
      age,
      height,
      religion,
      caste,
      maritalStatus,
      location,
      education,
    };
    console.log('Applied Filters:', filters);
    navigation.navigate("MatriBottomTab")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="close" size={24} color="#000" />
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* AGE */}
        <Text style={styles.sectionLabel}>Age</Text>
        <Text style={styles.sliderLabel}>Age Range</Text>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={60}
          step={1}
          value={age}
          onValueChange={setAge}
          minimumTrackTintColor="#111"
          maximumTrackTintColor="#dbe0e6"
          thumbTintColor="#111"
        />

        {/* RELIGION */}
        <Text style={styles.sectionLabel}>Religion</Text>
        <Dropdown
          label="Religion"
          value={religion}
          options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']}
          onSelect={setReligion}
        />

        {/* CASTE */}
        <Text style={styles.sectionLabel}>Caste</Text>
        <Dropdown
          label="Caste"
          value={caste}
          options={['General', 'OBC', 'SC', 'ST', 'Other']}
          onSelect={setCaste}
        />

        {/* MARITAL STATUS */}
        <Text style={styles.sectionLabel}>Marital Status</Text>
        <Dropdown
          label="Marital Status"
          value={maritalStatus}
          options={['Single', 'Married', 'Divorced', 'Widowed']}
          onSelect={setMaritalStatus}
        />

        {/* LOCATION */}
        <Text style={styles.sectionLabel}>Location</Text>
        <Dropdown
          label="Location"
          value={location}
          options={['Urban', 'Rural', 'Metro', 'Semi-Urban']}
          onSelect={setLocation}
        />

        {/* EDUCATION */}
        <Text style={styles.sectionLabel}>Education</Text>
        <Dropdown
          label="Education"
          value={education}
          options={['High School', 'Graduate', 'Post Graduate', 'PhD']}
          onSelect={setEducation}
        />

        {/* HEIGHT */}
        <Text style={styles.sectionLabel}>Height</Text>
        <Text style={styles.sliderLabel}>Height Range</Text>
        <Slider
          style={styles.slider}
          minimumValue={140}
          maximumValue={200}
          step={1}
          value={height}
          onValueChange={setHeight}
          minimumTrackTintColor="#111"
          maximumTrackTintColor="#dbe0e6"
          thumbTintColor="#111"
        />
      </ScrollView>

      {/* ACTION BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.06,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#111',
    marginBottom: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#6e7e91',
    fontSize: 14,
  },
  dropdownText: {
    color: '#000',
    fontSize: 14,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  resetButton: {
    backgroundColor: '#f1f3f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  resetText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#c9dafc',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});
