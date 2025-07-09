import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AssessmentResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Provide default values to prevent undefined errors
  const { 
    score = 0, 
    maxScore = 27, // Default max score for PHQ-9
    assessmentType = 'phq9', 
    answers = {} 
  } = route.params || {};

  // Calculate percentage safely
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  
  // Get assessment-specific information
  const getAssessmentInfo = () => {
    const info = {
      title: 'Depression Assessment',
      description: 'Your results suggest that you may be experiencing some symptoms of depression.',
      recommendations: [
        'Consider talking to a mental health professional',
        'Practice regular physical activity',
        'Maintain a consistent sleep schedule',
        'Connect with friends and family'
      ],
      severity: 'Moderate',
      color: '#FFA500',
      scoreRanges: {
        '0-4': { label: 'Minimal', color: '#10B981' },
        '5-9': { label: 'Mild', color: '#3B82F6' },
        '10-14': { label: 'Moderate', color: '#F59E0B' },
        '15-19': { label: 'Moderately Severe', color: '#F97316' },
        '20-27': { label: 'Severe', color: '#EF4444' }
      },
      chartData: [
        {
          key: 1,
          amount: score,
          svg: { fill: '#FFA500' },
          arc: { outerRadius: '100%', cornerRadius: 5 }
        },
        {
          key: 2,
          amount: maxScore - score,
          svg: { fill: '#E5E7EB' },
          arc: { outerRadius: '100%', cornerRadius: 5 }
        }
      ]
    };

    // Customize based on assessment type
    switch(assessmentType.toLowerCase()) {
      case 'gad7':
        info.title = 'Anxiety Assessment';
        info.description = 'Your results suggest that you may be experiencing some symptoms of anxiety.';
        info.recommendations = [
          'Practice deep breathing exercises',
          'Try mindfulness meditation',
          'Consider professional counseling',
          'Limit caffeine and alcohol intake'
        ];
        info.color = '#4F46E5';
        info.chartData[0].svg.fill = '#4F46E5';
        info.scoreRanges = {
          '0-4': { label: 'Minimal', color: '#10B981' },
          '5-9': { label: 'Mild', color: '#3B82F6' },
          '10-14': { label: 'Moderate', color: '#F59E0B' },
          '15-21': { label: 'Severe', color: '#EF4444' }
        };
        break;
        
      case 'who5':
        info.title = 'Well-Being Assessment';
        info.description = 'Your results provide insight into your current state of well-being.';
        info.recommendations = [
          'Engage in regular physical activity',
          'Maintain social connections',
          'Practice gratitude daily',
          'Ensure adequate sleep'
        ];
        info.color = '#8B5CF6';
        info.chartData[0].svg.fill = '#8B5CF6';
        info.scoreRanges = {
          '0-50': { label: 'Low Well-Being', color: '#EF4444' },
          '51-70': { label: 'Moderate Well-Being', color: '#F59E0B' },
          '71-100': { label: 'High Well-Being', color: '#10B981' }
        };
        break;
        
      case 'stress':
        info.title = 'Stress Assessment';
        info.description = 'Your results indicate your current stress levels.';
        info.recommendations = [
          'Practice relaxation techniques',
          'Take regular breaks',
          'Engage in physical activity',
          'Consider time management strategies'
        ];
        info.color = '#EC4899';
        info.chartData[0].svg.fill = '#EC4899';
        info.scoreRanges = {
          '0-13': { label: 'Low Stress', color: '#10B981' },
          '14-26': { label: 'Moderate Stress', color: '#F59E0B' },
          '27-40': { label: 'High Stress', color: '#EF4444' }
        };
        break;
        
      // Default to PHQ-9 (Depression) assessment
      default:
        info.title = 'Depression Assessment';
        info.scoreRanges = {
          '0-4': { label: 'Minimal', color: '#10B981' },
          '5-9': { label: 'Mild', color: '#3B82F6' },
          '10-14': { label: 'Moderate', color: '#F59E0B' },
          '15-19': { label: 'Moderately Severe', color: '#F97316' },
          '20-27': { label: 'Severe', color: '#EF4444' }
        };
        break;
    }

    return info;
  };

  // Render score ranges in a horizontal scrollable list
  const renderScoreRanges = () => {
    if (!assessmentInfo.scoreRanges) return null;
    
    // Convert score ranges to array and sort them
    const ranges = Object.entries(assessmentInfo.scoreRanges)
      .map(([range, data]) => ({
        range,
        ...data,
        min: parseInt(range.split('-')[0])
      }))
      .sort((a, b) => a.min - b.min);

    return (
      <View style={styles.scoreRangesContainer}>
        <Text style={styles.sectionTitle}>Score Interpretation</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scoreRangesScroll}
        >
          {ranges.map(({ range, label, color }) => (
            <View key={range} style={[styles.rangeItem, { borderColor: color }]}>
              <View style={[styles.rangeColorDot, { backgroundColor: color }]} />
              <Text style={styles.rangeScore}>{range}</Text>
              <Text style={styles.rangeLabel}>{label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render the results screen
  const assessmentInfo = getAssessmentInfo();
  
  // Ensure we have valid data before rendering
  if (!assessmentInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading assessment results...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assessment Results</Text>
      </View> */}
      
      <ScrollView style={styles.content}>
        <View style={styles.scoreContainer}>
          <Text style={styles.assessmentTitle}>{assessmentInfo.title}</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreText, { color: assessmentInfo.color }]}>{score}</Text>
            <Text style={styles.scoreLabel}>out of {maxScore}</Text>
          </View>
          
          <View style={[styles.severityBadge, { borderColor: assessmentInfo.color }]}>
            <Text style={[styles.severityText, { color: assessmentInfo.color }]}>
              {assessmentInfo.severity}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Results</Text>
          <Text style={styles.resultDescription}>{assessmentInfo.description}</Text>
        </View>
        
        {renderScoreRanges()}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsList}>
            {assessmentInfo.recommendations.map((item, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={[styles.bulletPoint, { color: assessmentInfo.color }]}>•</Text>
                <Text style={styles.recommendationText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: assessmentInfo.color }]}
            onPress={() => navigation.navigate('BookSpecialist')}
          >
            <Text style={styles.buttonText}>Book a Specialist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.outlineButton, { borderColor: assessmentInfo.color }]}
            onPress={() => navigation.navigate('ActivityLog')}
          >
            <Text style={[styles.buttonText, { color: assessmentInfo.color }]}>
              Explore Self-Help
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B5563',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  assessmentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderWidth: 10,
    borderColor: '#E5E7EB',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  totalScoreText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  resultDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  scoreRangesContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scoreRangesScroll: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  rangeItem: {
    width: 140,
    height: 100,
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    // Android shadow
    elevation: 60,
    // Smooth transition for hover/focus states
    transitionProperty: 'transform, shadow',
    transitionDuration: '0.1s',
  },
  rangeColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 10,
  },
  rangeScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  rangeLabel: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AssessmentResults;
