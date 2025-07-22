import axios from 'axios';

const API_BASE_URL = 'https://your-api-endpoint.com/mental-health';

export const fetchAssessments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assessments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};

export const submitAssessment = async (assessmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/assessments/submit`, assessmentData);
    return response.data;
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

// PHQ-9 Assessment (Patient Health Questionnaire)
export const PHQ9_QUESTIONS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself or that you are a failure',
  'Trouble concentrating on things',
  'Moving or speaking slowly or being fidgety',
  'Thoughts that you would be better off dead'
];

// GAD-7 Assessment (Generalized Anxiety Disorder)
export const GAD7_QUESTIONS = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen'
];

// PHQ-15 Assessment (Somatic Symptom Severity)
export const PHQ15_QUESTIONS = [
  'Stomach pain',
  'Back pain',
  'Pain in your arms, legs, or joints',
  'Menstrual cramps or other problems with your periods',
  'Headaches',
  'Chest pain',
  'Dizziness',
  'Fainting spells',
  'Feeling your heart pound or race',
  'Shortness of breath',
  'Pain or problems during sexual intercourse',
  'Constipation, loose bowels, or diarrhea',
  'Nausea, gas, or indigestion',
  'Feeling tired or having low energy',
  'Trouble sleeping'
];

// PCL-5 Assessment (PTSD Checklist)
export const PCL5_QUESTIONS = [
  'Repeated, disturbing, and unwanted memories of the stressful experience?',
  'Repeated, disturbing dreams of the stressful experience?',
  'Suddenly feeling or acting as if the stressful experience were actually happening again?',
  'Feeling very upset when something reminded you of the stressful experience?',
  'Having strong physical reactions when something reminded you of the stressful experience?',
  'Avoiding memories, thoughts, or feelings related to the stressful experience?',
  'Avoiding external reminders of the stressful experience?',
  'Trouble remembering important parts of the stressful experience?',
  'Having strong negative beliefs about yourself, other people, or the world?',
  'Blaming yourself or someone else for the stressful experience?'
];

// WHO-5 Well-Being Index
export const WHO5_QUESTIONS = [
  'I have felt cheerful and in good spirits',
  'I have felt calm and relaxed',
  'I have felt active and vigorous',
  'I woke up feeling fresh and rested',
  'My daily life has been filled with things that interest me'
];

// Perceived Stress Scale (PSS)
export const STRESS_QUESTIONS = [
  'In the last month, how often have you been upset because of something that happened unexpectedly?',
  'In the last month, how often have you felt that you were unable to control the important things in your life?',
  'In the last month, how often have you felt nervous and stressed?',
  'In the last month, how often have you felt confident about your ability to handle your personal problems?',
  'In the last month, how often have you felt that things were going your way?',
  'In the last month, how often have you found that you could not cope with all the things that you had to do?',
  'In the last month, how often have you been able to control irritations in your life?',
  'In the last month, how often have you felt that you were on top of things?'
];

// Pittsburgh Sleep Quality Index (Short Version)
export const SLEEP_QUESTIONS = [
  'During the past month, how would you rate your sleep quality overall?',
  'During the past month, how long has it usually taken you to fall asleep each night?',
  'During the past month, how many hours of actual sleep did you get at night?',
  'During the past month, how often have you had trouble sleeping because you cannot get to sleep within 30 minutes?',
  'During the past month, how often have you had trouble sleeping because you wake up in the middle of the night or early morning?',
  'During the past month, how often have you had trouble sleeping because you have to get up to use the bathroom?',
  'During the past month, how often have you had trouble sleeping because you cannot breathe comfortably?',
  'During the past month, how often have you had trouble sleeping because you have pain?'
];

// Mood Assessment
export const MOOD_QUESTIONS = [
  'How would you rate your overall mood today?',
  'How energetic do you feel today?',
  'How motivated do you feel today?',
  'How well were you able to concentrate today?',
  'How satisfied are you with your daily activities today?',
  'How would you rate your ability to handle problems today?',
  'How would you rate your social interactions today?'
];

// Rosenberg Self-Esteem Scale
export const SELF_ESTEEM_QUESTIONS = [
  'I feel that I am a person of worth, at least on an equal plane with others.',
  'I feel that I have a number of good qualities.',
  'All in all, I am inclined to feel that I am a failure.',
  'I am able to do things as well as most other people.',
  'I feel I do not have much to be proud of.',
  'I take a positive attitude toward myself.',
  'On the whole, I am satisfied with myself.',
  'I wish I could have more respect for myself.',
  'I certainly feel useless at times.',
  'At times I think I am no good at all.'
];

// Brief Resilience Scale
export const RESILIENCE_QUESTIONS = [
  'I tend to bounce back quickly after hard times.',
  'I have a hard time making it through stressful events.',
  'It does not take me long to recover from a stressful event.',
  'It is hard for me to snap back when something bad happens.',
  'I usually come through difficult times with little trouble.',
  'I tend to take a long time to get over set-backs in my life.'
];

// Mindful Attention Awareness Scale (MAAS)
export const MINDFULNESS_QUESTIONS = [
  'I could be experiencing some emotion and not be conscious of it until some time later.',
  'I break or spill things because of carelessness, not paying attention, or thinking of something else.',
  'I find it difficult to stay focused on what is happening in the present.',
  'I tend to walk quickly to get where I am going without paying attention to what I experience along the way.',
  'I tend not to notice feelings of physical tension or discomfort until they really grab my attention.',
  'I forget a person’s name almost as soon as I’ve been told it for the first time.',
  'I find myself listening to someone with one ear, doing something else at the same time.'
];

// Copenhagen Burnout Inventory (Short Version)
export const BURNOUT_QUESTIONS = [
  'How often do you feel tired?',
  'How often are you physically exhausted?',
  'How often are you emotionally exhausted?',
  'How often do you think: "I can’t take it anymore"?',
  'How often do you feel worn out?',
  'How often do you feel weak and susceptible to illness?',
  'How often do you feel that you are in a state of total exhaustion?'
];

// Multidimensional Scale of Perceived Social Support
export const SOCIAL_SUPPORT_QUESTIONS = [
  'There is a special person who is around when I am in need.',
  'There is a special person with whom I can share my joys and sorrows.',
  'My family really tries to help me.',
  'I get the emotional help and support I need from my family.',
  'I have a special person who is a real source of comfort to me.',
  'My friends really try to help me.',
  'I can count on my friends when things go wrong.',
  'I can talk about my problems with my family.',
  'I have friends with whom I can share my joys and sorrows.'
];
