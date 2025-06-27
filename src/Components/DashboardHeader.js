import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Icons } from "../assets/icons/Icons";
import React, { useEffect, useState } from "react";
import { color } from "../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import DropShadow from "react-native-drop-shadow";
import { getItem } from "../Utils/utils";
import { fetchUserProfileAPI } from "../Utils/api/auth";
import { hideLoader, showLoader } from "../Utils/Loader";
import { setUserData } from "../features/user/userSlice";
import ToastService from "../Utils/ToastService";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from "@react-native-clipboard/clipboard";
import { ToastAndroid } from "react-native";



const DashboardHeader = ({
  title,
  name,
  onPressNavigation,
  onBellPress,
  onSearchPress,
  onProfilePress,
}) => {

  const [userID, setUserID] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [uhid, setUhid] = useState(null);
  const [uhids, setUhids] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUhid = await AsyncStorage.getItem('uhid');
        setUhid(storedUhid);
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUhids(uhid)
  }, [uhid]);
  

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);

  const copyToClipboard = () => {
    if (uhids) {
      Clipboard.setString(uhids);
      ToastAndroid.show(`UHID ${uhids} copied to clipboard!`, ToastAndroid.SHORT);
    }
  };

  // Fetch User Profile API Call 
  const fetchUserProfile = async () => {
    showLoader();
    const data = {
      "user_id": userID,
    };
    console.log('fetchUserProfile data:', data);
    try {
      const response = await fetchUserProfileAPI(data);
      console.log('fetchUserProfileAPI Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        const userData = response.data.data;
        dispatch(setUserData(userData));
        navigation.navigate("EditUserProfile", { userData });
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong");
      }
    } catch (error) {
      console.log('Error from fetchUserProfileAPI call:', error.response ? error.response.data : error.message);
      ToastService.showError('Error!', error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      hideLoader();
    }
  };

  const handleProfilePress = () => {
    fetchUserProfile();
  }
  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onPressNavigation}
          style={styles.iconContainer}
        >
          <Image source={Icons.dashboard_navigation} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={null} style={styles.iconContainer}>
          <Image source={Icons.dashboard_bell} style={styles.icon} />
        </TouchableOpacity>
        <View style={[styles.iconContainer, { flexDirection: "row", alignItems: "center" }]}>
          <Text style={[styles.uhidText, { marginRight: 4 }]}>UHID:</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.uhidText}>{uhids ?? ""}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",

            right: 10,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            flexDirection: "row",
          }}

        >
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress}
            style={{
              top: 0,
              bottom: 0,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image source={Icons.dashboard_profile} style={styles.profile} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.nameView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image source={Icons.dashboard_profile} style={styles.profile} /> */}
      </View>
    </DropShadow>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingStart: 10,
    // elevation: 10,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "rgba(0, 0, 0, 0.3)", // rgba(0, 0, 0, 0.3) color
    //     shadowOffset: { width: 0, height: 4 }, // x: 0, y: 4
    //     shadowOpacity: 1, // Set opacity to full since rgba handles the transparency
    //     shadowRadius: 3, // Blur radius 3
    //   },
    //   android: {
    //     elevation: 1,
    //     //backgroundColor: "#000000",
    //     borderBottomColor: "rgba(0, 0, 0, 0.08)",
    //     borderBottomWidth: 3,
    //   },
    // }),
    alignItems: "flex-start",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingTop: 10,
    height: 80,
    backgroundColor: color.bottomViewColor,
    marginBottom: 10,
  },
  iconContainer: {
    // position: "absolute",
    marginHorizontal: 7,
    paddingTop: 20,
  },
  icon: {
    width: ms(20),
    height: ms(20),
  },
  uhidText: {
    color: color.white,
    fontSize: ms(14),
    justifyContent: "center",

    fontWeight: "bold",
  },
  profile: {
    alignSelf: "center",
    width: 55,
    height: 55,
  },
  title: {
    fontSize: ms(12),
    marginStart: 10,
    marginRight: 10,
    textAlign: "center",
    color: color.white,
  },
  name: {
    fontSize: ms(12),
    marginStart: 10,
    fontFamily: "bold",
    textAlign: "center",
    color: color.white,
  },
  nameView: {
    marginStart: 10,
    color: color.white,
    alignSelf: "center",
    position: "absolute",
    end: 80,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
