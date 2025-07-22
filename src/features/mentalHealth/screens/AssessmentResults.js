// AssessmentResults.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AssessmentResults = () => {
  const navigation = useNavigation();
  const { score = 0, maxScore = 0, assessmentType = '' } = useRoute().params || {};

  // If no type provided, nothing to render
  if (!assessmentType) {
    console.error('AssessmentResults: missing assessmentType');
    return null;
  }

  // Build UI data based on type & score
  const getAssessmentInfo = () => {
    const info = {
      title: '',
      description: '',
      recommendations: [],       // removed `as string[]`
      severity: '',
      color: '',
      scoreRanges: {},           // removed `as Record<…>`
      chartData: [
        {
          key: 1,
          amount: score,
          svg: { fill: '' },
          arc: { outerRadius: '100%', cornerRadius: 5 },
        },
        {
          key: 2,
          amount: maxScore - score,
          svg: { fill: '#E5E7EB' },
          arc: { outerRadius: '100%', cornerRadius: 5 },
        },
      ],
    };

    switch (assessmentType.toLowerCase()) {
      case 'phq9':
        info.title = 'Depression Assessment';
        info.description = 'Your results suggest some symptoms of depression.';
        info.recommendations = [
          'Talk to a mental health professional',
          'Stay physically active',
          'Maintain a sleep schedule',
          'Connect with loved ones',
        ];
        info.color = '#FFA500';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-4': { label: 'Minimal', color: '#10B981' },
          '5-9': { label: 'Mild', color: '#3B82F6' },
          '10-14': { label: 'Moderate', color: '#F59E0B' },
          '15-19': { label: 'Mod. Severe', color: '#F97316' },
          '20-27': { label: 'Severe', color: '#EF4444' },
        };
        break;

      case 'gad7':
        info.title = 'Anxiety Assessment';
        info.description = 'Your results suggest some symptoms of anxiety.';
        info.recommendations = [
          'Practice deep breathing',
          'Try mindfulness meditation',
          'Seek counseling',
          'Limit caffeine & alcohol',
        ];
        info.color = '#4F46E5';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-4': { label: 'Minimal', color: '#10B981' },
          '5-9': { label: 'Mild', color: '#3B82F6' },
          '10-14': { label: 'Moderate', color: '#F59E0B' },
          '15-21': { label: 'Severe', color: '#EF4444' },
        };
        break;

      case 'who5':
        info.title = 'Well-Being Assessment';
        info.description = 'Your results reflect your current state of well-being.';
        info.recommendations = [
          'Stay active',
          'Cultivate gratitude',
          'Maintain social connections',
          'Prioritize sleep',
        ];
        info.color = '#8B5CF6';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-50': { label: 'Low', color: '#EF4444' },
          '51-70': { label: 'Moderate', color: '#F59E0B' },
          '71-100': { label: 'High', color: '#10B981' },
        };
        break;

      case 'phq15':
        info.title = 'Somatic Symptoms';
        info.description = 'Your results reflect physical symptom severity.';
        info.recommendations = [
          'Consult a healthcare provider',
          'Practice relaxation techniques',
          'Keep a symptom diary',
          'Maintain healthy habits',
        ];
        info.color = '#10B981';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-4': { label: 'Minimal', color: '#10B981' },
          '5-9': { label: 'Mild', color: '#3B82F6' },
          '10-14': { label: 'Moderate', color: '#F59E0B' },
          '15-20': { label: 'Severe', color: '#EF4444' },
        };
        break;

      case 'pcl5':
        info.title = 'PTSD Assessment';
        info.description = 'Your results reflect PTSD symptom levels.';
        info.recommendations = [
          'Seek professional help',
          'Use grounding techniques',
          'Join a support group',
          'Consider trauma therapy',
        ];
        info.color = '#F97316';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-31': { label: 'Low', color: '#10B981' },
          '32-44': { label: 'Moderate', color: '#F59E0B' },
          '45-55': { label: 'High', color: '#EF4444' },
        };
        break;

      case 'stress':
        info.title = 'Stress Assessment';
        info.description = 'Your results indicate your current stress levels.';
        info.recommendations = [
          'Practice relaxation techniques',
          'Take regular breaks',
          'Engage in physical activity',
          'Consider time management strategies',
        ];
        info.color = '#EC4899';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-13': { label: 'Low Stress', color: '#10B981' },
          '14-26': { label: 'Moderate Stress', color: '#F59E0B' },
          '27-40': { label: 'High Stress', color: '#EF4444' },
        };
        break;

      case 'sleep':
        info.title = 'Sleep Quality Assessment';
        info.description = 'Your results reflect your sleep patterns.';
        info.recommendations = [
          'Establish a bedtime routine',
          'Limit screen time before bed',
          'Create a sleep-friendly environment',
          'Consider sleep tracking',
        ];
        info.color = '#3B82F6';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Poor Sleep', color: '#EF4444' },
          '11-15': { label: 'Moderate Sleep', color: '#F59E0B' },
          '16-20': { label: 'Good Sleep', color: '#10B981' },
        };
        break;

      case 'mood':
        info.title = 'Mood Tracker Assessment';
        info.description = 'Your results reflect your overall mood state.';
        info.recommendations = [
          'Practice daily mood tracking',
          'Engage in mood-boosting activities',
          'Talk with friends or family',
          'Seek support if needed',
        ];
        info.color = '#4F46E5';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low Mood', color: '#EF4444' },
          '11-20': { label: 'Moderate Mood', color: '#F59E0B' },
          '21-30': { label: 'Good Mood', color: '#10B981' },
        };
        break;

      case 'selfesteem':
        info.title = 'Self-Esteem Assessment';
        info.description = 'Your results reflect your current self-esteem level.';
        info.recommendations = [
          'Practice self-compassion',
          'Challenge negative thoughts',
          'Set realistic goals',
          'Celebrate small successes',
        ];
        info.color = '#8B5CF6';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low', color: '#EF4444' },
          '11-20': { label: 'Moderate', color: '#F59E0B' },
          '21-30': { label: 'High', color: '#10B981' },
        };
        break;

      case 'resilience':
        info.title = 'Resilience Assessment';
        info.description = 'Your results reflect your ability to cope with stress.';
        info.recommendations = [
          'Develop problem-solving skills',
          'Build supportive relationships',
          'Practice positive self-talk',
          'Maintain healthy routines',
        ];
        info.color = '#F59E0B';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low Resilience', color: '#EF4444' },
          '11-20': { label: 'Moderate Resilience', color: '#F59E0B' },
          '21-30': { label: 'High Resilience', color: '#10B981' },
        };
        break;

      case 'mindfulness':
        info.title = 'Mindfulness Assessment';
        info.description = 'Your results reflect your mindfulness practice.';
        info.recommendations = [
          'Practice guided meditation',
          'Engage in mindful breathing',
          'Keep a mindfulness journal',
          'Join a mindfulness group',
        ];
        info.color = '#10B981';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low', color: '#EF4444' },
          '11-20': { label: 'Moderate', color: '#F59E0B' },
          '21-30': { label: 'High', color: '#10B981' },
        };
        break;

      case 'burnout':
        info.title = 'Burnout Assessment';
        info.description = 'Your results reflect your current burnout risk.';
        info.recommendations = [
          'Set healthy boundaries',
          'Practice self-care',
          'Take regular breaks',
          'Seek professional support',
        ];
        info.color = '#EF4444';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low Burnout', color: '#10B981' },
          '11-20': { label: 'Moderate Burnout', color: '#F59E0B' },
          '21-30': { label: 'High Burnout', color: '#EF4444' },
        };
        break;

      case 'socialsupport':
        info.title = 'Social Support Survey';
        info.description = 'Your results reflect your level of social support.';
        info.recommendations = [
          'Reach out to friends',
          'Join support groups',
          'Volunteer in community activities',
          'Attend social events',
        ];
        info.color = '#3B82F6';
        info.chartData[0].svg.fill = info.color;
        info.scoreRanges = {
          '0-10': { label: 'Low Support', color: '#EF4444' },
          '11-20': { label: 'Moderate Support', color: '#F59E0B' },
          '21-30': { label: 'High Support', color: '#10B981' },
        };
        break;

      default:
        console.error(`Unknown assessmentType "${assessmentType}"`);
        return null;
    }

    // Determine severity label from scoreRanges
    const matched = Object.entries(info.scoreRanges).find(([range]) => {
      const [min, max] = range.split('-').map(Number);
      return score >= min && score <= max;
    });
    if (matched) info.severity = matched[1].label;

    return info;
  };

  const info = getAssessmentInfo();
  if (!info) return null;

  // Render score interpretation horizontal list
  const renderScoreRanges = () => {
    const ranges = Object.entries(info.scoreRanges)
      .map(([range, data]) => ({ range, ...data }))
      .sort((a, b) => parseInt(a.range) - parseInt(b.range));
    return (
      <View style={styles.scoreRangesContainer}>
        <Text style={styles.sectionTitle}>Interpretation</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scoreRangesScroll}
        >
          {ranges.map(({ range, label, color }) => (
            <View key={range} style={[styles.rangeItem, { borderColor: color }]}>
              <View style={[styles.rangeDot, { backgroundColor: color }]} />
              <Text style={styles.rangeScore}>{range}</Text>
              <Text style={styles.rangeLabel}>{label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title & Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.title}>{info.title}</Text>
          <View style={styles.circle}>
            <Text style={[styles.scoreText, { color: info.color }]}>{score}</Text>
            <Text style={styles.scoreLabel}>of {maxScore}</Text>
          </View>
          <View style={[styles.badge, { borderColor: info.color }]}>
            <Text style={[styles.badgeText, { color: info.color }]}>{info.severity}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Results</Text>
          <Text style={styles.description}>{info.description}</Text>
        </View>

        {renderScoreRanges()}

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {info.recommendations.map((rec, i) => (
            <View key={i} style={styles.recItem}>
              <Text style={[styles.bullet, { color: info.color }]}>•</Text>
              <Text style={styles.recText}>{rec}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: info.color }]}
            onPress={() => navigation.navigate('BookSpecialist')}
          >
            <Text style={styles.btnText}>Book a Specialist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.outline, { borderColor: info.color }]}
            onPress={() => navigation.navigate('ActivityLog')}
          >
            <Text style={[styles.btnText, { color: info.color }]}>
              Explore Self-Help
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: 16, paddingBottom: 32 },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    // elevation: 2,
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreText: { fontSize: 32, fontWeight: '700' },
  scoreLabel: { fontSize: 14, color: '#6B7280' },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  badgeText: { fontSize: 14, fontWeight: '600' },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // elevation: 1,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  description: { fontSize: 16, color: '#4B5563', lineHeight: 22 },
  scoreRangesContainer: { marginBottom: 16 },
  scoreRangesScroll: { paddingLeft: 8, paddingVertical: 12 },
  rangeItem: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  rangeDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 8 },
  rangeScore: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  rangeLabel: { fontSize: 14, textAlign: 'center' },
  recItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: { fontSize: 14, marginRight: 8, lineHeight: 20 },
  recText: { flex: 1, fontSize: 16, color: '#4B5563', lineHeight: 22 },
  actions: { marginTop: 8 },
  btn: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  outline: { backgroundColor: '#FFF', borderWidth: 1 },
});

export default AssessmentResults;
