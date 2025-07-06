import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
// Simple audio playback using WebView
// Using text buttons instead of icons
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AartiDetailScreen = ({ route }) => {
  const { aarti } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  const togglePlayback = () => {
    // Toggle play state (actual playback will be handled by the browser if audio URL is provided)
    setIsPlaying(!isPlaying);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{aarti.title}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.thumbnailContainer}>
          <Image source={aarti.thumbnail} style={styles.thumbnail} />
        </View>
        
        <Text style={styles.description}>{aarti.description}</Text>
        
        <View style={styles.playerContainer}>
          <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
            <Text style={styles.playButtonText}>
              {isPlaying ? 'II' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {/* Audio element for playback */}
          {isPlaying && aarti.mediaUrl && (
            <audio 
              src={aarti.mediaUrl} 
              autoPlay 
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }}
            />
          )}
        </View>
        
        <View style={styles.lyricsContainer}>
          <Text style={styles.lyricsTitle}>Lyrics</Text>
          <Text style={styles.lyrics}>
            {aarti.lyrics || 'Lyrics will be displayed here...'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  playButtonText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  playerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4a6fa5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  lyricsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  lyricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  lyrics: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
});

export default AartiDetailScreen;
