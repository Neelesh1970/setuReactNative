import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DashboardScreen from '../Dashboard/DashboardScreen';

const { width } = Dimensions.get('window');
// We'll use the design ratio to match your card height to screen width
const CARD_WIDTH = width - 26; // 13dp left + 13dp right margin
const CARD_HEIGHT = Math.round((218.82 / 428) * CARD_WIDTH);

const categories = [
  {
    id: '1',
    name: 'Agriculture',
    image: require('../../assets/images/agriculture.png'),
  },
  {
    id: '2',
    name: 'Rural & Environment',
    image: require('../../assets/images/rural.png')
  },
  {
    id: '3',
    name: 'Banking, Financial Services',
    image: require('../../assets/images/banking.png')
  },
  {
    id: '4',
    name: 'Business & Entrepreneurship',
    image: require('../../assets/images/business.png')
  },
  {
    id: '5',
    name: 'Education & Learning',
    image: require('../../assets/images/education.png')
  },
  {
    id: '6',
    name: 'Health & Wellness',
    image: require('../../assets/images/health.png')
  },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { schemeType } = route.params;

  const handleCategoryPress = (category) => {
    if (category.id === '6') { // Health & Wellness category
      navigation.navigate('HealthDataScreen');
    } else {
      navigation.navigate('SchemeList', {
        schemeType,
        categoryId: category.id,
        categoryName: category.name,
      });
    }
  };

  const [imageLoading, setImageLoading] = useState({});

  const handleImageLoad = (categoryId) => {
    setImageLoading(prev => ({ ...prev, [categoryId]: false }));
  };

  const handleImageError = (categoryId) => {
    console.warn(`Failed to load image for category ${categoryId}`);
    setImageLoading(prev => ({ ...prev, [categoryId]: false }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {schemeType === 'central' ? 'CENTRAL GOVT. SCHEMES' : 'STATE GOVT. SCHEMES'}
        </Text>
        <View style={styles.docIconContainer}>
          <Text style={styles.docIcon}>📄</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Categories</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.9}
          >
            {imageLoading[category.id] !== false && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <Image
              source={category.image}
              style={[
                styles.cardImage,
                imageLoading[category.id] === false && styles.loadedImage
              ]}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(prev => ({ ...prev, [category.id]: true }))}
              onLoad={() => handleImageLoad(category.id)}
              onError={() => handleImageError(category.id)}
            />
            <View style={styles.cardOverlay} />
            <View style={styles.cardRow}>
              <Text style={styles.cardCategory}>{category.name}</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

     {/* Bottom Navigation */}
          <DashboardScreen  />
    </SafeAreaView>

    
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadedImage: {
    opacity: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 30,
    color: '#000000',
  },
  headerTitle: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 30,
  },
  docIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  docIcon: {
    fontSize: 22,
    color: '#fff',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    paddingTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.04)', // minimal overlay
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    left: 18,
    right: 18,
    zIndex: 2,
  },
  cardCategory: {
    color: '#222',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  arrow: {
    color: '#222',
    fontSize: 32,
    fontWeight: '400',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
});

export { CategoriesScreen };
