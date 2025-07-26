import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  {
    id: 1,
    title: 'Import Insurance',
    subtitle: 'Upload or enter manually',
    image: require('../../assets/images/Insurance/import.png'), // Replace with your actual image path
  },
  {
    id: 2,
    title: 'Buy Insurance',
    subtitle: 'For electronics, health, more',
    image: require('../../assets/images/Insurance/buy.png'),
  },
  {
    id: 3,
    title: 'My Policies',
    subtitle: 'Manage all your plans',
    image: require('../../assets/images/Insurance/policies.png'),
  },
  {
    id: 4,
    title: 'Payments',
    subtitle: 'Make or view transactions',
    image: require('../../assets/images/Insurance/payments.png'),
  },
];

const InsuranceHubScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Insurance Hub</Text>
        <Ionicons name="notifications-outline" size={22} />
      </View>

      <Text style={styles.subtitle}>How can we help you today?</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsuranceHubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
    color: '#222',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  cardTextContainer: {
    marginTop: 8,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  cardSubtitle: {
    color: '#667085',
    fontSize: 14,
    marginTop: 2,
  },
});
