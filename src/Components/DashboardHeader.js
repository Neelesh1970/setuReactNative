import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import DropShadow from "react-native-drop-shadow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { Icons } from "../assets/icons/Icons";
import { color } from "../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { getItem } from "../Utils/utils";
import { fetchUserProfileAPI } from "../Utils/api/auth";
import { setUserData } from "../features/user/userSlice";
import ToastService from "../Utils/ToastService";
import { showLoader, hideLoader } from "../Utils/Loader";
import Ionicons from "react-native-vector-icons/Ionicons";

const DashboardHeader = ({
  title = "Welcome",
  name1 = "Nilesh",
  name = "",
  onPressNavigation,
  onBellPress,
  searchText,
  setSearchText,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [uhid, setUhid] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedUhid = await AsyncStorage.getItem("uhid");
      setUhid(storedUhid);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem("userID");
      if (id) setUserID(id);
    };
    fetchUserID();
  }, []);

  const copyToClipboard = () => {
    if (uhid) {
      Clipboard.setString(uhid);
      ToastAndroid.show(
        ` UHID ${uhid} copied to clipboard!`,
        ToastAndroid.SHORT
      );
    }
  };

  const fetchUserProfile = async () => {
    showLoader();
    const data = { user_id: userID };

    try {
      const response = await fetchUserProfileAPI(data);
      if (
        response &&
        (response.status === 200 || response.status === 201) &&
        !response?.data?.hasError
      ) {
        const userData = response.data.data;
        dispatch(setUserData(userData));
        navigation.navigate("EditUserProfile", { userData });
      } else {
        ToastService.showError(
          "Error!",
          response.data.message || "Something went wrong"
        );
      }
    } catch (error) {
      ToastService.showError(
        "Error!",
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      hideLoader();
    }
  };

  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.headerContainer}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.leftIcons}>
            <TouchableOpacity
              onPress={onPressNavigation}
              style={styles.iconWrapper}
            >
              <Image source={Icons.dashboard_navigation} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBellPress} style={styles.iconWrapper}>
              <Image source={Icons.dashboard_bell} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.rightUser}>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.nameText}>{name}</Text>
            </View>
            <TouchableOpacity onPress={fetchUserProfile}>
              <Image
                source={Icons.dashboard_profile}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          {/* Search Icon (Ionicons) */}
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.iconLeft}
          />

          {/* Search Input */}
          <TextInput
            placeholder="Search for Services"
            placeholderTextColor="#999"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* Mic Icon (Ionicons) */}
          <TouchableOpacity
          // onPress={isListening ? stopListening : startListening}
          >
            <Ionicons
              // name={isListening ? "mic-circle" : "mic"}
              size={24}
              // color={isListening ? "red" : "#666"}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </DropShadow>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: color.bottomViewColor,
    paddingTop: Platform.OS === "ios" ? 30 : 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  rightUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold",
  },
  nameText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginLeft: 10,
  },
  searchBar: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 35,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  micIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});
