// MentalHealthHomeScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MentalHealthHomeScreen() {
  const navigation = useNavigation();

  const onGetStarted = () => {
    navigation.navigate('SelfAssessment');
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
      {/* Top graphic container */}
      <View style={styles.topContainer}>
        <View style={styles.graphicContainer}>
          <View style={styles.whiteBackground} />
          <Image
            source={require('../../../../src/assets/images/Mental_health/mindcare-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom content */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>MindCare</Text>
        <Text style={styles.subtitle}>
          Answer a few questions to get started
        </Text>

        <TouchableOpacity style={styles.button} onPress={onGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    height: 400, // Adjust this based on your needs
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
    paddingTop: 30, // Reduced from 60 to move content up
  },
  graphicContainer: {
    width: '90%',
    aspectRatio: 403.9 / 605.85, // Maintain the aspect ratio from the Android layout
    maxWidth: 406, // Close to the 403.9dp from the Android layout
    position: 'relative',
    marginBottom: 30,
  },
  whiteBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // Adjust this value to match the desired corner radius
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Should match the whiteBackground borderRadius
    overflow: 'hidden',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
  },
  subtitle: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#81C784',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
