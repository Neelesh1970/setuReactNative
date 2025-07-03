import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import the complete schemes data
import { allSchemes } from './allSchemes';

// Government schemes data with categories
const allSchemesList = [
  // Agriculture Related Schemes
  {
    id: '1',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    launchedBy: 'Launched by Prime Minister Narendra Modi on 24 February 2019',
    description: 'PM-KISAN is a Central Sector Scheme with 100% funding from the Government of India. Under the scheme, income support of ₹6,000 per year in three equal installments is provided to all farmer families across the country, subject to certain exclusion criteria.',
    category: '1', // Agriculture
    benefits: [
      'Financial support of ₹6,000 per year in three equal installments of ₹2,000 every four months',
      'Direct Benefit Transfer (DBT) to the bank accounts of the beneficiaries',
      'No middlemen involved in the process',
      'Covers all farmer families across the country without any discrimination'
    ],
    eligibility: 'All farmer families across the country, irrespective of the size of their landholdings, are eligible to receive income support under the scheme. However, certain categories of higher economic status are excluded from the scheme.',
    documentsRequired: [
      'Aadhaar Card',
      'Landholding papers',
      'Bank account details',
      'Aadhaar linked mobile number'
    ],
    officialLink: 'https://pmkisan.gov.in/'
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    launchedBy: 'Launched by Prime Minister Narendra Modi on 18 February 2016',
    description: 'PMFBY is a crop insurance scheme that provides comprehensive insurance coverage against crop failure, helping farmers cope with agricultural risks, and ensuring their credit eligibility for the next season.',
    category: '1', // Agriculture
    benefits: [
      'Low premium rates for farmers (2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops)',
      'No upper limit on government subsidy',
      'Use of technology for quick settlement of claims',
      'Coverage for prevented sowing/planting risk and post-harvest losses'
    ],
    eligibility: 'All farmers including sharecroppers and tenant farmers growing the notified crops in the notified areas are eligible for coverage.',
    documentsRequired: [
      'Land records (Khatauni/Khasra/Girdawari)',
      'Aadhaar Card',
      'Bank account details',
      'Sowing declaration'
    ],
    officialLink: 'https://pmfby.gov.in/'
  },
  {
    id: '3',
    name: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
    launchedBy: 'Launched by Prime Minister Narendra Modi on 1 July 2015',
    description: 'PMKSY aims to enhance physical access of water on farm, expand cultivable area under assured irrigation, improve on-farm water use efficiency, and promote sustainable water conservation practices.',
    category: '1', // Agriculture
    benefits: [
      'Har Khet ko Pani (Water to every field)',
      'Per Drop More Crop (Micro Irrigation)',
      'Integration of water source, distribution and its efficient use',
      'Improving water use efficiency'
    ],
    eligibility: 'Individual farmers, group of farmers, cooperatives, and state governments can avail benefits under different components of the scheme.',
    documentsRequired: [
      'Land ownership documents',
      'Aadhaar Card',
      'Bank account details',
      'Project report (for group projects)'
    ],
    officialLink: 'https://pmksy.gov.in/'
  },
  
  // Rural & Environment Related Schemes
  {
    id: '4',
    name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    launchedBy: 'Launched by Prime Minister Narendra Modi on 20 November 2016',
    description: 'PMAY-G aims to provide a pucca house with basic amenities to all houseless households and those households living in kutcha and dilapidated houses in rural areas by 2024.',
    category: '2', // Rural & Environment
    benefits: [
      'Financial assistance of ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas',
      '90-95 days of unskilled wage labor under MGNREGA',
      'Assistance of ₹12,000 for construction of toilets through Swachh Bharat Mission-Gramin',
      'Convergence with other government schemes for LPG connection, electricity connection, etc.'
    ],
    eligibility: 'Beneficiaries are identified based on housing deprivation parameters in the Socio-Economic and Caste Census (SECC) 2011 data.',
    documentsRequired: [
      'Aadhaar Card',
      'SECC 2011 data reference',
      'Bank account details',
      'Land ownership documents'
    ],
    officialLink: 'https://pmayg.nic.in/'
  },
  {
    id: '5',
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    launchedBy: 'Launched on 2 February 2006',
    description: 'MGNREGA aims to enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
    category: '2', // Rural & Environment
    benefits: [
      'Guaranteed 100 days of wage employment in a financial year',
      'One-third of the beneficiaries are to be women',
      'Wage payment within 15 days of work completion',
      'Unemployment allowance if work is not provided within 15 days'
    ],
    eligibility: 'Any rural household whose adult members are willing to do unskilled manual work can apply for job cards under MGNREGA.',
    documentsRequired: [
      'Aadhaar Card',
      'Job Card',
      'Bank account details',
      'Muster roll attendance'
    ],
    officialLink: 'https://nrega.nic.in/'
  },
  
  // Banking & Financial Services
  {
    id: '6',
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    launchedBy: 'Launched on 28 August 2014',
    description: 'Financial inclusion program providing access to banking services, insurance, and pension.',
    category: '3', // Banking, Financial Services
  },
  {
    id: '7',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    launchedBy: 'Launched on 8 April 2015',
    description: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.',
    category: '3', // Banking, Financial Services
  },
  {
    id: '8',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    launchedBy: 'Launched on 22 January 2015',
    description: 'Small savings scheme for girl child, offering attractive interest rate and tax benefits.',
    category: '3', // Banking, Financial Services
  },
  
  // Business & Entrepreneurship
  {
    id: '9',
    name: 'Startup India',
    launchedBy: 'Launched on 16 January 2016',
    description: 'Action plan to boost startup businesses and entrepreneurs in India.',
    category: '4', // Business & Entrepreneurship
  },
  {
    id: '10',
    name: 'Stand Up India',
    launchedBy: 'Launched on 5 April 2016',
    description: 'Bank loans between 10 lakh and 1 crore for SC/ST and women entrepreneurs.',
    category: '4', // Business & Entrepreneurship
  },
  
  // Health & Wellness
  {
    id: '11',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    launchedBy: 'Launched on 23 September 2018',
    description: 'Health insurance scheme providing coverage of ₹5 lakhs per family per year.',
    category: '6', // Health & Wellness
  },
  
  // Education & Learning
  {
    id: '12',
    name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    launchedBy: 'Launched on 15 July 2015',
    description: 'Skill development initiative providing industry-relevant training to youth.',
    category: '5', // Education & Learning
  },
];

const SchemeListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName } = route.params;
  
  // Filter schemes based on the selected category
  const filteredSchemes = allSchemes.filter(scheme => scheme.category === categoryId);
  
  // Debug log to check the data being passed
  React.useEffect(() => {
    console.log('Filtered schemes:', filteredSchemes);
  }, [filteredSchemes]);

  const handleSchemePress = (scheme) => {
    navigation.navigate('SchemeDetail', {
      schemeId: scheme.id,
      schemeTitle: scheme.name,
      scheme: scheme // Keep the full scheme object as well for backward compatibility
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {categoryName}
        </Text>
        <View style={styles.docIconContainer}>
          <Text style={styles.docIcon}>📄</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <TouchableOpacity 
              key={scheme.id} 
              style={styles.card}
              onPress={() => handleSchemePress(scheme)}
              activeOpacity={0.8}
            >
              <Text style={styles.schemeName}>{scheme.name}</Text>
              <Text style={styles.launchedBy}>{scheme.launchedBy}</Text>
              <Text style={styles.schemeDesc} numberOfLines={2}>{scheme.description}</Text>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No schemes found for this category</Text>
          </View>
        )}
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
    borderBottomWidth: 0.4,
    borderBottomColor: '#e0e0e0',
    marginBottom: 6,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 30,
    color: '#37492f',
  },
  headerTitle: {
    flex: 1,
    color: '#234522',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 30,
  },
  docIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  docIcon: {
    fontSize: 22,
    color: '#4A6F44',
  },
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  schemeName: {
    color: '#2663ac',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  launchedBy: {
    color: '#8896aa',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  schemeDesc: {
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginRight: 20, // Add space for the arrow
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  arrow: {
    fontSize: 24,
    color: '#2663ac',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SchemeListScreen;
