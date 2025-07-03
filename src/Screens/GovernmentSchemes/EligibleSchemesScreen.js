import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// Sample data for enrolled schemes
const enrolledSchemes = [
  {
    id: '6', // Matches the ID in SchemeOverviewScreen
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    appliedOn: '28 Aug 2024',
  },
  {
    id: 'msy', // Matches the ID in SchemeOverviewScreen
    name: 'Mukhyamantri Swasthya Yojana',
    appliedOn: '15 Sep 2024',
  },
  {
    id: '1', // Matches the ID in SchemeOverviewScreen
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    appliedOn: '01 Oct 2024',
  },
];

const EligibleSchemesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userDetails } = route.params || {};
  const { userData, profileData } = useSelector((state) => state.user);
  
  // Try to get the name from different possible locations in the user data
  const userName = profileData?.name || 
                  userData?.name || 
                  userDetails?.name || 
                  'User';
  const activeCount = enrolledSchemes.length;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header background with rounded bottom corners */}
      <View style={styles.topBackground} />

      {/* Greeting Card */}
      <View style={styles.greetingCardContainer}>
        <View style={styles.greetingCard}>
          <Text style={styles.greetingText}>👋 Hello, {userName}!</Text>
          <Text style={styles.greetingSubtext}>
            You have {activeCount} active scheme{activeCount > 1 ? 's' : ''} enrolled
          </Text>
        </View>
      </View>

      {/* Schemes Enrolled Section */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Schemes Enrolled</Text>
        {enrolledSchemes.map((scheme) => (
          <TouchableOpacity 
            key={scheme.id} 
            style={styles.schemeCard}
            onPress={() => navigation.navigate('SchemeOverview', { schemeId: scheme.id })}
          >
            <View style={styles.cardContent}>
              {/* Icon placeholder using emoji */}
              <View style={styles.iconWrapper}>
                <Text style={styles.iconEmoji}>🏛️</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.schemeName}>{scheme.name}</Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.appliedOn}>Applied: {scheme.appliedOn}</Text>
                  <View style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 188,
    backgroundColor: '#C9DBF7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greetingCardContainer: {
    paddingHorizontal: 16,
    marginTop: 65,
    marginBottom: 30, // Added more space below the greeting card
  },
  greetingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#234522',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 0, // Reduced top padding since we added margin to greeting card
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    marginTop: 20, // Added more space above the section title
    marginLeft: 17, // Align with the cards
  },
  schemeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 17,
    width: '88%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconEmoji: {
    fontSize: 24,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a4ca0',
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  appliedOn: {
    fontSize: 12,
    color: '#4A6F44',
    opacity: 0.8,
  },
  viewDetailsButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#4A6F44',
    fontWeight: '500',
  },
});

export default EligibleSchemesScreen;
