import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookSpecialistScreen = () => {
  const navigation = useNavigation();
  
  const specialists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      experience: '10+ years',
      rating: '4.9',
      image: require('../../../../src/assets/images/Mental_health/doctor1.png'),
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Psychiatrist',
      experience: '8+ years',
      rating: '4.8',
      image: require('../../../../src/assets/images/Mental_health/doctor2.png'),
    },
    {
      id: 3,
      name: 'Dr. Emily Wilson',
      specialty: 'Counseling Psychologist',
      experience: '7+ years',
      rating: '4.7',
      image: require('../../../../src/assets/images/Mental_health/doctor3.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Specialist</Text>
      </View> */}
      
      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>Find the right specialist for you</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>Search by name, specialty, or condition</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Specialists</Text>
          <View style={styles.specialistsList}>
            {specialists.map((specialist) => (
              <TouchableOpacity 
                key={specialist.id} 
                style={styles.specialistCard}
                onPress={() => navigation.navigate('SpecialistDetail', { specialist })}
              >
                <Image 
                  source={specialist.image} 
                  style={styles.specialistImage} 
                  resizeMode="cover"
                />
                <View style={styles.specialistInfo}>
                  <Text style={styles.specialistName}>{specialist.name}</Text>
                  <Text style={styles.specialty}>{specialist.specialty}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {specialist.rating}</Text>
                    <Text style={styles.experience}>• {specialist.experience} experience</Text>
                  </View>
                </View>
                <View style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 4,
    // Extra styling
    borderWidth: 0,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  specialistsList: {
    gap: 16,
  },
  specialistCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Android shadow
    elevation: 6,
    // Extra styling for better visual appeal
    marginBottom: 1,
    borderWidth: 0,
    // Smooth transition for hover/focus states
    transitionProperty: 'transform, shadow',
    transitionDuration: '0.2s',
  },
  specialistImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#111827',
    marginRight: 8,
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BookSpecialistScreen;
