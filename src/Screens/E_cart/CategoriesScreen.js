import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import EcartBottomNavbar from './EcartBottomNavbar';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    image: require('../assets/images/categories/fruits.png'),
  },
  {
    id: 2,
    name: 'Dairy Products',
    image: require('../assets/images/categories/dairy.png'),
  },
  {
    id: 3,
    name: 'Bakery',
    image: require('../assets/images/categories/bakery.png'),
  },
  {
    id: 4,
    name: 'Beverages',
    image: require('../assets/images/categories/beverages.png'),
  },
];

const CategoriesScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    // Navigate to a filtered product list if needed
    navigation.navigate('productHomeScreen', { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Categories</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCategoryPress(item)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <EcartBottomNavbar
        activeTab="Categories"
        onTabPress={(tab) => navigation.navigate(tab)}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    margin: '1.5%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 14,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
