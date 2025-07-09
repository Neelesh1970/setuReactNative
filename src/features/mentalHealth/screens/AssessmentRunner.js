import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  PHQ9_QUESTIONS, 
  GAD7_QUESTIONS, 
  PHQ15_QUESTIONS, 
  PCL5_QUESTIONS,
  WHO5_QUESTIONS,
  STRESS_QUESTIONS,
  SLEEP_QUESTIONS,
  MOOD_QUESTIONS,
  SELF_ESTEEM_QUESTIONS,
  RESILIENCE_QUESTIONS,
  MINDFULNESS_QUESTIONS,
  BURNOUT_QUESTIONS,
  SOCIAL_SUPPORT_QUESTIONS
} from '../api/assessments';

const ASSESSMENTS = {
  // Depression Assessment
  phq9: {
    title: 'PHQ-9 Depression Assessment',
    description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    questions: PHQ9_QUESTIONS,
    scale: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day'
    ],
    maxScore: 27,
    interpretation: (score) => {
      if (score >= 20) return 'Severe depression';
      if (score >= 15) return 'Moderately severe depression';
      if (score >= 10) return 'Moderate depression';
      if (score >= 5) return 'Mild depression';
      return 'Minimal or no depression';
    }
  },
  
  // Anxiety Assessment
  gad7: {
    title: 'GAD-7 Anxiety Assessment',
    description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    questions: GAD7_QUESTIONS,
    scale: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day'
    ],
    maxScore: 21,
    interpretation: (score) => {
      if (score >= 15) return 'Severe anxiety';
      if (score >= 10) return 'Moderate anxiety';
      if (score >= 5) return 'Mild anxiety';
      return 'Minimal or no anxiety';
    }
  },
  
  // Well-being Assessment
  who5: {
    title: 'WHO-5 Well-Being Index',
    description: 'How have you been feeling over the last 2 weeks?',
    questions: WHO5_QUESTIONS,
    scale: [
      'At no time',
      'Some of the time',
      'Less than half the time',
      'More than half the time',
      'Most of the time',
      'All of the time'
    ],
    maxScore: 25,
    interpretation: (score) => {
      const percentage = (score / 25) * 100;
      if (percentage < 28) return 'Low well-being (possible depression)';
      if (percentage < 50) return 'Below average well-being';
      if (percentage < 72) return 'Moderate well-being';
      return 'High well-being';
    }
  },
  
  // Stress Assessment
  stress: {
    title: 'Perceived Stress Assessment',
    description: 'In the last month, how often have you felt or thought the following?',
    questions: STRESS_QUESTIONS,
    scale: [
      'Never',
      'Almost never',
      'Sometimes',
      'Fairly often',
      'Very often'
    ],
    maxScore: 40,
    interpretation: (score) => {
      if (score >= 27) return 'High perceived stress';
      if (score >= 20) return 'Moderate stress';
      if (score >= 14) return 'Moderate stress';
      return 'Low perceived stress';
    }
  },
  
  // Sleep Assessment
  sleep: {
    title: 'Sleep Quality Assessment',
    description: 'Please answer these questions about your sleep in the past month',
    questions: SLEEP_QUESTIONS,
    scale: [
      'Very good',
      'Fairly good',
      'Fairly bad',
      'Very bad'
    ],
    maxScore: 24,
    interpretation: (score) => {
      if (score >= 16) return 'Poor sleep quality';
      if (score >= 10) return 'Moderate sleep quality';
      return 'Good sleep quality';
    }
  },
  
  // Mood Assessment
  mood: {
    title: 'Mood Assessment',
    description: 'Please rate your current mood and feelings',
    questions: MOOD_QUESTIONS,
    scale: [
      'Very poor',
      'Poor',
      'Fair',
      'Good',
      'Excellent'
    ],
    maxScore: 35,
    interpretation: (score) => {
      const percentage = (score / 35) * 100;
      if (percentage < 30) return 'Low mood';
      if (percentage < 60) return 'Moderate mood';
      return 'Positive mood';
    }
  },
  
  // Self-Esteem Assessment
  selfEsteem: {
    title: 'Self-Esteem Assessment',
    description: 'Please indicate how strongly you agree or disagree with each statement',
    questions: SELF_ESTEEM_QUESTIONS,
    scale: [
      'Strongly agree',
      'Agree',
      'Disagree',
      'Strongly disagree'
    ],
    maxScore: 30,
    interpretation: (score) => {
      if (score >= 25) return 'High self-esteem';
      if (score >= 15) return 'Moderate self-esteem';
      return 'Low self-esteem';
    }
  },
  
  // Resilience Assessment
  resilience: {
    title: 'Resilience Assessment',
    description: 'Please indicate how much you agree with each statement',
    questions: RESILIENCE_QUESTIONS,
    scale: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree'
    ],
    maxScore: 30,
    interpretation: (score) => {
      if (score >= 24) return 'High resilience';
      if (score >= 18) return 'Moderate resilience';
      return 'Low resilience';
    }
  },
  
  // Mindfulness Assessment
  mindfulness: {
    title: 'Mindfulness Assessment',
    description: 'Please indicate how frequently or infrequently you have had each experience',
    questions: MINDFULNESS_QUESTIONS,
    scale: [
      'Almost always',
      'Very frequently',
      'Somewhat frequently',
      'Somewhat infrequently',
      'Very infrequently',
      'Almost never'
    ],
    maxScore: 42,
    interpretation: (score) => {
      const average = score / MINDFULNESS_QUESTIONS.length;
      if (average >= 5) return 'High mindfulness';
      if (average >= 3) return 'Moderate mindfulness';
      return 'Low mindfulness';
    }
  },
  
  // Burnout Assessment
  burnout: {
    title: 'Burnout Assessment',
    description: 'How often do you experience the following feelings?',
    questions: BURNOUT_QUESTIONS,
    scale: [
      'Never',
      'Rarely',
      'Sometimes',
      'Often',
      'Always'
    ],
    maxScore: 35,
    interpretation: (score) => {
      if (score >= 28) return 'High risk of burnout';
      if (score >= 21) return 'Moderate risk of burnout';
      if (score >= 14) return 'Mild risk of burnout';
      return 'Low risk of burnout';
    }
  },
  
  // Social Support Assessment
  socialSupport: {
    title: 'Social Support Assessment',
    description: 'Please indicate how strongly you agree with each statement',
    questions: SOCIAL_SUPPORT_QUESTIONS,
    scale: [
      'Very strongly disagree',
      'Strongly disagree',
      'Mildly disagree',
      'Neutral',
      'Mildly agree',
      'Strongly agree',
      'Very strongly agree'
    ],
    maxScore: 63,
    interpretation: (score) => {
      const average = score / SOCIAL_SUPPORT_QUESTIONS.length;
      if (average >= 6) return 'Very high social support';
      if (average >= 5) return 'High social support';
      if (average >= 4) return 'Moderate social support';
      if (average >= 3) return 'Low social support';
      return 'Very low social support';
    }
  },
  
  // Somatic Symptoms Assessment
  phq15: {
    title: 'PHQ-15 Somatic Symptom Severity',
    description: 'During the past 4 weeks, how much have you been bothered by any of the following problems?',
    questions: PHQ15_QUESTIONS,
    scale: [
      'Not bothered at all',
      'Bothered a little',
      'Bothered a lot'
    ],
    maxScore: 30,
    interpretation: (score) => {
      if (score >= 15) return 'High somatic symptom severity';
      if (score >= 10) return 'Medium somatic symptom severity';
      return 'Low somatic symptom severity';
    }
  },
  
  // PTSD Assessment
  pcl5: {
    title: 'PCL-5 PTSD Assessment',
    description: 'In the past month, how much were you bothered by:',
    questions: PCL5_QUESTIONS,
    scale: [
      'Not at all',
      'A little bit',
      'Moderately',
      'Quite a bit',
      'Extremely'
    ],
    maxScore: 80,
    interpretation: (score) => {
      if (score >= 38) return 'Probable PTSD';
      if (score >= 28) return 'Moderate PTSD symptoms';
      if (score >= 15) return 'Mild PTSD symptoms';
      return 'Minimal or no PTSD symptoms';
    }
  }
};

