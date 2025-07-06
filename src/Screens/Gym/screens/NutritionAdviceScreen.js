import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { getNutritionAdvice } from '../api/apiService';

export default function NutritionAdviceScreen() {
  const [weight, setWeight] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!weight || !target) return;
    Keyboard.dismiss();
    setLoading(true);
    setResult(null);
    const payload = {
      goal: 'Lose weight',
      dietary_restrictions: ['Vegetarian'],
      current_weight: parseInt(weight),
      target_weight: parseInt(target),
      daily_activity_level: 'Moderate',
      lang: 'en',
    };
    try {
      const data = await getNutritionAdvice(payload);
      setResult(data);
    } catch {
      setResult({ error: 'API error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🍏 Nutrition Advice</Text>

      <TextInput
        placeholder="Current Weight (kg)"
        keyboardType="numeric"
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Target Weight (kg)"
        keyboardType="numeric"
        style={styles.input}
        value={target}
        onChangeText={setTarget}
      />

      <TouchableOpacity style={styles.button} onPress={handleGetAdvice}>
        <Text style={styles.buttonText}>
          {loading ? 'Calculating...' : 'Get Advice'}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Advice:</Text>
          <Text style={styles.resultText}>
            {JSON.stringify(result, null, 2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6FC',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C39BB',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1C39BB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#1C39BB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 13,
    color: '#444',
    fontFamily: 'Courier',
  },
});
