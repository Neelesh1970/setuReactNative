import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card, Divider } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const LIMIT = 20;

// Map schemeType to its Data.gov.in resource URL or placeholder
// Sample AYUSH hospitals data
const AYUSH_HOSPITALS = [
  {
    id: 1,
    name: 'National Institute of Ayurveda',
    type: 'Ayurveda',
    address: 'Jorawar Singh Gate, Amer Road, Jaipur, Rajasthan',
    phone: '0141-2635217',
    email: 'director.nia@gov.in',
    website: 'www.nia.nic.in',
    specialization: 'Panchakarma, Kayachikitsa, Shalya Tantra',
    beds: 300,
    established: 1976
  },
  {
    id: 2,
    name: 'Institute of Post Graduate Teaching & Research in Ayurveda',
    type: 'Ayurveda',
    address: 'Gujarat Ayurved University Campus, Jamnagar, Gujarat',
    phone: '0288-2676859',
    email: 'ipgtrajam@gmail.com',
    website: 'www.ayurveduniversity.edu.in',
    specialization: 'Ayurvedic Medicine, Surgery, Pediatrics',
    beds: 250,
    established: 1956
  },
  {
    id: 3,
    name: 'National Institute of Siddha',
    type: 'Siddha',
    address: 'Tambaram Sanatorium, Chennai, Tamil Nadu',
    phone: '044-22411611',
    email: 'director@nischennai.org',
    website: 'www.nischennai.org',
    specialization: 'Siddha Medicine, Varmam, Thokkanam',
    beds: 150,
    established: 2005
  },
  {
    id: 4,
    name: 'National Institute of Homoeopathy',
    type: 'Homoeopathy',
    address: 'Block GE, Sector III, Salt Lake, Kolkata',
    phone: '033-23357526',
    email: 'director@nih.nic.in',
    website: 'www.nih.nic.in',
    specialization: 'Classical Homoeopathy, Repertory',
    beds: 200,
    established: 1975
  },
  {
    id: 5,
    name: 'National Institute of Naturopathy',
    type: 'Naturopathy',
    address: 'Tukaramrao Patwardhan Marg, Bapu Bhavan, Pune',
    phone: '020-26059688',
    email: 'ninpune@rediffmail.com',
    website: 'www.punenin.org',
    specialization: 'Naturopathy, Yoga, Diet Therapy',
    beds: 100,
    established: 1986
  }
];

// Map schemeType to its Data.gov.in resource URL or placeholder
const ENDPOINTS = {
  'wellness-centers': 'https://api.data.gov.in/resource/bee12d81-2002-4732-a352-92a82395f7a6',
  'health-infrastructure': 'https://api.data.gov.in/resource/32dd2f54-3359-4e91-90dd-195267900680',
};

