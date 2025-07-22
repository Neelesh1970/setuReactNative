import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { WebView } from 'react-native-webview';
import DropShadow from 'react-native-drop-shadow';

const { width } = Dimensions.get('window');

const templeData = [
  {
    id: 1,
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://media.istockphoto.com/id/1366135667/photo/shri-vishwanath-temple-in-varanasi-india.jpg?s=612x612&w=0&k=20&c=00ZOlsFGXVFdB7MR-UT4ht-Uc8Oh0JCpy6QDeM4M7Mw=',
    youtubeId: 'e4C5DxOepsM',
    timing: '04:00 AM - 11:00 PM',
    isLive: true
  },
  {
    id: 2,
    name: 'Tirumala Tirupati',
    location: 'Tirupati, Andhra Pradesh',
    image: 'https://www.tirumala.org/images/Temple_1.jpg',
    youtubeId: 'e4C5DxOepsM',
    timing: '02:30 AM - 01:30 AM',
    isLive: true
  },
  {
    id: 3,
    name: 'Jagannath Temple',
    location: 'Puri, Odisha',
    image: 'https://www.odishatourism.gov.in/content/dam/tourism/home/explore/temples/jagannath-temple-puri.jpg',
    youtubeId: 'e4C5DxOepsM',
    timing: '05:00 AM - 10:00 PM',
    isLive: true
  },
  {
    id: 4,
    name: 'Somnath Temple',
    location: 'Gujarat',
    image: 'https://www.gujarattourism.com/content/dam/gujrattourism/pilgrimage/somnath/Somnath-Temple.jpg',
    youtubeId: 'e4C5DxOepsM',
    timing: '06:00 AM - 09:30 PM',
    isLive: true
  },
  {
    id: 5,
    name: 'Siddhivinayak Temple',
    location: 'Mumbai, Maharashtra',
    image: 'https://www.siddhivinayak.org/images/temple-view.jpg',
    youtubeId: 'e4C5DxOepsM',
    timing: '05:30 AM - 10:00 PM',
    isLive: true
  },
];

export default function LiveAartiScreen() {
  const [selectedTemple, setSelectedTemple] = useState(null);

  const renderTempleCard = (temple) => (
    <View key={temple.id} style={styles.cardContainer}>
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <TouchableOpacity 
          style={styles.templeCard}
          onPress={() => setSelectedTemple(temple)}
          activeOpacity={0.8}
        >
          <Image 
            source={{ uri: temple.image }} 
            style={styles.templeImage} 
            resizeMode="cover"
          />
          <View style={styles.templeInfo}>
            <Text style={styles.templeName} numberOfLines={1} ellipsizeMode="tail">{temple.name}</Text>
            <Text style={styles.templeLocation} numberOfLines={1} ellipsizeMode="tail">{temple.location}</Text>
            <Text style={styles.templeTiming}>🕒 {temple.timing}</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </DropShadow>
    </View>
  );

  if (selectedTemple) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedTemple(null)}
        >
          <Text style={styles.backButtonText}>← Back to Temples</Text>
        </TouchableOpacity>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${selectedTemple.youtubeId}?autoplay=1` }}
          style={styles.webview}
          startInLoadingState
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>Live: {selectedTemple.name} Aarti</Text>
          <Text style={styles.videoLocation}>{selectedTemple.location}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Live Temple Aarti</Text>
      <Text style={styles.subHeader}>Experience divine aarti from famous temples across India</Text>
      
      <ScrollView style={styles.scrollView}>
        {templeData.map(renderTempleCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  subHeader: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },
  templeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  templeImage: {
    width: '100%',
    height: 180,
  },
  templeInfo: {
    padding: 15,
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  templeLocation: {
    color: '#666',
    marginBottom: 5,
  },
  templeTiming: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f44336',
    marginRight: 5,
  },
  liveText: {
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: '600',
  },
  webview: {
    width: '100%',
    height: 250,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonText: {
    color: '#1C39BB',
    fontSize: 16,
  },
  videoInfo: {
    padding: 15,
    backgroundColor: '#fff',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  videoLocation: {
    color: '#666',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
});
