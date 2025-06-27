import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { color } from "../../../assets/colors/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import CartHeader from "./Cart/CartHeader";
import { getItem } from "../../../Utils/utils";
import { hideLoader, showLoader } from "../../../Utils/Loader";
import ToastService from "../../../Utils/ToastService";
import { setUserData } from "../../../features/user/userSlice";
import { editUserProfileAPI } from "../../../Utils/api/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';


const EditUserProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params || {};

  const [firstName, setFirstName] = useState(userData?.first_name || "");
  const [lastName, setLastName] = useState(userData?.last_name || "");
  const [dob, setDob] = useState(userData?.dob ? new Date(userData.dob) : new Date());
  const [gender, setGender] = useState(userData?.gender || "");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone_number || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [uhid, setUhid] = useState(null);


  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);


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

  const copyToClipboard = () => {
    if (uhid) {
      Clipboard.setString(uhid);
      ToastService.showSuccess("Copied!", "UHID copied to clipboard.");
    } else {
      ToastService.showError("Error!", "UHID not available.");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const handleSave = async () => {
    if (validate()) {
      showLoader();
      const data = {
        "user_id": userID,
        "firstName": firstName,
        "lastName": lastName,
        "username": `${firstName}${lastName}`,
        "dob": dob.toISOString().split('T')[0],
        "gender": gender,
        "phoneNumber": phoneNumber,
        "email": email
      };

      console.log("data api ", data);
      try {

        const response = await editUserProfileAPI(data);
        console.log('editUserProfileAPI Response:', response);

        if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
          setUserData(response.data.data);
          ToastService.showSuccess("Profile Updated", "Your profile has been updated successfully.");
          navigation.goBack();
        } else {
          ToastService.showError('Error!', response.data.message || "Something Went Wrong");
        }
      } catch (error) {
        console.log('Error from editUserProfileAPI call:', error.response ? error.response.data : error.message);
        ToastService.showError('Error!', error.response?.data?.message || "An error occurred. Please try again later.");
      } finally {
        hideLoader();
      }
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();


    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1;
    }
    return age;
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    } else {
      const age = calculateAge(dob);
      if (age < 1) {
        newErrors.dob = "You are unauthorized because you are below 1 year old.";
        valid = false;
      }
    }

    if (!gender.trim()) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  return (
    <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container}>
      <CartHeader name="My Profile" />
      <View style={styles.innercontainer}>
        <View style={styles.uhidContainer}>
          <Text style={styles.label}>UHID: </Text>
          <Text style={styles.uhidText}>{uhid}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyIcon}>
            <Icon name="copy" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{dob.toLocaleDateString("en-GB")}</Text>
          <Icon name="calendar" size={20} color="#555" style={styles.calendarIcon} />
        </TouchableOpacity>
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Gender</Text>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setGender("Male")}
          >
            <View style={styles.radioCircle}>
              {gender === "Male" && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setGender("Female")}
          >
            <View style={styles.radioCircle}>
              {gender === "Female" && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>

        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innercontainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  dateText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
  },
  saveButton: {
    backgroundColor: color.editBlue,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#555",
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
  },
  uhidText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "left",
    padding: 9,
  },
  uhidContainer: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  copyIcon: {
    padding: 10,
  },
});
