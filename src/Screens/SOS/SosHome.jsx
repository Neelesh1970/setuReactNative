import {
  Alert,
  Animated,
  Easing,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ConfirmationModal,
  HealthProfileFormModal,
  SosNavbar,
} from "./Components";
import { ms, s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactById,
  fetchEmergencyContacts,
} from "../../features/sos/sosSlice";
import ToastService from "../../Utils/ToastService";
import Error from "../Error/Error";
import { makePhoneCall, showCallInitiatedToast } from "../../Utils/phoneUtils";
import { fetchUserHealthProfile } from "../../features/sos/userHealthProfileSlice";
import axios from "axios";
import { setUserData } from "../../features/user/userSlice";
import { API_URL_AUTH } from "@env";
import { getItem } from "../../Utils/utils";
import { EmergencyCardSkeleton, ProfileRowSkeleton } from "./Skeletons";
import { createEmergencyTransaction } from "./Services/createEmergencyTransaction";
import {
  getHealthProfileExists,
  setHealthProfileExists,
} from "./Services/userHealthProfileService";
import { color } from "../../assets/colors/Colors";

const SosHome = ({}) => {
  const dispatch = useDispatch();
  const { emergencyContactData, loading, error } = useSelector(
    (state) => state.sos
  );
  const { userHealthProfileData, userHealthProfileLoading } = useSelector(
    (state) => state.userHealthProfile
  );
  const userHealthProfileId = userHealthProfileData[0]?.id;
  const navigation = useNavigation();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isAlertSentModalVisible, setIsAlertSentModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [showHealthProfileModal, setShowHealthProfileModal] = useState(false);
  const [showIncompleteProfile, setShowIncompleteProfile] = useState(false);

  const VIBRATION_PATTERN = [500, 500];

  const urgentCallData = [
    {
      icon: <FontAwesome name="female" size={s(26)} color="#1C39BB" />,
      label: "Women Safety",
      contactNumber: "112",
    },
    {
      icon: <MaterialIcons name="local-police" size={s(26)} color="#1C39BB" />,
      label: "Police",
      contactNumber: "100",
    },
    {
      icon: <FontAwesome name="ambulance" size={s(26)} color="#1C39BB" />,
      label: "Ambulance",
      contactNumber: "108",
    },
  ];

  const emergencyServiceData = [
    {
      icon: <FontAwesome name="hospital-o" size={s(24)} color="#1C39BB" />,
      label: "Hospitals",
      description: "Find nearest hospitals",
      searchQuery: "hospitals",
    },
    {
      icon: (
        <MaterialIcons name="medical-services" size={s(24)} color="#1C39BB" />
      ),
      label: "Doctors",
      description: "Locate nearby doctors",
      searchQuery: "doctors",
    },
    {
      icon: <FontAwesome name="medkit" size={s(24)} color="#1C39BB" />,
      label: "Medical Stores",
      description: "Find medical stores",
      searchQuery: "pharmacy",
    },
    {
      icon: <MaterialIcons name="science" size={s(24)} color="#1C39BB" />,
      label: "Pathology Lab",
      description: "Locate testing labs",
      searchQuery: "pathology lab",
    },
    {
      icon: <Ionicons name="shield-checkmark" size={s(24)} color="#1C39BB" />,
      label: "Security Service",
      description: "Find security services",
      searchQuery: "security services",
    },
    {
      icon: <FontAwesome name="ambulance" size={s(24)} color="#1C39BB" />,
      label: "Ambulance",
      description: "Emergency ambulance services",
      searchQuery: "ambulance services",
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(fetchEmergencyContacts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserHealthProfile());
    fetchData();
  }, []);

  useEffect(() => {
    checkHealthProfile();
  }, [userHealthProfileData]);

  const checkHealthProfile = async () => {
    const profileExists = await getHealthProfileExists();

    if (
      userHealthProfileData.length === 0 &&
      !userHealthProfileLoading &&
      !profileExists
    ) {
      await setHealthProfileExists(false);
    } else if (
      userHealthProfileData.length === 0 &&
      !userHealthProfileLoading
    ) {
      await setHealthProfileExists(false);
    } else {
      await setHealthProfileExists(true);
    }

    if (
      !profileExists &&
      userHealthProfileData.length === 0 &&
      !userHealthProfileLoading
    ) {
      setShowHealthProfileModal(true);
      setShowIncompleteProfile(true);
    } else {
      setShowIncompleteProfile(false);
    }
  };

  const fetchData = async () => {
    setUserDataLoading(true);
    try {
      const id = await getItem("userID");
      if (!id) throw new Error("User ID not found");

      const userResponse = await axios.get(`${API_URL_AUTH}/auth/user/${id}`);

      dispatch(setUserData(userResponse?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setUserDataLoading(false);
    }
  };

  const handleDeleteConfirmation = (contactId) => {
    setContactToDelete(contactId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteContact = async () => {
    try {
      await dispatch(deleteContactById(contactToDelete));
      ToastService.showSuccess("Success!", "Contact deleted successfully!");
    } catch (error) {
      ToastService.showError("Error!", "Failed to delete contact");
    } finally {
      setContactToDelete(null);
    }
  };

  const openGoogleMaps = (searchQuery) => {
    const url = Platform.select({
      ios: `maps://?q=${encodeURIComponent(searchQuery)}`,
      android: `geo:0,0?q=${encodeURIComponent(searchQuery)}`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          // Fallback to browser if native maps app not available
          const browserUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            searchQuery
          )}`;
          return Linking.openURL(browserUrl);
        }
        return Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const startAnimation = () => {
    if (showIncompleteProfile) {
      setShowHealthProfileModal(true);

      return;
    }
    if (emergencyContactData.length === 0) {
      Alert.alert(
        "No Emergency Contacts",
        "Please add emergency contacts before using the help feature",
        [
          {
            text: "Add Contacts",
            onPress: () => navigation.navigate("SosAddContact"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    if (userHealthProfileData[0]?.wallet === 0) {
      Alert.alert(
        "Insufficient Balance",
        "Please add balance in your wallet before using the help feature",
        [
          {
            text: "Add Balance",
            onPress: () => navigation.navigate("SosPlan"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    setCountdown(5);
    setIsHelpModalVisible(true);

    // Reset animation value
    animation.setValue(0);

    // Start the animation
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000, // 1 second per pulse
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    startVibration();
  };

  const stopAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation).stop();
    stopVibration();
  };

  // Modify your circle styles to use animated values
  const circle1Scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], // Grows 20%
  });

  const circle2Scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1], // Grows 10%
  });

  const circle1Opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7], // Fades slightly
  });

  const circle2Opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8], // Fades slightly
  });

  const startVibration = () => {
    if (Platform.OS === "android") {
      Vibration.vibrate(VIBRATION_PATTERN, true);
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
    }
  };

  const stopVibration = () => {
    Vibration.cancel();
  };

  const createEmergencyCallTransaction = async (
    triggerType,
    sendToContacts = []
  ) => {
    try {
      const transactionData = {
        userHealthProfileId,
        txnType: "debit",
        triggerType,
        amt: "1.00",
        sendToEmergencyContacts: sendToContacts,
      };

      await createEmergencyTransaction(transactionData);
      dispatch(fetchUserHealthProfile());
      console.log(`${triggerType} transaction created successfully`);
    } catch (error) {
      console.error(`Error creating ${triggerType} transaction:`, error);
      ToastService.showError("Error", "Failed to record emergency transaction");
    }
  };

  const handleUrgentCall = (contactNumber, label) => {
    if (showIncompleteProfile) {
      setShowHealthProfileModal(true);

      return;
    }
    if (userHealthProfileData[0]?.wallet === 0) {
      Alert.alert(
        "Insufficient Balance",
        "Please add balance in your wallet before using this feature",
        [
          {
            text: "Add Balance",
            onPress: () => navigation.navigate("SosPlan"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    makePhoneCall(contactNumber);
    showCallInitiatedToast(label);

    // Map labels to trigger types
    const triggerMap = {
      "Women Safety": "Women Safety Alert",
      Police: "Police Alert",
      Ambulance: "Ambulance Alert",
    };

    createEmergencyCallTransaction(triggerMap[label]);
  };

  const handleEmergencyContactCall = (contact) => {
    if (emergencyContactData.length === 0) {
      Alert.alert(
        "No Emergency Contacts",
        "Please add emergency contacts before using the help feature",
        [
          {
            text: "Add Contacts",
            onPress: () => navigation.navigate("SosAddContact"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    if (userHealthProfileData[0]?.wallet === 0) {
      Alert.alert(
        "Insufficient Balance",
        "Please add balance in your wallet before using this feature",
        [
          {
            text: "Add Balance",
            onPress: () => navigation.navigate("SosPlan"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }
    makePhoneCall(contact.contactNumber);
    showCallInitiatedToast(contact.name);

    createEmergencyCallTransaction("Emergency Alert", [contact.id]);
  };

  console.log("showIncompleteProfile", showIncompleteProfile);

  const handleHelpConfirm = () => {
    if (emergencyContactData.length === 0) {
      Alert.alert(
        "No Emergency Contacts",
        "Please add emergency contacts to send alerts",
        [
          {
            text: "Add Contacts",
            onPress: () => navigation.navigate("SosAddContact"),
          },
        ]
      );
      return;
    }

    const allContacts = emergencyContactData.map((contact) => contact.id);

    createEmergencyCallTransaction("Emergency Alert", allContacts);

    setIsAlertSentModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="HELP"
        backPress={handleBackPress}
        iconButtons={[
          {
            icon: "wallet-outline",
            label: "Plans",
            onPress: () => {
              if (showIncompleteProfile) {
                setShowHealthProfileModal(true);
              } else {
                navigation.navigate("SosPlan");
              }
            },
          },
          {
            icon: "document-text-outline",
            label: "Logs",
            onPress: () => {
              if (showIncompleteProfile) {
                setShowHealthProfileModal(true);
              } else {
                navigation.navigate("Logs");
              }
            },
          },
          {
            icon: "settings-outline",
            label: "Settings",
            onPress: () => {
              if (showIncompleteProfile) {
                setShowHealthProfileModal(true);
              } else {
                navigation.navigate("SosSettings");
              }
            },
          },
        ]}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* help circle button */}
        <View style={styles.helpContainer}>
          <Animated.View
            style={[
              styles.circle1,
              {
                transform: [{ scale: circle1Scale }],
                opacity: circle1Opacity,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.circle2,
                {
                  transform: [{ scale: circle2Scale }],
                  opacity: circle2Opacity,
                },
              ]}
            >
              <TouchableOpacity style={styles.circle3} onPress={startAnimation}>
                <Text style={styles.helpText}>HELP</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>

        {/* urgent call divider */}
        <View style={styles.dividerBox}>
          <View style={styles.dividerline} />
          <Text style={styles.urgentCallText}>Urgent Call</Text>
          <View style={styles.dividerline} />
        </View>

        {/* urgent call box container */}
        <View style={styles.urgentCallBoxContainer}>
          {urgentCallData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.urgentCallBox}
              onPress={() => handleUrgentCall(item.contactNumber, item.label)}
            >
              {item.icon}
              <Text style={styles.urgentCallLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dividerline} />

        {/* personal information box */}

        {userHealthProfileLoading && userDataLoading ? (
          <ProfileRowSkeleton />
        ) : (
          <TouchableOpacity
            style={styles.personalInfoBox}
            onPress={() => navigation.navigate("SosPersonalInformation")}
          >
            <View style={styles.personalIconBox}>
              <Ionicons name="person" size={s(20)} color="#1C39BB" />
            </View>
            <Text style={styles.personalInfoText}>Pesonal Information</Text>
            <Ionicons
              name={showIncompleteProfile ? "warning-outline" : "caret-forward"}
              size={s(26)}
              color={showIncompleteProfile ? "#E95455" : "#2372B5"}
            />
          </TouchableOpacity>
        )}

        <View style={styles.dividerline} />

        {/* 5 emergency contact */}
        <View style={styles.emergencyContactBody}>
          <Text style={styles.emergencyContactHeader}>
            Add your Emergency Contacts
          </Text>
          <View style={styles.emergencyContactRow}>
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <EmergencyCardSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {emergencyContactData?.slice(0, 2).map((item, index) => (
                  <View key={index} style={styles.emergencyContactBox}>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeleteConfirmation(item.id)}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={s(20)}
                        color="#D03C3C"
                      />
                    </TouchableOpacity>
                    <View style={styles.profileCircle}>
                      <Ionicons name="person" size={s(30)} color="#707070" />
                    </View>
                    <Text
                      style={styles.personName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => handleEmergencyContactCall(item)}
                    >
                      <Ionicons name="call" size={s(20)} color="#fefefe" />
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.emergencyContactBox}>
                  <View style={styles.addButtonBody}>
                    <TouchableOpacity
                      style={styles.profileAdd}
                      onPress={() => {
                        if (showIncompleteProfile) {
                          setShowHealthProfileModal(true);
                        } else {
                          navigation.navigate("SosAddContact");
                        }
                      }}
                    >
                      <Ionicons
                        name="person-add"
                        size={s(24)}
                        color="#FCFCFC"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => {
                      if (showIncompleteProfile) {
                        setShowHealthProfileModal(true);
                      } else {
                        navigation.navigate("RegisteredContacts");
                      }
                    }}
                  >
                    <Text style={styles.viewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>

                {emergencyContactData?.length === 0 && (
                  <View style={{ flex: 1 }} />
                )}
                {(emergencyContactData?.length === 0 ||
                  emergencyContactData?.length === 1) && (
                  <View style={{ flex: 1 }} />
                )}
              </>
            )}
          </View>
        </View>
        <View style={styles.dividerline} />
        {/*Nearby Emergency Service */}
        <View style={styles.emergencyContactBody}>
          <Text style={styles.emergencyContactHeader}>
            Nearby Emergency Services
          </Text>
          <View style={styles.servicesGrid}>
            {emergencyServiceData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => openGoogleMaps(`${item.searchQuery} near me`)}
              >
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text style={styles.serviceLabel}>{item.label}</Text>
                <Text style={styles.serviceDesc}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <HelpModal
        visible={isHelpModalVisible}
        onClose={() => {
          setCountdown(5);
          setIsHelpModalVisible(false);
          stopAnimation();
          stopVibration();
        }}
        onConfirm={handleHelpConfirm}
        countdown={countdown}
        setCountdown={setCountdown}
      />

      <AlertSentModal
        visible={isAlertSentModalVisible}
        onClose={() => setIsAlertSentModalVisible(false)}
      />

      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        title="Delete Contact"
        message="Are you sure you want to delete this emergency contact?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteContact}
      />

      <HealthProfileFormModal
        visible={showHealthProfileModal}
        onClose={() => setShowHealthProfileModal(false)}
      />
    </View>
  );
};

export default SosHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    padding: ms(16),
    paddingBottom: vs(100),
  },
  helpContainer: {
    width: "100%",
    // height: vs(400),
    justifyContent: "center",
    alignItems: "center",
    padding: ms(20),
  },
  circle1: {
    backgroundColor: "#FFC6C6",
    width: ms(260),
    height: ms(260),
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  circle2: {
    backgroundColor: "#FAA4A5",
    width: ms(220),
    height: ms(220),
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  circle3: {
    backgroundColor: "#E95455",
    width: ms(160),
    height: ms(160),
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  helpText: {
    color: "#FCFCFC",
    fontSize: s(40),
    fontWeight: 900,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  dividerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: s(10),
    width: "100%",
    marginTop: vs(20),
  },
  dividerline: {
    height: s(1),
    flex: 1,
    backgroundColor: "#D5D5D5",
  },
  urgentCallText: {
    color: "#f50c10ff",
    fontSize: s(14),
    fontWeight: 500,
  },
  urgentCallBoxContainer: {
    flexDirection: "row",
    gap: s(10),
    paddingVertical: vs(20),
  },
  urgentCallBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: vs(10),
    borderWidth: s(1),
    borderTopWidth: s(5),
    borderColor: "#1C39BB",
    padding: ms(5),
    borderRadius: s(5),
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  urgentCallLabel: {
    color: "#1C39BB",
    fontSize: s(12),
    fontWeight: "500",
    textAlign: "center",
  },
  personalInfoBox: {
    flexDirection: "row",
    gap: s(10),
    padding: ms(10),
    marginVertical: vs(15),
    borderWidth: s(1),
    borderColor: "#D9D9D9",
    borderRadius: s(8),
    alignItems: "center",
  },
  personalIconBox: {
    backgroundColor: "#EFF6FC",
    borderRadius: s(6),
    padding: ms(8),
  },
  personalInfoText: {
    flex: 1,
    color: color.bottomViewColor,
    fontSize: s(15),
    fontWeight: 500,
  },
  emergencyContactBody: {
    justifyContent: "center",
    marginVertical: vs(15),
  },
  emergencyContactHeader: {
    textAlign: "center",
    fontSize: s(14),
    fontWeight: 600,
    color: "#1C1C1C",
    marginBottom: vs(10),
  },
  emergencyContactRow: {
    flexDirection: "row",
    gap: s(10),
  },
  emergencyContactBox: {
    flex: 1,
    padding: ms(10),
    marginVertical: vs(15),
    borderWidth: s(1),
    borderColor: "#D9D9D9",
    borderRadius: s(8),
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    position: "absolute",
    right: s(5),
    top: s(5),
  },
  profileCircle: {
    marginTop: vs(10),
    backgroundColor: "#E5E5E5",
    padding: ms(10),
    borderRadius: "50%",
  },
  personName: {
    marginVertical: vs(10),
    color: "#1C1C1C",
    fontWeight: 500,
  },
  callButton: {
    width: "100%",
    backgroundColor: "#1B970F",
    alignItems: "center",
    paddingVertical: vs(5),
    borderRadius: s(5),
  },
  addButtonBody: {
    flex: 1,
    justifyContent: "center",
  },
  profileAdd: {
    backgroundColor: "#1C39BB",
    padding: ms(20),
    borderRadius: s(8),
    marginBottom: vs(10),
  },
  viewAllButton: {
    width: "100%",
    backgroundColor: "#1C39BB",
    alignItems: "center",
    paddingVertical: vs(6),
    borderRadius: s(5),
  },
  viewAllText: {
    color: "#FCFCFC",
    fontWeight: 500,
    fontSize: s(13),
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
  },

  serviceCard: {
    width: "47.5%",
    backgroundColor: "#FFFFFF",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: s(12),
    paddingHorizontal: s(12),
    paddingVertical: vs(16),
    marginBottom: vs(6),
  },

  iconWrapper: {
    backgroundColor: "#EFF6FC",
    alignSelf: "flex-start",
    padding: ms(10),
    borderRadius: s(8),
    marginBottom: vs(10),
  },

  serviceLabel: {
    fontSize: s(14),
    fontWeight: 600,
    color: "#1C39BB",
    marginBottom: vs(4),
  },

  serviceDesc: {
    fontSize: s(12),
    fontWeight: 400,
    color: "#1C39BB",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  helpModalContainer: {
    marginTop: vs(80),
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: ms(20),
    alignItems: "center",
  },

  warningCircle: {
    width: s(60),
    height: s(60),
    borderRadius: "50%",
    backgroundColor: "#FFC6C6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(15),
  },
  warningIcon: {
    color: "#E95455",
    fontSize: s(36),
    fontWeight: "bold",
  },
  warningText: {
    color: "#FFF",
    fontSize: s(36),
    fontWeight: "bold",
  },

  helpModalText: {
    fontSize: s(16),
    textAlign: "center",
    marginBottom: vs(20),
    color: "#333",
  },

  countdownText: {
    fontSize: s(48),
    fontWeight: "bold",
    color: "#E95455",
    marginBottom: vs(20),
  },

  helpModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  modalButton: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "#E0E0E0",
  },

  confirmButton: {
    backgroundColor: "#E95455",
  },

  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },

  confirmButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  alertSentModalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: ms(20),
    alignItems: "center",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: s(10),
    right: s(10),
    padding: ms(5),
  },

  tickCircle: {
    width: s(60),
    height: s(60),
    borderRadius: "50%",
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(15),
  },

  alertSentText: {
    fontSize: s(16),
    textAlign: "center",
    marginTop: vs(10),
    color: "#333",
  },
});

const HelpModal = ({
  visible,
  onClose,
  onConfirm,
  countdown,
  setCountdown,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          onConfirm();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.helpModalContainer}>
          <View style={styles.warningCircle}>
            <Text style={styles.warningIcon}>!</Text>
          </View>
          <Text style={styles.helpModalText}>
            Is this an actual emergency or an accidental press?
          </Text>
          <Text style={styles.countdownText}>{countdown}</Text>
          <View style={styles.helpModalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setCountdown(5);
                onClose();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                setCountdown(5);
                onClose();
                onConfirm();
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const AlertSentModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertSentModalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.tickCircle}>
            <Ionicons name="checkmark" size={36} color="#FFF" />
          </View>
          <Text style={styles.alertSentText}>
            Your alert has been sent to Registered Contacts
          </Text>
        </View>
      </View>
    </Modal>
  );
};
