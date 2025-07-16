import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import {
  CustomButton,
  CustomInputBox,
  EditProfileDrawer,
  SosNavbar,
} from "./Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../Utils/ToastService";
import {
  postUserHealthProfile,
  putUserHealthProfile,
} from "../../features/sos/userHealthProfileSlice";
import { formatDate } from "./Services/helperFunction";
import RNFetchBlob from "rn-fetch-blob";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";

const SosPersonalInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userHealthProfileData } = useSelector(
    (state) => state.userHealthProfile
  );
  const { userData } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyNotes, setEmergencyNotes] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  const viewShotRef = useRef();
  const qrValue = `https://setu.searchintech.in/sos/profile/${userData?.user_id}`;

  const validate = () => {
    let tempErrors = {};
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/i;

    if (!bloodGroup.trim()) {
      tempErrors.bloodGroup = "Blood Group is required";
    } else if (!bloodGroupRegex.test(bloodGroup.trim().toUpperCase())) {
      tempErrors.bloodGroup =
        "Invalid Blood Group. Use formats like A+, B-, AB+, O-";
    }

    if (!allergies.trim()) {
      tempErrors.allergies = "Please enter any known allergies or write 'None'";
    }

    if (!medicalConditions.trim()) {
      tempErrors.medicalConditions =
        "Please specify any medical conditions or write 'None'";
    }

    if (!medications.trim()) {
      tempErrors.medications =
        "List medications you're currently taking or write 'None'";
    }

    if (!emergencyNotes.trim()) {
      tempErrors.emergencyNotes = "Emergency Notes cannot be empty";
    }

    setInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    if (userHealthProfileData.length === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [userHealthProfileData]);

  const handleCreate = async () => {
    if (!validate()) return;
    setButtonLoading(true);

    try {
      dispatch(
        postUserHealthProfile({
          bloodGroup,
          allergies,
          medicalConditions,
          medications,
          emergencyNotes,
        })
      );

      ToastService.showSuccess("Success!", "Profile created successfully!");
    } catch (error) {
      ToastService.showError(
        "Error!",
        error?.message || "Something Went Wrong!"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  const handleUpdate = () => {
    setShowEditDrawer(true);
  };

  const handleUpdateHealthProfile = async (healthData) => {
    try {
      await dispatch(
        putUserHealthProfile(userHealthProfileData[0]?.id, healthData)
      );
      ToastService.showSuccess("Success!", "Profile updated successfully!");
      console.log("error::");
    } catch (error) {
      console.log("error::", error);
      ToastService.showError("Error!", "Failed to update profile");
    }
  };

  const handleTextChange = (setter, field) => (text) => {
    setter(text);
    if (inputErrors[field]) {
      setInputErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBloodGroupChange = (text) => {
    // Allow only letters A, B, O and symbols + -
    let formatted = text.toUpperCase().replace(/[^ABO+-]/g, "");

    if (formatted.length > 3) {
      formatted = formatted.slice(0, 3);
    }

    setBloodGroup(formatted);

    if (inputErrors.bloodGroup) {
      setInputErrors((prev) => ({ ...prev, bloodGroup: "" }));
    }
  };

  const downloadQRCode = async () => {
    try {
      // Capture the QR code
      const uri = await viewShotRef.current.capture({
        format: "png",
        quality: 1, // Highest quality
      });

      // Handle Android permissions for devices below Android 10
      if (Platform.OS === "android" && Platform.Version < 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to storage to save QR code",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error("Storage permission denied");
        }
      }

      // Generate file path
      const fileName = `QR_Code_${
        userData?.user_id
      }_${new Date().getTime()}.png`;
      const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;

      // Save the file
      await RNFetchBlob.fs.cp(uri, filePath);

      // For Android, add to downloads manager
      if (Platform.OS === "android") {
        RNFetchBlob.android.addCompleteDownload({
          title: fileName,
          description: "QR Code downloaded",
          mime: "image/png",
          path: filePath,
          showNotification: true,
        });
      }

      Alert.alert("Success", "QR code saved to Downloads folder");
    } catch (error) {
      console.error("Error saving QR code:", error);
      Alert.alert(
        "Error",
        "Failed to save QR code. Please check app permissions in settings.",
        [
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Personal Information"
        backPress={() => {
          navigation.goBack();
        }}
        iconButtons={[
          {
            icon: "document-text-outline",
            label: "Logs",
            onPress: () => navigation.navigate("Logs"),
          },
        ]}
      />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* profile not present */}
          {showForm ? (
            <View>
              <Text style={[styles.primaryText, { marginBottom: vs(20) }]}>
                Complete your profile to start using the SOS feature.
              </Text>
              <CustomInputBox
                label="Blood Group"
                placeholder="Eg: A+"
                value={bloodGroup}
                onChangeText={handleBloodGroupChange}
                error={inputErrors.bloodGroup}
                maxLength={3}
              />
              <CustomInputBox
                label="Allergies"
                placeholder="Eg: Penicillin, Peanuts, Dust"
                value={allergies}
                onChangeText={handleTextChange(setAllergies, "allergies")}
                error={inputErrors.allergies}
              />
              <CustomInputBox
                label="Medical Conditions"
                placeholder="Eg: Diabetes, Hypertension"
                value={medicalConditions}
                onChangeText={handleTextChange(
                  setMedicalConditions,
                  "medicalConditions"
                )}
                error={inputErrors.medicalConditions}
              />
              <CustomInputBox
                label="Medications"
                placeholder="Eg: Insulin, Aspirin"
                value={medications}
                onChangeText={handleTextChange(setMedications, "medications")}
                error={inputErrors.medications}
              />
              <CustomInputBox
                label="Emergency Notes"
                placeholder="Eg: Asthmatic, carries inhaler"
                value={emergencyNotes}
                onChangeText={handleTextChange(
                  setEmergencyNotes,
                  "emergencyNotes"
                )}
                error={inputErrors.emergencyNotes}
                multiline={true}
                numberOfLines={2}
              />
            </View>
          ) : (
            <View>
              {/* profile card */}
              <View style={styles.profileCard}>
                <View style={styles.profileImageRow}>
                  <View style={styles.profileCircle}>
                    <Ionicons name="person" size={s(40)} color="#707070" />
                  </View>
                </View>
                <ProfileRow
                  title="Full Name:"
                  value={`${userData?.first_name} ${userData?.last_name}`}
                />
                <ProfileRow title="Gender:" value={userData?.gender} />
                <ProfileRow
                  title="Date of Birth:"
                  value={formatDate(userData?.dob)}
                />

                <ProfileRow title="Email:" value={userData?.email} />
                <ProfileRow
                  title="Phone Number:"
                  value={userData?.phone_number}
                />
                <ProfileRow
                  title="Blood Group:"
                  value={[userHealthProfileData[0]?.bloodGroup]}
                />
                <ProfileRow
                  title="Allergies:"
                  value={[userHealthProfileData[0]?.allergies]}
                />
                <ProfileRow
                  title="Medical Conditions:"
                  value={[userHealthProfileData[0]?.medicalConditions]}
                />
                <ProfileRow
                  title="Medications:"
                  value={[userHealthProfileData[0]?.medications]}
                />
                <ProfileRow
                  title="Emergency Notes:"
                  value={[userHealthProfileData[0]?.emergencyNotes]}
                />
              </View>
              {/* qr card */}
              <View style={styles.cardBody}>
                <View style={styles.cardBodyLeft}>
                  <View>
                    <Text style={styles.primaryText}>Get QR</Text>
                    <Text style={styles.secondaryText}>Sticker</Text>
                  </View>
                  <ViewShot
                    ref={viewShotRef}
                    options={{ format: "png", quality: 1 }}
                  >
                    <QRCode
                      value={qrValue}
                      size={150}
                      color="black"
                      backgroundColor="white"
                      quietZone={10}
                      ecl="H"
                    />
                  </ViewShot>
                </View>
                <View style={styles.cardBodyRight}>
                  <TouchableOpacity onPress={downloadQRCode}>
                    <MaterialIcons
                      name="file-download"
                      size={s(28)}
                      color="#1C57A5"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* edit button */}
      <View style={styles.editBtnBody}>
        <CustomButton
          title={showForm ? "Create Profile" : "Edit Profile"}
          onPress={showForm ? handleCreate : handleUpdate}
          type="primary"
          disabled={buttonLoading}
        />
      </View>
      {showEditDrawer && (
        <EditProfileDrawer
          visible={showEditDrawer}
          onClose={() => setShowEditDrawer(false)}
          userData={userData}
          healthProfileData={userHealthProfileData}
          onUpdateHealthProfile={handleUpdateHealthProfile}
        />
      )}
    </View>
  );
};

export default SosPersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2372B5",
    borderWidth: 1,
    borderRadius: s(12),
    paddingHorizontal: s(12),
    paddingVertical: vs(16),
  },
  profileImageRow: { width: "100%", alignItems: "center" },
  profileRow: {
    flexDirection: "row",
    marginTop: vs(20),
  },
  profileRowTitle: {
    fontSize: s(13),
    fontWeight: 500,
    color: "#1C57A5",
    width: "40%",
  },
  profileRowValue: {
    fontSize: s(13),
    fontWeight: 500,
    color: "#1C1C1C",
  },
  profileCircle: {
    backgroundColor: "#E5E5E5",
    height: s(80),
    width: s(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  cardBody: {
    flexDirection: "row",
    marginVertical: vs(20),
  },
  cardBodyLeft: {
    borderWidth: 1,
    borderColor: "#1C57A5",
    paddingVertical: s(10),
    paddingHorizontal: vs(20),
    flex: 1,
    borderTopLeftRadius: s(6),
    borderBottomLeftRadius: s(6),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBodyRight: {
    borderWidth: 1,
    borderColor: "#1C57A5",
    paddingVertical: s(10),
    paddingHorizontal: vs(15),
    borderLeftWidth: 0,
    borderTopRightRadius: s(6),
    borderBottomRightRadius: s(6),
    justifyContent: "center",
  },
  primaryText: {
    fontSize: s(16),
    fontWeight: 700,
    color: "#1C57A5",
  },
  secondaryText: {
    fontSize: s(12),
    fontWeight: 400,
    color: "#726969",
  },
  editBtnBody: {
    padding: ms(20),
    boxShadow: "0px -5px 10px rgba(11, 9, 27, 0.1)",
  },
});

const ProfileRow = ({ title, value }) => {
  return (
    <View style={styles.profileRow}>
      <Text
        style={styles.profileRowTitle}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text
        style={styles.profileRowValue}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );
};
