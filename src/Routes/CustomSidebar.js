import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ms } from 'react-native-size-matters';
import { color } from '../../src/assets/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getItem } from '../../src/Utils/utils';
import { normalize } from '../../src/Utils/normalize';

const { width } = Dimensions.get('window');

const CustomSidebar = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const id = await getItem('userID');
        if (id) {
          setUserID(id);
        }
      } catch (error) {
        console.error('Error fetching userID:', error);
      }
    };
    fetchUserID();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const languagePopupValue = await AsyncStorage.getItem('languagepopup');
              await AsyncStorage.clear();
              if (languagePopupValue !== null) {
                await AsyncStorage.setItem('languagepopup', languagePopupValue);
              }
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainStack', params: { screen: 'Login' } }],
              });
            } catch (error) {
              console.error('Error clearing storage:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleClose = () => {
    navigation.closeDrawer();
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Here</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.contentUserprofile}
        onPress={() => {
          navigation.navigate('MainStack', { screen: 'NewChangePassword' });
          navigation.closeDrawer();
        }}
      >
        <Text style={styles.title}>Change Password</Text>
        <Icon name="arrow-forward-ios" size={18} color="white" />
      </TouchableOpacity>
      
      <View style={styles.line} />
      
      <TouchableOpacity
        style={styles.contentUserprofile}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
        <Icon name="logout" size={normalize(20)} color="white" />
      </TouchableOpacity>
      
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    width: '100%',
    backgroundColor: color.editBlue,
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeButton: {
    marginLeft: normalize(30),
  },
  closeText: {
    fontSize: normalize(18),
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(40),
  },
  title: {
    fontSize: normalize(18),
    color: 'white',
    fontWeight: 'bold',
  },
  contentUserprofile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: normalize(20),
  },
});

export default CustomSidebar;