const AssessmentRunner = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const assessment = ASSESSMENTS[type] || ASSESSMENTS.phq9; // Default to PHQ-9 if type not found
  const totalQuestions = assessment.questions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  
  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(newAnswers);
    
    // Move to next question if not the last one
    if (questionIndex < totalQuestions - 1) {
      setCurrentQuestion(questionIndex + 1);
    }
  };
  
  const calculateScore = (answerMap) => {
    let total = 0;
    for (let i = 0; i < totalQuestions; i++) {
      total += answerMap[i] || 0;
    }
    return total;
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmit = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Calculate the final score
      const calculatedScore = calculateScore(answers);
      const maxPossibleScore = assessment.scale.length * assessment.questions.length;
      
      // Navigate to results screen using push
      navigation.push('AssessmentResults', {
        score: calculatedScore,
        maxScore: maxPossibleScore,
        assessmentType: type || 'phq9',
        answers: answers
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progress = (currentQuestion + 1) / totalQuestions;
  
  if (isSubmitting) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Submitting...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{assessment.title}</Text>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>
        <ProgressBar progress={progress} color="#6200ee" style={styles.progressBar} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.question}>
          {assessment.questions[currentQuestion]}
        </Text>
        
        <View style={styles.optionsContainer}>
          {assessment.scale.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[currentQuestion] === index && styles.selectedOption
              ]}
              onPress={() => handleAnswer(currentQuestion, index)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <Text style={styles.optionValue}>({index})</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={handlePrevious}
          disabled={currentQuestion === 0 || isSubmitting}
          style={[styles.navButton, isSubmitting && styles.disabledButton]}
        >
          Previous
        </Button>
        <Text style={styles.pageIndicator}>
          {currentQuestion + 1} / {totalQuestions}
        </Text>
        {isLastQuestion ? (
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={answers[currentQuestion] === undefined || isSubmitting}
            style={[
              styles.submitButton, 
              (answers[currentQuestion] === undefined || isSubmitting) && styles.disabledButton
            ]}
            contentStyle={styles.submitButtonContent}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        ) : (
          <View style={{ width: 100 }} />
        )}
      </View>
    </View>
  );
};

