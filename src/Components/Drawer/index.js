import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Logout'); 
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}>
      <View>
        <Text>Drawer Side Menu</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
