import React, { memo, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { getItem, getToken } from '../../../Utils/utils';
import { StatusBar } from '../../../Components';

export default memo(({ navigation }) => {
  

  useEffect(() => {
    const checkTokenAndUserID = async () => {
      try {
        const token = await getToken();
        const userID = await getItem('userID');
        console.log('getToken:', token);
        console.log('getUserID:', userID);

        if (token && userID) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { screen: 'DashboardScreen' } }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { screen: 'Walkthrough' } }],
          });
        }
      } catch (error) {
        console.error('Error checking token/userID:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { screen: 'Walkthrough' } }],
        });
      }
    };

    const timeoutId = setTimeout(checkTokenAndUserID, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);
  

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../../assets/images/splash.jpeg")}
      resizeMode="cover"
    >
      <StatusBar />
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});