const getAssessmentFeedback = (score, type) => {
  if (type === 'phq9') {
    if (score >= 20) return 'Your score suggests severe depression. We strongly recommend reaching out to a mental health professional for support.';
    if (score >= 15) return 'Your score suggests moderately severe depression. Consider speaking with a healthcare provider about your symptoms.';
    if (score >= 10) return 'Your score suggests moderate depression. You might benefit from talking to someone about how you\'re feeling.';
    if (score >= 5) return 'Your score suggests mild depression. Pay attention to your mood and consider self-care strategies.';
    return 'Your score suggests minimal or no depression. Continue to prioritize your mental well-being.';
  }
  
  if (type === 'gad7') {
    if (score >= 15) return 'Your score suggests severe anxiety. We recommend reaching out to a mental health professional for support.';
    if (score >= 10) return 'Your score suggests moderate anxiety. Consider speaking with a healthcare provider about your symptoms.';
    if (score >= 5) return 'Your score suggests mild anxiety. You might find relaxation techniques helpful.';
    return 'Your score suggests minimal or no anxiety. Continue to prioritize your mental well-being.';
  }
  
  return 'Thank you for completing this assessment. Please discuss your results with a healthcare professional.';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  progressText: {
    color: '#6c757d',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 30,
    lineHeight: 28,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#6200ee',
    backgroundColor: '#f3e5ff',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  optionValue: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  navButton: {
    minWidth: 100,
    marginRight: 10,
  },
  submitButton: {
    minWidth: 120,
    backgroundColor: '#6200ee',
  },
  submitButtonContent: {
    height: 44,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#9e9e9e',
  },
  pageIndicator: {
    color: '#6c757d',
    fontSize: 16,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  interpretation: {
    fontSize: 20,
    color: '#6200ee',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    lineHeight: 24,
  },
  completeButton: {
    margin: 20,
    paddingVertical: 8,
  },
});

export default AssessmentRunner;
