// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const features = [
  {
    title: 'Analyze Food',
    icon: 'restaurant-outline',
    screen: 'AnalyzeFood',
    color: '#3B5CFF',
  },
  {
    title: 'Nutrition Advice',
    icon: 'nutrition-outline',
    screen: 'NutritionAdvice',
    color: '#5F7FFF',
  },
  {
    title: 'Workout Plan',
    icon: 'barbell-outline',
    screen: 'WorkoutPlan',
    color: '#1C39BB',
  },
  {
    title: 'Exercise Details',
    icon: 'fitness-outline',
    screen: 'ExerciseDetails',
    color: '#93ADFF',
  },
  {
    title: 'Browse Exercises',
    icon: 'body-outline',
    screen: 'BrowseExercises',
    color: '#2D52D0',
  },
];

export default function GymHomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={36} color="#fff" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1C39BB" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>🏋️ FitLife Coach</Text>
        <Text style={styles.subtitle}>Your Personal AI Fitness Assistant</Text>
      </View>
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#1C39BB',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  grid: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    width: width * 0.42,
    height: 130,
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
