import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const H_PADDING = 20;
const CAL_WIDTH = width - H_PADDING * 2;

export default function PregnancyTrackerScreen({ navigation, route }) {
  const [selectedOption, setSelectedOption] = useState('lmp'); // 'lmp' or 'due'
  const [currentMonth, setCurrentMonth] = useState(route.params?.initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(route.params?.initialDate || null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  
  // Check if we should return to profile after date selection
  const shouldReturnToProfile = route.params?.returnToProfile || false;

  // Generate years (from current year - 10 to current year + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Helpers for calendar
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0=Sun
  const days = [];
  for (let i = 0; i < firstWeekday; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

  const prevMonth = () =>
    setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(year, month + 1, 1));

  const onDayPress = (d) => {
    // Toggle selection - if clicking the same date, unselect it
    if (selectedDate && d.toDateString() === selectedDate.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(d);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pregnancy Tracker</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* STEP INDICATOR
      <View style={styles.stepRow}>
        <View style={[styles.dot, { backgroundColor: '#000' }]} />
        <View style={[styles.dot, { backgroundColor: '#DDD', marginLeft: 8 }]} />
      </View> */}

      {/* QUESTION */}
      <Text style={styles.question}>When is your baby due?</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* RADIO OPTIONS */}
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedOption('lmp')}
          >
            <Text style={styles.radioLabel}>Enter LMP</Text>
            <View style={styles.radioCircle}>
              {selectedOption === 'lmp' && <View style={styles.radioFilled} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedOption('due')}
          >
            <Text style={styles.radioLabel}>Enter Due Date</Text>
            <View style={styles.radioCircle}>
              {selectedOption === 'due' && <View style={styles.radioFilled} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* DATE INPUT */}
        <TouchableOpacity style={styles.dateInput}>
          <Text style={[
            styles.dateText,
            !selectedDate && { color: '#AAA' }
          ]}>
            {selectedDate
              ? selectedDate.toDateString().slice(4, 15)
              : 'Select Date'}
          </Text>
          <Icon name="calendar-outline" size={20} color="#888" />
        </TouchableOpacity>

        {/* CALENDAR */}
        <View style={styles.calendarContainer}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth}>
              <Icon name="chevron-back" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.yearSelector}
            onPress={() => setShowYearPicker(true)}
          >
            <Text style={styles.monthText}>
              {monthNames[month]} {year}
            </Text>
            <Icon name="chevron-down" size={16} color="#000" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
            <TouchableOpacity onPress={nextMonth}>
              <Icon name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Weekday Labels */}
          <View style={styles.weekRow}>
            {['S','M','T','W','T','F','S'].map((w, index) => (
              <Text key={`${w}-${index}`} style={styles.weekday}>{w}</Text>
            ))}
          </View>

          {/* Day Grid */}
          <View style={styles.daysGrid}>
            {days.map((d, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dayCell,
                  d &&
                    selectedDate &&
                    d.toDateString() === selectedDate.toDateString() && {
                      backgroundColor: '#FFCDD2',
                      borderRadius: 20,
                    },
                ]}
                disabled={!d}
                onPress={() => d && onDayPress(d)}
              >
                <Text
                  style={[
                    styles.dayText,
                    d &&
                      selectedDate &&
                      d.toDateString() === selectedDate.toDateString() && {
                        color: '#fff',
                      },
                  ]}
                >
                  {d ? d.getDate() : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CONTINUE BUTTON */}
      <TouchableOpacity
        style={[styles.continueBtn, !selectedDate && styles.disabledBtn]}
        disabled={!selectedDate}
        onPress={() => {
          if (shouldReturnToProfile) {
            // Navigate back to profile with the selected date
            navigation.navigate('PregnancyDetailsScreen', { selectedDate });
          } else {
            navigation.navigate('PregnancyDetailsScreen', { selectedDate });
          }
        }}
      >
        <Text style={styles.continueText}>
          {shouldReturnToProfile ? 'Update Date' : 'Continue'}
        </Text>
      </TouchableOpacity>

      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Year</Text>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.yearItem,
                    item === year && styles.selectedYearItem
                  ]}
                  onPress={() => {
                    const newDate = new Date(currentMonth);
                    newDate.setFullYear(item);
                    setCurrentMonth(newDate);
                    setShowYearPicker(false);
                  }}
                >
                  <Text style={[
                    styles.yearText,
                    item === year && styles.selectedYearText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.yearList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowYearPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const CELL_SIZE = CAL_WIDTH / 7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C39BB',
  },
  headerText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    color: '#000',
  },
  content: {
    paddingHorizontal: H_PADDING,
    paddingTop: 16,
  },
  radioRow: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginLeft: 0,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 18,
    color: '#000',
  },
  calendarContainer: {
    marginBottom: 24,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekday: {
    width: CELL_SIZE,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  continueBtn: {
    backgroundColor: '#1C39BB',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
  },
  disabledBtn: {
    backgroundColor: '#1C39BB',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Year Picker Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    textAlign: 'center',
  },
  yearList: {
    padding: 10,
  },
  yearItem: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 2,
  },
  selectedYearItem: {
    backgroundColor: '#1C39BB',
  },
  yearText: {
    fontSize: 16,
    color: '#333',
  },
  selectedYearText: {
    color: '#fff',
    fontWeight: '600',
  },
  closeButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1C39BB',
    fontSize: 16,
    fontWeight: '600',
  },
});
