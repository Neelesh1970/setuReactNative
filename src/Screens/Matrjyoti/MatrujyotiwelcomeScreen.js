import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window');

const MatrujyotiWelcomeScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      {/* <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome</Text>
        <View style={{ width: 24 }} />
      </View> */}

      <View style={styles.contentContainer}>
        {/* Image Card */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/matrjyoti/matrujyoti.png')}
            style={styles.image}
          />
        </View>

        {/* Title */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.title}>Matrujyoti</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Track your pregnancy journey with love and care.
        </Text>

        {/* Get Started Button */}
        <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('MatrujyotiMain');
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MatrujyotiWelcomeScreen;

const CARD_WIDTH = 385; // Fixed width to match design
const IMAGE_HEIGHT = 555; // Fixed height to match design

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20, // Space between header and card
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1C39BB',
    borderBottomWidth: 1,
    borderBottomColor: '#1C39BB',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  card: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    // backgroundColor: '#fff',
    borderRadius: 10, // Remove border radius to match design
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    // shadowOffset: { width: 0, height: 4 },
    // Android shadow
    // elevation: 4,
    overflow: 'hidden',
    marginLeft: 15, // Match layout_marginLeft="27dp"
    marginTop: 0,
    marginBottom: 25,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#1C39BB',  // pink accent
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300, // Maximum width for larger screens
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
