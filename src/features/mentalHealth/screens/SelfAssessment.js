// AssessmentSelectionScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // or whichever icon lib you use

const quickCheckIns = [
  {
    id: 'phq9',
    title: 'Depression Quiz',
    subtitle: 'Assess your depression symptoms',
    image: require('../../../../src/assets/images/Mental_health/phq9.png'),
  },
  {
    id: 'gad7',
    title: 'Anxiety Check',
    subtitle: 'Evaluate your anxiety levels',
    image: require('../../../../src/assets/images/Mental_health/gad7.png'),
  },
  {
    id: 'who5',
    title: 'Well-Being Survey',
    subtitle: 'Measure your overall well-being',
    image: require('../../../../src/assets/images/Mental_health/who5.png'),
  },
  {
    id: 'stressInv',
    title: 'Stress Inventory',
    subtitle: 'Identify your stress triggers',
    image: require('../../../../src/assets/images/Mental_health/stress.png'),
  },
  {
    id: 'sleepCheck',
    title: 'Sleep Quality Check',
    subtitle: 'Rate your sleep patterns',
    image: require('../../../../src/assets/images/Mental_health/sleep.png'),
  },
];

const generalMentalHealth = [
  {
    id: 'moodTracker',
    title: 'Mood Tracker',
    subtitle: 'Track your daily mood changes',
    image: require('../../../../src/assets/images/Mental_health/mood.png'),
  },
  {
    id: 'selfEsteem',
    title: 'Self-Esteem Survey',
    subtitle: 'Gauge your self-worth',
    image: require('../../../../src/assets/images/Mental_health/selfesteem.png'),
  },
  {
    id: 'resilience',
    title: 'Resilience Scale',
    subtitle: 'Measure your coping abilities',
    image: require('../../../../src/assets/images/Mental_health/resilience.png'),
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness Check',
    subtitle: 'Assess your mindfulness practice',
    image: require('../../../../src/assets/images/Mental_health/mindfulness.png'),
  },
  {
    id: 'burnout',
    title: 'Burnout Assessment',
    subtitle: 'Evaluate your burnout risk',
    image: require('../../../../src/assets/images/Mental_health/burnout.png'),
  },
  {
    id: 'socialSupport',
    title: 'Social Support Survey',
    subtitle: 'Analyze your social network',
    image: require('../../../../src/assets/images/Mental_health/social.png'),
  },
];

export default function AssessmentSelectionScreen() {
  const navigation = useNavigation();

  const handlePress = (id) => {
    // Map the card IDs to assessment types
    const assessmentMap = {
      'phq9': 'phq9',
      'gad7': 'gad7',
      'who5': 'who5',
      'stressInv': 'stress',
      'sleepCheck': 'sleep',
      'moodTracker': 'mood',
      'selfEsteem': 'selfEsteem',
      'resilience': 'resilience',
      'mindfulness': 'mindfulness',
      'burnout': 'burnout',
      'socialSupport': 'socialSupport'
    };

    const assessmentType = assessmentMap[id] || 'phq9'; // Default to phq9 if mapping not found
    navigation.navigate('AssessmentRunner', { 
      type: assessmentType,
      title: quickCheckIns.find(item => item.id === id)?.title || 'Assessment' 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          {/* <Icon name="arrow-left" size={24} color="#212121" /> */}
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Check-In</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Quick Check-Ins */}
        <Text style={styles.sectionHeader}>Quick Check-Ins</Text>
        {quickCheckIns.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handlePress(item.id)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Image source={item.image} style={styles.cardImage} />
          </TouchableOpacity>
        ))}

        {/* General Mental Health */}
        <Text style={[styles.sectionHeader, { marginTop: 32 }]}>
          General Mental Health
        </Text>
        {generalMentalHealth.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handlePress(item.id)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Image source={item.image} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  container: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Android elevation
    elevation: 6,
    // Border for better visibility on light backgrounds
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3E40',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#546E7A',
    marginTop: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
