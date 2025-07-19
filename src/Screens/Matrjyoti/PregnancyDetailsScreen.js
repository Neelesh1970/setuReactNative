import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen({ navigation, route }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [moodTrackerEnabled, setMoodTrackerEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(route.params?.selectedDate || null);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* PROFILE IMAGE */}
        <TouchableOpacity onPress={() => setShowImagePickerModal(true)}>
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage.uri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="camera" size={32} color="#8367B1" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* NAME + DETAILS */}
        <Text style={styles.name}>Anushka Joshi</Text>
        <Text style={styles.week}>Week 24</Text>
        <Text style={styles.due}>
          {selectedDate 
            ? `Due ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            : 'No due date set'}
        </Text>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {/* edit info */}}
          >
            <Text style={styles.buttonText}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MatrujyotiMain', { 
              screen: 'PregnancyTrackerScreen',
              params: { 
                returnToProfile: true,
                initialDate: selectedDate 
              }
            })}
          >
            <Text style={styles.buttonText}>Change Date</Text>
          </TouchableOpacity>
        </View>

        {/* PREFERENCES */}
        <Text style={styles.sectionHeader}>Preferences</Text>

        {/* Language */}
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Language</Text>
          <Text style={styles.prefValue}>English</Text>
        </View>
        {/* Notifications */}
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: styles.purple.color, false: '#CCC' }}
            thumbColor="#FFF"
          />
        </View>
        {/* Mood Tracker */}
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Mood Tracker</Text>
          <Switch
            value={moodTrackerEnabled}
            onValueChange={setMoodTrackerEnabled}
            trackColor={{ true: styles.purple.color, false: '#CCC' }}
            thumbColor="#FFF"
          />
        </View>
      </ScrollView>

      {/* Get Report Button */}
      <TouchableOpacity 
        style={styles.reportButton}
        onPress={() => {
          navigation.navigate('ReportScreen');
        }}
      >
        <Text style={styles.reportButtonText}>Get Report</Text>
      </TouchableOpacity>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePickerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Photo</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => handleImageSelection('camera')}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => handleImageSelection('gallery')}
            >
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, { marginTop: 20 }]}
              onPress={() => setShowImagePickerModal(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#FF3B30' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Add these functions before the component's return statement
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        // Also request storage permission for Android 10 and below
        if (Platform.Version < 30) {
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
                 storagePermission === PermissionsAndroid.RESULTS.GRANTED;
        }
        
        return cameraPermission === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true; // For iOS, permissions are handled in Info.plist
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // For Android 10 and below, we need storage permission
        if (Platform.Version < 30) {
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return storagePermission === PermissionsAndroid.RESULTS.GRANTED;
        }
        // For Android 11+, no permission needed for gallery access
        return true;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    // For iOS, permissions are handled in Info.plist
    return true;
  };

  const handleImageSelection = async (type) => {
    console.log('handleImageSelection called with type:', type);
    setShowImagePickerModal(false);
    
    try {
      // Simple implementation using ImagePicker directly
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      // For camera, we'll use a different approach
      if (type === 'camera') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs access to your camera',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
            const result = await launchCamera({
              mediaType: 'photo',
              quality: 0.8,
            });
            handleImageResult(result);
          } else {
            console.log('Camera permission denied');
            Alert.alert('Permission required', 'Camera permission is required to take photos');
          }
        } catch (err) {
          console.warn('Error requesting camera permission:', err);
          Alert.alert('Error', 'Failed to access camera');
        }
      } else {
        // For gallery
        try {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
          });
          handleImageResult(result);
        } catch (error) {
          console.log('Error picking image:', error);
          Alert.alert('Error', 'Failed to pick image from gallery');
        }
      }
    } catch (error) {
      console.log('Error in handleImageSelection:', error);
      Alert.alert('Error', 'Failed to process image selection');
    }
  };

  const handleImageResult = (result) => {
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
      Alert.alert('Error', result.errorMessage || 'Failed to process image');
    } else if (result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri };
      console.log('Selected image URI:', source.uri);
      setProfileImage(source);
    } else if (result.uri) {
      // For backward compatibility
      const source = { uri: result.uri };
      setProfileImage(source);
    }
  };

const AVATAR_SIZE = 120;
const BUTTON_HEIGHT = 44;
const GAP = 16;
const styles = StyleSheet.create({
  purple: {
    color: '#8367B1', // your theme purple
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GAP,
    backgroundColor: '#1C39BB',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerIconPlaceholder: {
    width: 24,
    opacity: 0, // Keep for layout consistency
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  content: {
    alignItems: 'center',
    padding: GAP,
  },
  avatarContainer: {
    marginVertical: GAP,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#F3E9FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8367B1',
    borderStyle: 'dashed',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  week: {
    fontSize: 16,
    marginTop: 4,
    color: '#8367B1',
  },
  due: {
    fontSize: 14,
    marginBottom: GAP,
    color: '#8367B1',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: GAP * 1.5,
  },
  button: {
    flex: 1,
    height: BUTTON_HEIGHT,
    backgroundColor: '#1C39BB', // light purple bg
    borderRadius: BUTTON_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: GAP / 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  sectionHeader: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: GAP / 2,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: GAP / 1.2,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  prefLabel: {
    fontSize: 16,
    color: '#333',
  },
  prefValue: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  modalButton: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1C39BB',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#1C39BB',
  },
  reportButton: {
    backgroundColor: '#1C39BB',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
