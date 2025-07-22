import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { createStackNavigator } from '@react-navigation/stack';
import DocumentUploadScreen from './DocumentUploadScreen';

// Create a local stack navigator for this screen
const LocalStack = createStackNavigator();

// Wrapper component to handle the document upload flow
const DocumentUploadStack = () => (
  <LocalStack.Navigator screenOptions={{ headerShown: false }}>
    <LocalStack.Screen name="PHRScreen" component={PHRScreenContent} />
    <LocalStack.Screen 
      name="DocumentUploadScreen" 
      component={DocumentUploadScreen}
      options={{
        headerShown: false,
        // headerTitle: 'Upload Document',
        // headerBackTitle: 'Back',
      }}
    />
  </LocalStack.Navigator>
);

// The main content of the PHR screen
const PHRScreenContent = ({ navigation }) => {
  const handleUploadDocPress = () => {
    console.log('Navigating to DocumentUploadScreen');
    navigation.navigate('DocumentUploadScreen');
  };

  const handleTilePress = (tile) => {
    if (tile.onPress) {
      tile.onPress();
    }
  };

  const tileData = [
    { label: 'VISITS HERE' },
    { label: 'Lab report' },
    { label: 'PRESE' },
    { 
      label: 'UPLOAD DOC', 
      icon: 'document-attach-outline',
      onPress: () => navigation.navigate('DocumentUploadScreen')
    },
    { label: 'LIFE' },
    { 
      label: 'UPLOAD PHOTOS', 
      icon: 'upload',
      onPress: async () => {
      console.log('UPLOAD PHOTOS button pressed');
      try {
        if (Platform.OS === 'android') {
          console.log('Checking Android version...');
          const androidVersion = Platform.Version;
          console.log('Android version:', androidVersion);
          
          let permission;
          let permissionName;
          
          if (androidVersion >= 33) {
            // Android 13+ (API 33+)
            permission = 'android.permission.READ_MEDIA_IMAGES';
            permissionName = 'Media Images';
          } else {
            // Android 12 and below
            permission = 'android.permission.READ_EXTERNAL_STORAGE';
            permissionName = 'Storage';
          }
          
          console.log(`Requesting ${permissionName} permission...`);
          
          try {
            // Request the permission
            const granted = await PermissionsAndroid.request(
              permission,
              {
                title: `${permissionName} Permission`,
                message: `App needs access to your ${permissionName.toLowerCase()} to upload photos`,
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            
            console.log('Permission request result:', granted);
            
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Permission denied');
              Alert.alert(
                'Permission Required',
                `Please grant ${permissionName} permission to upload photos`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Open Settings',
                    onPress: () => {
                      Linking.openSettings().catch(() => {
                        console.log('Failed to open settings');
                      });
                    },
                  },
                ],
              );
              return;
            }
            
            console.log('Permission granted, proceeding to image picker');
          } catch (err) {
            console.error('Error requesting permission:', err);
            Alert.alert('Error', 'Failed to request permission. Please try again.');
            return;
          }
        }

        console.log('Launching image library...');
        try {
          const options = {
            mediaType: 'photo',
            selectionLimit: 10,
            includeBase64: false,
            quality: 0.8,
          };
          console.log('Image picker options:', options);
          
          const result = await launchImageLibrary(options);
          console.log('Image picker result:', JSON.stringify(result, null, 2));

          if (result.didCancel) {
            console.log('User cancelled image picker');
          } else if (result.errorCode) {
            console.log('ImagePicker Error: ', result.errorMessage);
            Alert.alert('Error', `Failed to pick images: ${result.errorMessage}`);
          } else if (result.assets && result.assets.length > 0) {
            console.log('Selected assets:', result.assets);
            Alert.alert('Success', `Selected ${result.assets.length} photos`);
            // Here you can handle the photo upload to your server
            // uploadPhotos(result.assets);
          } else {
            console.log('No assets selected');
            Alert.alert('Info', 'No photos were selected');
          }
        } catch (error) {
          console.error('Error in launchImageLibrary:', error);
          Alert.alert('Error', `Failed to open image picker: ${error.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error in photo upload:', error);
        Alert.alert('Error', `Failed to select photos: ${error.message || 'Unknown error'}`);
      }
    }
      },
    { label: 'BODY IMP' },
    { label: 'DIET' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>PHR</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Grid Tiles */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {tileData.map((tile, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.tile}
            onPress={() => handleTilePress(tile)}
            activeOpacity={0.7}
          >
            {tile.icon && (
              <FontAwesome name={tile.icon} size={22} color="#000" style={styles.tileIcon} />
            )}
            <Text style={styles.tileText}>{tile.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Test Navigation Button */}
      <TouchableOpacity 
        style={[styles.popupBtn, {backgroundColor: 'red', marginTop: 20}]}
        onPress={handleUploadDocPress}
      >
        <Text style={[styles.popupText, {color: 'white'}]}>TEST NAVIGATION</Text>
      </TouchableOpacity>
      
      {/* POP UP Button */}
      <TouchableOpacity style={styles.popupBtn}>
        <Text style={styles.popupText}>POP UP</Text>
      </TouchableOpacity>

      {/* Bottom Tab
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home-outline" size={20} color="#000" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="search-outline" size={20} color="#000" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="chatbubbles-outline" size={20} color="#000" />
          <Text style={styles.tabLabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="person-outline" size={20} color="#000" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1C39BB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  tile: {
    width: '42%',
    height: 80,
    backgroundColor: '#D9D9D9',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 6,
  },
  tileText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  tileIcon: {
    marginBottom: 6,
  },
  popupBtn: {
    backgroundColor: '#1C39BB',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
  },
  popupText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
});

// Export the stack navigator instead of the component directly
export default DocumentUploadStack;