export default function SchemeDetailScreen() {
  const navigation = useNavigation();
  const { title, schemeType, apiEndpoint } = useRoute().params;

  React.useLayoutEffect(() => {
    let header = title || 'Scheme Details';
    if (schemeType === 'pmjay-facilities') header = 'PMJAY Hospitals';
    else if (schemeType === 'wellness-centers') header = 'Wellness Centers';
    else if (schemeType === 'ayush-hospitals') header = 'AYUSH Hospitals';
    else if (schemeType === 'health-infrastructure') header = 'Health Infrastructure';
    navigation.setOptions({ title: header });
  }, [navigation, title, schemeType]);

  const [schemeData, setSchemeData]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [refreshing, setRefreshing]   = useState(false);
  const [error, setError]             = useState(null);

  const getEndpointFor = () => {
    if (schemeType === 'pmjay-facilities') {
      return 'https://api.data.gov.in/resource/cc81fb9f-934d-4e0c-9b96-c5d9139f4d8e?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=50';
    }
    return apiEndpoint || ENDPOINTS[schemeType] || apiEndpoint;
  };

  const fetchData = async () => {
    // Don't refetch if we already have data
    if (schemeData.length > 0) {
      return;
    }
    
    // For AYUSH hospitals, use the sample data
    if (schemeType === 'ayush-hospitals') {
      setSchemeData(AYUSH_HOSPITALS);
      setLoading(false);
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      // Handle Jan Aushadhi stores (sample data)
      if (schemeType === 'jan-aushadhi-stores') {
        const sampleStores = [
          { id: 1, name: 'Jan Aushadhi Kendra', address: 'Civil Hospital Campus, Sector 6, New Delhi', phone: '011-12345678', timings: '9:00 AM - 9:00 PM', distance: '1.2 km' },
          { id: 2, name: 'Pradhan Mantri Bhartiya Janaushadhi Kendra', address: 'Near Metro Station, Connaught Place, New Delhi', phone: '011-87654321', timings: '8:00 AM - 8:00 PM', distance: '2.5 km' },
          { id: 3, name: 'Jan Aushadhi Medical Store', address: 'Main Market, Lajpat Nagar, New Delhi', phone: '011-23456789', timings: '10:00 AM - 10:00 PM', distance: '3.1 km' }
        ];
        setSchemeData(sampleStores);
        setLoading(false);
        return;
      }
      
      // Handle PMJAY facilities (DLHS-4 data)
      if (schemeType === 'pmjay-facilities') {
        const endpoint = getEndpointFor();
        if (!endpoint) {
          throw new Error('No endpoint configured for PMJAY facilities');
        }
        
        console.log('Fetching data from:', endpoint);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Health Infrastructure API Response:', data);
        
        if (!data.records || !Array.isArray(data.records)) {
          throw new Error('Invalid data format from API');
        }
        
        // Transform the data to a more readable format
        const transformedData = data.records.map(record => ({
          id: record.sr_no_ || Math.random().toString(36).substr(2, 9),
          state: record.state_uts,
          subCenters: {
            total: record.sub_health_centre_human_resources_and_infrastructure_no_of_sub_centres_covered_dlhs_4_2012_13,
            inGovernmentBuilding: record.sub_health_centre_human_resources_and_infrastructure_sub_health_centre_located_in_government_building_dlhs_4_2012_13,
            withANM: record.sub_health_centre_human_resources_and_infrastructure_sub_health_centre_with_anm_dlhs_4_2012_13,
            withMaleWorker: record.sub_health_centre_human_resources_and_infrastructure_sub_health_centre_with_male_health_worker_dlhs_4_2012_13,
            withANMQuarter: record.sub_health_centre_human_resources_and_infrastructure_sub_health_centre_with_anm_residing_in_sub_health_centre_quarter_where_facility_is_available_dlhs_4_2012_13
          },
          facilities: {
            electricity: record.facilities_in_sub_centre_regular_electricity_dlhs_4_2012_13,
            water: record.facilities_in_sub_centre_water_dlhs_4_2012_13,
            toilet: record.facilities_in_sub_centre_toilet_dlhs_4_2012_13,
            laborRoom: record.facilities_in_sub_centre_labor_room_dlhs_4_2012_13,
            laborRoomInUse: record.facilities_in_sub_centre_labor_room_in_current_use_dlhs_4_2012_13
          },
          raw: record // Include the raw record for debugging
        }));
        
        console.log('Transformed Health Infrastructure Data:', transformedData);
        setSchemeData(transformedData);
      } 
      // Handle other scheme types
      else {
        const base = getEndpointFor();
        if (!base) {
          throw new Error('No endpoint configured for this scheme type');
        }
        
        const url = `${base}${base.includes('?') ? '&' : '?'}api-key=${API_KEY}&format=json&limit=${LIMIT}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        if (!Array.isArray(json.records)) {
          throw new Error('Unexpected response format');
        }
        
        setSchemeData(json.records);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Reset data when schemeType changes
    setSchemeData([]);
    fetchData();
    
    // Cleanup function to cancel any pending requests
    return () => {
      // Add any cleanup if needed
    };
  }, [schemeType]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderPmjay = (item, index) => {
    // Handle the case when item is the raw data object from health infrastructure API
    if (item.state) {
      return (
        <Card containerStyle={styles.healthCard} key={index}>
          <View style={styles.healthCardHeader}>
            <Text style={styles.healthCardTitle} numberOfLines={2}>
              {item.state || 'Health Infrastructure Data'}
            </Text>
          </View>
          
          <View style={styles.mainInfoContainer}>
            <View style={styles.column}>
              <Text style={styles.sectionHeader}>Sub Centers</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Total: </Text>
                <Text style={styles.infoValue}>{item.subCenters.total || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>In Govt Building: </Text>
                <Text style={styles.infoValue}>{item.subCenters.inGovernmentBuilding ? `${item.subCenters.inGovernmentBuilding}%` : 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>With ANM: </Text>
                <Text style={styles.infoValue}>{item.subCenters.withANM ? `${item.subCenters.withANM}%` : 'N/A'}</Text>
              </View>
            </View>
            
            <View style={styles.column}>
              <Text style={styles.sectionHeader}>Facilities</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Electricity: </Text>
                <Text style={styles.infoValue}>{item.facilities.electricity ? `${item.facilities.electricity}%` : 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Water: </Text>
                <Text style={styles.infoValue}>{item.facilities.water ? `${item.facilities.water}%` : 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Toilet: </Text>
                <Text style={styles.infoValue}>{item.facilities.toilet ? `${item.facilities.toilet}%` : 'N/A'}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.additionalInfo}>
            <Text style={styles.infoLabel}>Labor Room: </Text>
            <Text style={styles.infoValue}>
              {item.facilities.laborRoom ? `${item.facilities.laborRoom}% (${item.facilities.laborRoomInUse || '0'}% in use)` : 'N/A'}
            </Text>
          </View>
        </Card>
      );
    }
    
    // Original PMJAY hospital rendering logic
    return (
      <Card key={index} containerStyle={styles.pmjayCard}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="medical-services" size={28} color="#2E7D32" />
          <View style={styles.titleContainer}>
            <Text style={styles.pmjayCardTitle} numberOfLines={2}>
              {item.HospitalName}
            </Text>
            <View style={styles.pmjayTypeTag}>
              <Text style={styles.pmjayTypeText}>{item.HospitalType}</Text>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color="#D32F2F" />
          <Text style={styles.infoText}>
            {[item.AddressLine1, item.District, item.State, item.Pincode]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </View>
        {item.ContactNo && (
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={20} color="#1565C0" />
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.ContactNo.replace(/\D/g,'')}`)}>
              <Text style={styles.link}>{item.ContactNo}</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.EmailID && (
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#7B1FA2" />
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.EmailID}`)}>
              <Text style={styles.link}>{item.EmailID}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  };

  const renderHealthInfra = (item, index) => {
    const {
      indicator,
      facility_type,
      total_no_of_facilities_,
      facilities_reporting_nil_performance___numbers_,
      details_of_maximum_and_minimum_performing_facilities___performance: perf,
      details_of_maximum_and_minimum_performing_facilities___value_reported: rawValue,
      details_of_maximum_and_minimum_performing_facilities___sub_district: subDistrict,
      details_of_maximum_and_minimum_performing_facilities___facility: facilityName,
    } = item;
    const reportedValue = rawValue != null ? Number(rawValue).toLocaleString() : 'N/A';
    return (
      <Card key={index} containerStyle={styles.healthCard}>
        <View style={styles.healthCardHeader}>
          <Text style={styles.healthCardTitle}>{indicator}</Text>
          <View style={[
            styles.performanceBadge,
            perf === 'Maximum' ? styles.performanceGood : styles.performanceBadgeDefault
          ]}>
            <Text style={styles.performanceText}>{perf} Performance</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.mainInfoContainer}>
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Facility Type</Text>
            <Text style={[styles.infoValue, styles.valueHighlight]}>{facility_type || 'N/A'}</Text>
            <Text style={styles.infoLabel}>Reported Value</Text>
            <Text style={styles.infoValue}>{reportedValue}</Text>
            <Text style={styles.infoLabel}>Total Facilities</Text>
            <Text style={styles.infoValue}>{total_no_of_facilities_ ?? 'N/A'}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Nil Performance</Text>
            <Text style={[styles.infoValue, facilities_reporting_nil_performance___numbers_ > 0 ? styles.warningText : null]}
            >{facilities_reporting_nil_performance___numbers_ ?? 'N/A'}</Text>
            <Text style={styles.infoLabel}>Location</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#f44336" />
              <Text style={styles.locationText}>{facilityName}, {subDistrict}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const renderWellness = (item, index) => {
    const name    = item.name || item.facility_name || 'Wellness Center';
    const address = [item.address, item.district, item.state, item.pincode]
      .filter(Boolean).join(', ');
    const phone   = item.contact_no || item.phone;
    const incharge= item.incharge_name || item.contact_person;
    return (
      <Card key={index} containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="medical-services" size={24} color="#4a90e2" />
          <View style={styles.titleContainer}>
            <Text style={styles.centerName}>{name}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.sectionLabel}>Address</Text>
        <Text style={styles.infoText}>{address}</Text>
        {phone && (
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Text style={[styles.infoText, styles.link]}>{phone}</Text>
          </TouchableOpacity>
        )}
        {incharge && <Text style={styles.infoText}>Incharge: {incharge}</Text>}
      </Card>
    );
  };

  const renderAyushHospital = (hospital, index) => {
    return (
      <Card key={index} containerStyle={[styles.card, { marginBottom: 15 }]}>
        <View style={styles.hospitalHeader}>
          <View style={[
            styles.hospitalTypeBadge, 
            { backgroundColor: getAyushTypeColor(hospital.type) }
          ]}>
            <Text style={styles.hospitalTypeText}>{hospital.type}</Text>
          </View>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.hospitalInfo}>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={18} color="#666" />
            <Text style={styles.infoText}>{hospital.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={18} color="#666" />
            <Text style={styles.infoText}>{hospital.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={18} color="#666" />
            <Text style={styles.infoText}>{hospital.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="language" size={18} color="#666" />
            <Text style={[styles.infoText, { color: '#1e88e5' }]}>{hospital.website}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="healing" size={18} color="#666" />
            <Text style={styles.infoText}>{hospital.specialization}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="bed" size={20} color="#666" />
              <Text style={styles.statText}>{hospital.beds} Beds</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="event" size={18} color="#666" />
              <Text style={styles.statText}>Est. {hospital.established}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  
  const getAyushTypeColor = (type) => {
    const colors = {
      'Ayurveda': '#4caf50',
      'Yoga': '#2196f3',
      'Naturopathy': '#ff9800',
      'Unani': '#9c27b0',
      'Siddha': '#f44336',
      'Homoeopathy': '#00bcd4'
    };
    return colors[type] || '#607d8b';
  };

  const renderJanAushadhiStores = () => {
    // Use the stores from schemeData that we set in fetchData
    const stores = schemeData || [];

    const openUMANGApp = async () => {
      try {
        const umangUrl = 'umang://web?url=https://web.umang.gov.in/web/guest/jan-aushadhi-sugam';
        const supported = await Linking.canOpenURL(umangUrl);
        
        if (supported) {
          await Linking.openURL(umangUrl);
        } else {
          // If UMANG app is not installed, open Play Store
          await Linking.openURL('market://details?id=in.gov.umang.negd.g2c');
        }
      } catch (error) {
        // If any error occurs, open the web version
        await Linking.openURL('https://web.umang.gov.in/web/guest/jan-aushadhi-sugam');
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Nearby Jan Aushadhi Stores</Text>
        <Text style={styles.sectionSubtitle}>Showing sample stores in New Delhi</Text>
        
        {stores.map((store) => (
          <Card key={store.id} containerStyle={styles.storeCard}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeAddress}>{store.address}</Text>
            <View style={styles.storeDetails}>
              <Text style={styles.storeDetail}>📞 {store.phone}</Text>
              <Text style={styles.storeDetail}>🕒 {store.timings}</Text>
              <Text style={styles.storeDetail}>📍 {store.distance} away</Text>
            </View>
          </Card>
        ))}

        <View style={styles.moreInfoContainer}>
          <Text style={styles.moreInfoText}>
            For more stores and real-time availability, check the official Jan Aushadhi portal:
          </Text>
          <TouchableOpacity 
            style={styles.umangButton}
            onPress={openUMANGApp}
          >
            <Text style={styles.umangButtonText}>View in UMANG App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    try {
      // For Jan Aushadhi stores, we handle it separately in the main render
      if (schemeType === 'jan-aushadhi-stores') {
        return null; // We'll handle this in the main render
      }
      if (schemeType === 'pmjay-facilities') {
        // For PMJAY, we'll render health infrastructure data
        return renderPmjay(item, index);
      }
      if (schemeType === 'health-infrastructure') {
        return renderHealthInfra(item, index);
      }
      if (schemeType === 'wellness-centers') {
        return renderWellness(item, index);
      }
      if (schemeType === 'ayush-hospitals') {
        return renderAyushHospital(item, index);
      }
      return (
        <Card containerStyle={styles.card} key={index}>
          <Text>Unsupported scheme type</Text>
        </Card>
      );
    } catch (error) {
      console.error('Error rendering item:', error);
      return (
        <Card containerStyle={[styles.card, { borderColor: '#ffebee' }]} key={index}>
          <Text style={{ color: '#d32f2f' }}>Error displaying this item</Text>
        </Card>
      );
    }
  };

  if (loading) return <ActivityIndicator style={styles.loadingContainer} size="large" color="#4CAF50" />;
  if (error) return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={fetchData}><Text style={styles.link}>Retry</Text></TouchableOpacity>
    </SafeAreaView>
  );

  // For Jan Aushadhi stores, render the stores directly
  if (schemeType === 'jan-aushadhi-stores') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {renderJanAushadhiStores()}
      </SafeAreaView>
    );
  }

  // For other scheme types, use the FlatList
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={schemeData}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  loadingContainer: { flex: 1, justifyContent: 'center' },
  errorText: { textAlign: 'center', color: '#d32f2f', margin: 20 },
  
  // AYUSH Hospital Styles
  hospitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hospitalTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  hospitalTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  hospitalInfo: {
    paddingHorizontal: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  card: { margin: 10, borderRadius: 10, padding: 12, backgroundColor: '#fff', elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  titleContainer: { marginLeft: 10, flex: 1 },
  divider: { backgroundColor: '#e0e0e0', marginVertical: 8 },
  link: { color: '#1976d2', textDecorationLine: 'underline' },

  pmjayCard: { borderRadius: 12, margin: 10, padding: 16, backgroundColor: '#fff' },
  pmjayCardTitle: { fontSize: 18, fontWeight: '700', color: '#1B5E20' },
  pmjayTypeTag: { backgroundColor: '#E8F5E9', padding: 4, borderRadius: 6, marginTop: 4 },
  pmjayTypeText: { fontSize: 12, color: '#2E7D32', fontWeight: '600' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  infoText: { marginLeft: 8, fontSize: 14, color: '#333' },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 8,
    marginTop: 16,
    paddingHorizontal: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  storeCard: {
    margin: 10,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#00a69c',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 8,
  },
  storeAddress: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 12,
    lineHeight: 20,
  },
  storeDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  storeDetail: {
    fontSize: 13,
    color: '#5f6368',
    marginRight: 16,
    marginBottom: 4,
  },
  moreInfoContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  moreInfoText: {
    fontSize: 14,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  umangButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 2,
  },
  umangButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  healthCard: {
    margin: 10,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  healthCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  healthCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a73e8',
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mainInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    paddingHorizontal: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#5f6368',
    marginRight: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#202124',
    flexShrink: 1,
    textAlign: 'right',
  },
  additionalInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceBadge: { padding: 4, borderRadius: 12 },
  performanceGood: { backgroundColor: '#e8f5e9' },
  performanceBadgeDefault: { backgroundColor: '#fff3e0' },
  performanceText: { fontSize: 12, fontWeight: '600', color: '#2e7d32' },
  column: { flex: 1 },
  infoLabel: { fontSize: 13, color: '#757575', fontWeight: '500' },
  infoValue: { fontSize: 15, color: '#212121', marginBottom: 8 },
  valueHighlight: { color: '#1976d2', fontWeight: '600' },
  warningText: { color: '#d32f2f', fontWeight: '600' },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4, fontSize: 14, color: '#424242' },
});
