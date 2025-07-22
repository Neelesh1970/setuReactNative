import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking, Alert } from 'react-native';

const schemeList = [
  {
    id: 'wellnessCenters',
    title: 'Wellness Centers',
    subtitle: 'Health & Wellness Centres (AB-HWC)',
    description:
      'Comprehensive primary healthcare services delivered at the community level under Ayushman Bharat Health & Wellness Centres.',
  },
  {
    id: 'pmjayFacilities',
    title: 'Ayushman Bharat – PMJAY',
    subtitle: 'Secondary & Tertiary Care Hospitalization',
    description:
      'Provides coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization under the Pradhan Mantri Jan Arogya Yojana.',
  },
  {
    id: 'pmbjpStores',
    title: 'Jan Aushadhi Stores',
    subtitle: 'Affordable Generic Medicines',
    description:
      'Ensures access to quality generic medicines at significantly reduced prices through dedicated Janaushadhi Kendras across India.',
  },
  {
    id: 'ayushHospitals',
    title: 'AYUSH Hospitals',
    subtitle: 'Traditional Medicine Services',
    description:
      'Offers treatment and preventive healthcare services in Ayurveda, Yoga, Unani, Siddha and Homeopathy at accredited AYUSH centres.',
  },
  {
    id: 'healthInfrastructure',
    title: 'Health Infrastructure',
    subtitle: 'Public Health Facilities Network',
    description:
      'Includes Primary Health Centres, Community Health Centres, District Hospitals and other state & central government health facilities nationwide.',
  },
];
const HealthDataScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const handleSchemePress = async (schemeId) => {
    try {
      setLoading(true);
      
      // Navigate based on the selected scheme
      switch(schemeId) {
        case 'wellnessCenters':
          // Navigate to Wellness Centers screen with API endpoint
          navigation.navigate('SchemeDetail', {
            title: 'Wellness Centers',
            apiEndpoint: 'https://api.data.gov.in/resource/cc81fb9f-934d-4e0c-9b96-c5d9139f4d8e',
            schemeType: 'wellness-centers'
          });
          break;
          
        case 'pmjayFacilities':
          // Navigate to PMJAY Facilities screen with DLHS-4 health infrastructure data
          navigation.navigate('SchemeDetail', {
            title: 'Health Infrastructure (DLHS-4)',
            apiEndpoint: 'https://api.data.gov.in/resource/cc81fb9f-934d-4e0c-9b96-c5d9139f4d8e?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=50',
            schemeType: 'pmjay-facilities',
            description: 'Health infrastructure data from District Level Household and Facility Survey (DLHS-4) 2012-13'
          });
          break;
          
        case 'pmbjpStores':
          // Navigate to Jan Aushadhi Stores screen with sample data
          navigation.navigate('SchemeDetail', {
            title: 'Jan Aushadhi Stores',
            schemeType: 'jan-aushadhi-stores',
            description: 'Find nearby Jan Aushadhi Kendras offering quality generic medicines at affordable prices.'
          });
          break;
          
        case 'ayushHospitals':
          // Navigate to AYUSH Hospitals screen with API endpoint
          navigation.navigate('SchemeDetail', {
            title: 'AYUSH Hospitals',
            apiEndpoint: 'https://api.data.gov.in/resource/your-ayush-hospitals-api-endpoint',
            schemeType: 'ayush-hospitals'
          });
          break;
          
        case 'healthInfrastructure':
          // Navigate to Health Infrastructure screen with API endpoint
          navigation.navigate('SchemeDetail', {
            title: 'Health Infrastructure',
            apiEndpoint: 'https://api.data.gov.in/resource/32dd2f54-3359-4e91-90dd-195267900680',
            schemeType: 'health-infrastructure'
          });
          break;
          
        default:
          console.log('Unknown scheme selected');
      }
    } catch (error) {
      console.error('Error navigating to scheme:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Schemes</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        {schemeList.map((scheme) => (
          <TouchableOpacity
            key={scheme.id}
            style={[styles.card, styles.elevation]}
            onPress={() => handleSchemePress(scheme.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{scheme.title}</Text>
                <Text style={styles.subtitle}>{scheme.subtitle}</Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                  {scheme.description}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Text style={styles.arrow}>›</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
    color: 'black',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HealthDataScreen;
