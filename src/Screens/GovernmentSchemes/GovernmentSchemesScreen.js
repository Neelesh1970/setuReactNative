import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DashboardScreen from '../Dashboard/DashboardScreen';
import CommonBottomBar from '../../Routes/CommonTabbar';
import { color } from '../../assets/colors/Colors';

// Try to import the image directly
let group1Image;
try {
  group1Image = require('../../assets/images/Group1.png');
  console.log('Image imported successfully:', group1Image);
} catch (error) {
  console.error('Error importing image:', error);
}

// ImageWithFallback component
const ImageWithFallback = ({ source, style, ...props }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('Image source:', source);

  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      {!error ? (
        <Image
          source={source}
          style={[style, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
          onLoadStart={() => {
            console.log('Image load started');
            setLoading(true);
          }}
          onLoadEnd={() => {
            console.log('Image load ended');
            setLoading(false);
          }}
          onError={(e) => {
            console.log('Image load error:', e.nativeEvent.error);
            setError(true);
            setLoading(false);
          }}
          onLoad={() => console.log('Image loaded successfully')}
          {...props}
        />
      ) : (
        <Text style={{ color: 'red' }}>Failed to load image</Text>
      )}
      {loading && !error && (
        <ActivityIndicator size="large" color="#4A6F44" />
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const GovernmentSchemesScreen = ({ navigation: nav }) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    console.log('Group1 image object:', group1Image);
    console.log('Image path:', Image.resolveAssetSource(group1Image));
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Government Schemes</Text>
          <View style={styles.docIconContainer} />
        </View>

        {/* Find Schemes Button */}
        <TouchableOpacity 
          style={styles.findSchemesButton}
          onPress={() => navigation.navigate('EligibilityCriteria')}
        >
          <Text style={styles.findSchemesButtonText}>Find Schemes For You</Text>
          <Icon name="arrow-forward" size={20} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Schemes Banner */}
        <View style={styles.bannerImageContainer}>
          {group1Image ? (
            <Image
              source={group1Image}
              style={styles.bannerImage}
              resizeMode="contain"
              onError={(e) => {
                console.log('Image load error:', e.nativeEvent.error);
                setImageError(true);
              }}
              onLoad={() => console.log('Image loaded successfully')}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Image not found: Group1.png</Text>
              <Text style={styles.errorText}>Please check the file exists in src/assets/images/</Text>
            </View>
          )}
        </View>

        {/* Banner with Parliament Image
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../assets/images/parliment.png')} 
            style={styles.parliamentImg} 
            resizeMode="contain"
          />
        </View> */}

        {/* Central Govt Card */}
        <TouchableOpacity 
          style={styles.centralCard}
          onPress={() => navigation.navigate('CentralSchemesList', { 
            schemeType: 'central',
            schemeTitle: 'Central Government Schemes'
          })}
        >
          <View style={styles.cardImageContainer}>
            <Image 
              source={require('../../assets/images/parliment.png')} 
              style={styles.centralCardImage} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.centralCardTitle}>CENTRAL GOVT. SCHEMES</Text>
            <Text style={styles.centralCardSubtitle}>Explore schemes by the Central Government</Text>
          </View>
        </TouchableOpacity>

        {/* State Govt Card */}
        <TouchableOpacity 
          style={styles.stateCard}
          onPress={() => navigation.navigate('StateSchemesList')}
        >
          <View style={styles.cardImageContainer}>
            <Image 
              source={require('../../assets/images/state.png')} 
              style={styles.stateCardImage} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.stateCardTitle}>STATE GOVT. SCHEMES</Text>
            <Text style={styles.stateCardSubtitle}>Explore schemes by the State Government</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {/* Bottom Navigation */}
              {/* <CommonBottomBar /> */}
              {/* <DashboardScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.bottomViewColor,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  findSchemesButton: {
    backgroundColor: color.bottomViewColor,
    padding: 15,
    margin: 16,
    borderRadius: 15,
    alignItems: 'center',
    // elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  findSchemesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 4,
  },
  backButton: {
    padding: 5,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 20,
  },
  docIconContainer: {
    width: 32,
    alignItems: 'flex-end',
  },
  docIcon: {
    fontSize: 24,
  },
  bannerImageContainer: {
    width: '100%',
    height: 255,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  bannerContainer: {
    height: 180,
    backgroundColor: '#E8E8E8',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  parliamentImg: {
    width: '90%',
    height: 180,
    marginTop: 40,
  },
  centralCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    padding: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 200,
    overflow: 'hidden',
  },
  centralCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  centralCardSubtitle: {
    fontSize: 14,
    color: '#4A6F44',
    opacity: 0.9,
  },
  centralCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 200,
    overflow: 'hidden',
  },
  stateCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  stateCardSubtitle: {
    fontSize: 14,
    color: '#4A6F44',
    opacity: 0.9,
  },
  stateCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    alignItems: 'center',
  },
  cardImageContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Old styles removed - using specific card styles now
});

export default GovernmentSchemesScreen;
