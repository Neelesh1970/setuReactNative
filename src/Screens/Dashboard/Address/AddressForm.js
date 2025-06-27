import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { color } from '../../../assets/colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import ToastService from '../../../Utils/ToastService';
import { hideLoader, showLoader } from '../../../Utils/Loader';
import { Addaddress, updateAddressApi } from '../../../Utils/api/bookTest';
import { getItem } from '../../../Utils/utils';
import axios from 'axios';

const AddressForm = ({ navigation, route, closeModal = () => { }, FromChangeScreen = false, FromChangeScreenToAddNew = false, Address, FetchAddressListAPI = () => { } }) => {
  // const Address = route?.params?.Address || 'No address provided';
  //  const isFromChangeScreen = FromChangeScreen   //route?.params?.FromChangeScreen
  // const FromChangeScreenToAddNew = FromChangeScreenToAddNew // route?.params?.FromChangeScreenToAddNew
  const { addressId = '', addressType = '', houseNumber = '', phoneNumber = '', pincode = '', recipientName = '' } = Address || {}

  const [userID, setUserID] = useState(null);
  // const MAP_API_KEY = '5b3ce3597851110001cf6248a454e687855c4177bd5f7b71c39f4fa2';


  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);


  console.log('Address form', Address)
  console.log('FromChangeScreen', FromChangeScreen)
  console.log('FromChangeScreenToAddNew', FromChangeScreenToAddNew)

  const [address, setAddress] = useState({
    // fcRoad: '',
    pincode: '',
    houseNumber: '',
    recipientName: '',
    phoneNumber: '',
    addressType: 'Home',
  });

  useEffect(() => {
    if (Address) {
      const updatedData = {
        // fcRoad: '',
        pincode: pincode,
        houseNumber: houseNumber,
        recipientName: recipientName,
        phoneNumber: phoneNumber,
        addressType: addressType,
      }
      setAddress(updatedData)
    }
  }, [Address])

  const [errorPincode, setErrorPincode] = useState('');
  const [errorHouseNumber, setErrorHouseNumber] = useState('');
  const [errorRecipientName, setErrorRecipientName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

  const areAllValuesTrue = (validArray) => validArray.every(value => value === true);

  const validateForm = () => {
    let validArray = [];

    if (address.pincode.length !== 6 || isNaN(address.pincode)) {
      setErrorPincode('Please enter a valid 6-digit pincode.');
      validArray.push(false);
    } else {
      setErrorPincode('');
      validArray.push(true);
    }

    // if (!address.houseNumber) {
    //   setErrorHouseNumber('House number cannot be empty.');
    //   validArray.push(false);
    // } else {
    //   setErrorHouseNumber('');
    //   validArray.push(true);
    // }
    if (!address.houseNumber) {
      setErrorHouseNumber('House number cannot be empty.');
      validArray.push(false);
    } else if (address.houseNumber.length < 25 || address.houseNumber.length > 255) {
      setErrorHouseNumber('Address must be between 25 and 255 characters.');
      validArray.push(false);
    } else {
      setErrorHouseNumber('');
      validArray.push(true);
    }

    if (!address.recipientName) {
      setErrorRecipientName("Recipient's name cannot be empty.");
      validArray.push(false);
    } else {
      setErrorRecipientName('');
      validArray.push(true);
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(address.phoneNumber)) {
      setErrorPhoneNumber('Please enter a valid 10-digit phone number.');
      validArray.push(false);
    } else {
      setErrorPhoneNumber('');
      validArray.push(true);
    }

    return areAllValuesTrue(validArray);
  };

  const resetData = () => {
    setErrorPincode('');
    setErrorHouseNumber('');
    setErrorRecipientName('');
    setErrorPhoneNumber('');
    setAddress({
      pincode: '',
      houseNumber: '',
      recipientName: '',
      phoneNumber: '',
      addressType: 'Home',
    });
  }

 // Address Validation Section(Longitude and Latitude)  
 
  // const validateAddressWithORS = async () => {
  //   try {
  //     const fullAddress = `${address.houseNumber}, ${address.pincode}`;
      
  //     // Geocoding request to convert address to coordinates
  //     const geocodingResponse = await axios.get(
  //       `https://api.openrouteservice.org/geocode/search`,
  //       { 
  //         params: { 
  //           api_key: MAP_API_KEY, 
  //           text: fullAddress
  //         } 
  //       }
  //     );

  //     console.log('Geocoding Response:', geocodingResponse.data);
  
  //     // Check if geocoding returned valid results
  //     if (geocodingResponse.data && 
  //         geocodingResponse.data.features && 
  //         geocodingResponse.data.features.length > 0) {
        
  //       const [longitude, latitude] = geocodingResponse.data.features[0].geometry.coordinates;
  //       console.log('Extracted Coordinates:', {
  //         longitude, 
  //         latitude
  //       });
  //       setAddress(prev => ({
  //         ...prev, 
  //         latitude, 
  //         longitude
  //       }));

  //       console.log('Updated Address State:', {
  //         ...address,
  //         latitude, 
  //         longitude
  //       });
  
  //       return true;
  //     } else {
  //       console.log('No valid coordinates found for the address');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Address validation error:", error);
  //     return false;
  //   }
  // };
  
  // const handleSave = async () => {
  //   if (!validateForm()) {
  //     ToastService.showError('Error!', "Please correct the highlighted errors.");
  //     return;
  //   }
  
  //   showLoader();
  //   try {
  //     const isValidAddress = await validateAddressWithORS();
      
  //     if (!isValidAddress) {
  //       setErrorHouseNumber("Please enter a valid and complete address.");
  //       ToastService.showError('Error!', "Address validation failed. Please check your details.");
  //       return;
  //     }
  //     console.log('Initial Address State:', address);
  
  //     // Proceed with saving address if validation succeeds
  //     if (userID) {
  //       FromChangeScreen ? UpdateAddressAPI() : AddAddressAPI();
  //     }
  //   } catch (error) {
  //     ToastService.showError('Error!', "An error occurred during address validation.");
  //   } finally {
  //     hideLoader();
  //   }
  // };


  const handleSave = () => {
    // navigation.navigate('PickupSlotDetails');
    if (validateForm() && userID && userID != null) {
      console.log("FromChangeScreen", FromChangeScreen);
      if (FromChangeScreen) {
        UpdateAddressAPI()
      } else {
        AddAddressAPI()
      }
      console.log("AddressForm", address);
    } else {
      ToastService.showError('Error!', "Please correct the highlighted errors.")
    }
  };


  const AddAddressAPI = async () => {
    showLoader();
    try {
      console.log('AddAddressAPI data input:', address);
      const data = { ...address, "user_id": userID }
      const response = await Addaddress(data);
      console.log('AddAddressAPI Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        if (FromChangeScreenToAddNew) {
          // navigation.navigate("ChangeAddress")
        } else {
          navigation.navigate('PickupSlotDetails');
        }
        ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
        resetData()
        closeModal()
        FetchAddressListAPI()
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from AddAddressAPI call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  const UpdateAddressAPI = async () => {
    showLoader();
    try {
      const data = { ...address, "addressId": addressId, "user_id": userID }
      console.log('UpdateAddressAPI data input:', data);
      const response = await updateAddressApi(data);
      console.log('UpdateAddressAPI Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
        closeModal()
        FetchAddressListAPI()
        navigation.navigate("PickupSlotDetails")
        resetData()
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from UpdateAddressAPI call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  const renderChip = (type) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.chip,
        address?.addressType === type && styles.chipSelected,
      ]}
      onPress={() => setAddress({ ...address, addressType: type })}>
      <Text style={address?.addressType === type ? styles.chipTextSelected : styles.chipText}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
      <KeyboardAwareScrollView
      enableOnAndroid={true}
      > 
        <View>
          <Text style={styles.header}>Add address details</Text>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {/* <View style={styles.location}>
        <View style={styles.locationIcon}>
          <Icon name="location-outline" size={25} color='black' />
        </View>
        <View style={styles.label}>
          <Text style={styles.road}>F.C. Road</Text>
          <Text style={styles.SubAddress}>Shivajinagar, Pune, Maharashtra, India</Text>
        </View>
      </View> */}
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Pincode*"
              maxLength={6}
              value={address?.pincode}
              onChangeText={(text) => setAddress({ ...address, pincode: text })}
              keyboardType="numeric"
            />
            {errorPincode ? <Text style={styles.errorText}>{errorPincode}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="House number, floor, building name, locality*"
              value={address?.houseNumber}
              onChangeText={(text) => setAddress({ ...address, houseNumber: text })}
            />
            {errorHouseNumber ? <Text style={styles.errorText}>{errorHouseNumber}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Recipient’s name*"
              value={address.recipientName}
              onChangeText={(text) => setAddress({ ...address, recipientName: text })}
            />
            {errorRecipientName ? <Text style={styles.errorText}>{errorRecipientName}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Phone number*"
              maxLength={10}
              value={address.phoneNumber}
              onChangeText={(text) => setAddress({ ...address, phoneNumber: text })}
              keyboardType="phone-pad"
            />
            {errorPhoneNumber ? <Text style={styles.errorText}>{errorPhoneNumber}</Text> : null}

            <Text style={styles.label}>Address name and type*</Text>
            <View style={styles.chipContainer}>
              {['Home', 'Office', 'Other'].map(renderChip)}
            </View>
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtntxt}> Save address</Text>
          </TouchableOpacity>
        </View>
       </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    padding: 20,
  },
  label: {
    fontSize: 16,
    flexDirection: 'column',
    paddingVertical: 10,
  },
  SubAddress: {
    color: '#323232',
    fontFamily: 'Roboto',
    fontWeight: '10'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputpincode: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  chipContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  chipSelected: {
    backgroundColor: '#140B41',
    // borderColor: '#007bff',
  },
  chipText: {
    fontSize: 14,
    color: '#000',
  },
  chipTextSelected: {
    fontSize: 14,
    color: '#fff',
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  saveBtn: {
    // padding: 5,
    margin: 10,
    backgroundColor: '#1C57A5',
    height: 42,
    width: 'auto',
    borderRadius: 10,
  },
  saveBtntxt: {
    // textAlign:'center',
    alignSelf: 'center',
    marginTop: ms(10),
    // alignItems: 'center',
    fontFamily: 'Roboto',
    width: 'auto',
    color: '#FFFFFF',
    fontStyle: 'normal',
    // lineHeight: 140,
    fontSize: 16,
    fontWeight: 600
  },
  locationIcon: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  road: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: 14,
    // lineHeight: 140,
    color: ' #000000'
  },
  errorText: { color: 'red', marginBottom: 10 },

});

export default AddressForm;




