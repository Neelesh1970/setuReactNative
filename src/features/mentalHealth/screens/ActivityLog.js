import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Button, Slider, Icon, Card } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { logMood, logActivity, getMoodHistory } from '../api/tracking';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const ACTIVITY_TYPES = [
  { id: 'exercise', name: 'Exercise', icon: 'directions-run' },
  { id: 'meditation', name: 'Meditation', icon: 'self-improvement' },
  { id: 'sleep', name: 'Sleep', icon: 'hotel' },
  { id: 'social', name: 'Social', icon: 'groups' },
  { id: 'work', name: 'Work', icon: 'work' },
  { id: 'hobby', name: 'Hobby', icon: 'sports-esports' },
];

const ActivityLog = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params || { type: 'mood' };
  
  const [mood, setMood] = useState(5);
  const [activityType, setActivityType] = useState('exercise');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  
  const isMoodLog = type === 'mood';

  // Load mood history when component mounts
  useEffect(() => {
    if (isMoodLog) {
      loadMoodHistory();
    }
  }, [isMoodLog]);

  const loadMoodHistory = async () => {
    try {
      const history = await getMoodHistory({
        startDate: moment().subtract(7, 'days').toISOString(),
        endDate: new Date().toISOString()
      });
      setMoodHistory(history);
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (isMoodLog && !mood) {
        Alert.alert('Error', 'Please select a mood level');
        return;
      }

      setIsSubmitting(true);
      const logData = {
        type: isMoodLog ? 'mood' : activityType,
        value: isMoodLog ? mood : duration,
        notes: notes.trim(),
        timestamp: date.toISOString(),
      };
      
      if (isMoodLog) {
        await logMood(logData);
        // Refresh mood history after logging
        await loadMoodHistory();
        
        // Reset form
        setMood(5);
        setNotes('');
        setDate(new Date());
        
        Alert.alert(
          'Success',
          'Mood logged successfully!',
          [{ text: 'OK' }]
        );
      } else {
        await logActivity(logData);
        Alert.alert(
          'Success',
          'Activity logged successfully!',
          [
            { 
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error saving log:', error);
      Alert.alert('Error', 'Failed to save log. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  const renderMoodFaces = () => {
    const faces = ['sentiment-very-dissatisfied', 'sentiment-dissatisfied', 'sentiment-neutral', 'sentiment-satisfied', 'sentiment-very-satisfied'];
    return (
      <View style={styles.moodContainer}>
        {faces.map((face, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setMood((index + 1) * 2)}
            style={[
              styles.moodButton,
              mood >= (index * 2.5) + 1 && styles.selectedMood
            ]}
          >
            <Icon
              name={face}
              size={40}
              color={mood >= (index * 2.5) + 1 ? '#6200ee' : '#aaa'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderMoodItem = ({ item }) => {
    const moodValue = item.value;
    const moodFaces = [
      'sentiment-very-dissatisfied',
      'sentiment-dissatisfied',
      'sentiment-neutral',
      'sentiment-satisfied',
      'sentiment-very-satisfied'
    ];
    
    const faceIndex = Math.min(Math.floor((moodValue - 1) / 2), 4);
    
    return (
      <Card containerStyle={styles.moodCard}>
        <View style={styles.moodItem}>
          <Icon
            name={moodFaces[faceIndex]}
            size={30}
            color="#6200ee"
            style={styles.moodIcon}
          />
          <View style={styles.moodDetails}>
            <Text style={styles.moodValueItem}>{moodValue}/10</Text>
            <Text style={styles.moodDate}>
              {moment(item.timestamp).format('MMM D, h:mm A')}
            </Text>
            {item.notes ? (
              <Text style={styles.moodNotes} numberOfLines={2}>
                {item.notes}
              </Text>
            ) : null}
          </View>
        </View>
      </Card>
    );
  };

  const renderActivityTypeSelector = () => (
    <View style={styles.activityTypeContainer}>
      {ACTIVITY_TYPES.map((activity) => (
        <TouchableOpacity
          key={activity.id}
          style={[
            styles.activityButton,
            activityType === activity.id && styles.selectedActivity
          ]}
          onPress={() => setActivityType(activity.id)}
        >
          <Icon
            name={activity.icon}
            size={30}
            color={activityType === activity.id ? '#fff' : '#6200ee'}
          />
          <Text style={[
            styles.activityText,
            { color: activityType === activity.id ? '#fff' : '#333' }
          ]}>
            {activity.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {isMoodLog ? (
            <>
              <Text style={styles.sectionTitle}>Log Your Mood</Text>
              <Text style={styles.label}>How are you feeling today?</Text>
              {renderMoodFaces()}
              <Text style={styles.moodValue}>Mood: {mood}/10</Text>
              <Slider
                value={mood}
                onValueChange={setMood}
                minimumValue={1}
                maximumValue={10}
                step={1}
                thumbTintColor="#6200ee"
                minimumTrackTintColor="#6200ee"
                style={styles.slider}
              />
              
              <Text style={styles.label}>Date & Time</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{moment(date).format('MMMM Do YYYY, h:mm a')}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about how you're feeling"
                multiline
                numberOfLines={4}
              />

              <Button
                title={isSubmitting ? 'Saving...' : 'Log Mood'}
                onPress={handleSubmit}
                disabled={isSubmitting}
                buttonStyle={styles.submitButton}
                titleStyle={styles.submitButtonText}
                loading={isSubmitting}
              />
              
              {moodHistory.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
                    Recent Mood Logs
                  </Text>
                  <FlatList
                    data={moodHistory}
                    renderItem={renderMoodItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Log Activity</Text>
              <Text style={styles.label}>Activity Type</Text>
              {renderActivityTypeSelector()}
              <Text style={styles.label}>Duration: {duration} minutes</Text>
              <Slider
                value={duration}
                onValueChange={setDuration}
                minimumValue={5}
                maximumValue={240}
                step={5}
                thumbTintColor="#6200ee"
                minimumTrackTintColor="#6200ee"
                style={styles.slider}
              />
              
              <Text style={styles.label}>Date & Time</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{moment(date).format('MMMM Do YYYY, h:mm a')}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about your activity"
                multiline
                numberOfLines={4}
              />

              <Button
                title={isSubmitting ? 'Saving...' : 'Log Activity'}
                onPress={handleSubmit}
                disabled={isSubmitting}
                buttonStyle={styles.submitButton}
                titleStyle={styles.submitButtonText}
                loading={isSubmitting}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  moodButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  selectedMood: {
    backgroundColor: '#f0e6ff',
  },
  activityTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  activityButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedActivity: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  activityText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  moodCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    marginRight: 16,
  },
  moodDetails: {
    flex: 1,
  },
  moodValueItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moodDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  moodNotes: {
    marginTop: 8,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default ActivityLog;
