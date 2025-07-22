import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import Loader, { hideLoader, showLoader } from '../../../Utils/Loader';
import { FetchAddressList, RemoveAddressApi, SlotDetails, updateDefaultAddress } from '../../../Utils/api/bookTest';
import ToastService from '../../../Utils/ToastService';
import { AddressList, slotDetails } from '../../../features/booktest/booktestSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getItem } from '../../../Utils/utils';
import AddressForm from './AddressForm';
import BottomModal from '../BookTest/Cart/BottomModal';


const addresses = [
  {
    id: '1',
    type: 'Home',
    address: 'KM Park, Model Colony\nPune, Maharashtra(411016)',
    name: 'Bhawana M',
    phone: '91+ xxxx xxxx xx',
  },
  {
    id: '2',
    type: 'Office',
    address: 'KM Park, Model Colony\nPune, Maharashtra(411016)',
    name: 'Bhawana M',
    phone: '91+ xxxx xxxx xx',
  },
];

const RecentAddress = ({ AddressListDataa }) => {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const activeModule = useSelector((state) => state.auth.activeModule);


  const [itemData, setItemData] = useState()

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

  const filterDefault = AddressListDataa?.filter((item) => {
    if (item?.isDefault === true) {
      return item
    }
  })?.[0]?.addressId

  console.log("filterDefault", filterDefault)
  console.log("RecentAddress AddressListDataa", AddressListDataa)

  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("selectedAddress", selectedAddress)
    setSelectedAddress(filterDefault)
  }, [filterDefault])

  const handleDeafultAddress = (addressId) => {
    if (userID && userID != null) {
      updateDefaultAddressApi(addressId)
    }
  }


  const updateDefaultAddressApi = async (addressId) => {
    showLoader();
    try {
      const data = {
        "addressId": addressId,
        'user_id': userID
      }
      const response = await updateDefaultAddress(data);
      console.log('updateDefaultAddress Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // ToastService.showSuccess('Success!', response.data.message || 'Address updated successfully.')
        if (activeModule === 'agri') {
          navigation.navigate('AgroScreenSlotDetails');
        } else {
          navigation.navigate('PickupSlotDetails');
        }

      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from updateDefaultAddress call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', error.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }


  const removeAddressApi = async (addressId) => {
    showLoader();
    try {
      const data = {
        "addressId": addressId,
        'user_id': userID
      }
      const response = await RemoveAddressApi(data);
      console.log('removeAddress Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        FetchAddressListAPI()
        ToastService.showSuccess('Success!', response.data.message || 'Address remove successfully.')
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from removeAddress call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', error.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  const showRemoveConfirmation = (addressId) => {
    console.log('addressId::', addressId)
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (userID && userID != null) {
              removeAddressApi(addressId)
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };


  const FetchAddressListAPI = async () => {
    showLoader();
    try {
      const data = {
        'user_id': userID
      }
      const response = await FetchAddressList(data);
      console.log('FetchAddressList Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(AddressList({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from FetchAddressListAPI call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal2 = (item) => {
    setItemData(item)
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Add new address button */}
        {/* <Toast/> */}
        <Loader />
        <Text style={styles.addButton}
          onPress={openModal}
        // onPress={() => navigation.navigate("Address", { FromChangeScreenToAddNew: true, FromChangeScreen: false })}
        >
          Add new address
        </Text>

        <BottomModal isVisible={isModalVisible} onClose={closeModal}>
          <AddressForm navigation={navigation} FetchAddressListAPI={FetchAddressListAPI} FromChangeScreen={false} closeModal={closeModal} FromChangeScreenToAddNew={true} />
        </BottomModal>

        <BottomModal isVisible={isModalVisible2} onClose={closeModal2}>
          <AddressForm navigation={navigation} FetchAddressListAPI={FetchAddressListAPI} Address={itemData} FromChangeScreen={true} closeModal={closeModal2} />
        </BottomModal>


        {
          Array.isArray(AddressListDataa) && AddressListDataa?.length === 0 && <Text style={{
            // alignItems:'center',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: 'red',
            fontWeight: 'bold',
            marginTop: '50%'
          }}>Address not found</Text>
        }

        {
          AddressListDataa?.length > 0 &&
          <>
            <Text style={styles.recentAddressText}>Recent address</Text>

            <FlatList
              data={AddressListDataa}
              keyExtractor={(item) => item?.addressId}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <TouchableOpacity onPress={
                    () => {
                      setSelectedAddress(item?.addressId)
                      handleDeafultAddress(item?.addressId)
                    }
                  } style={styles.radioContainer}>
                    <RadioButton
                      value={item?.addressId}
                      status={selectedAddress === item?.addressId ? 'checked' : 'unchecked'}
                      // onPress={() => {
                      //   setSelectedAddress(item?.addressId)
                      //   handleDeafultAddress(item?.addressId)
                      // }
                      // }
                      style={styles.radioButton}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.addressType}>
                        {item?.addressType
                          ? item.addressType.charAt(0).toUpperCase() + item.addressType.slice(1).toLowerCase()
                          : ''}

                      </Text>
                      <Text>{item?.houseNumber},{item?.pincode}</Text>
                      <Text>{item?.recipientName}</Text>
                      <Text>{item?.phoneNumber}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                      <Icon2 onPress={() => showRemoveConfirmation(item?.addressId)} name="cross" size={24} color="#000" style={styles.icon} />
                      <Icon onPress={() => { openModal2(item) }}
                        name="edit" size={24} color="#000" style={styles.icon} />
                    </View>
                  </TouchableOpacity>


                </Card>
              )}
            />
          </>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 10, height: '100%' },

  addButton: {
    height: 40,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#979797',
    color: '#1976D2',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  recentAddressText: { marginHorizontal: 10, marginTop: 10, fontWeight: 'bold' },

  card: { margin: 10, padding: 10, backgroundColor: '#FFFFFF' },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  radioButton: {
    alignSelf: 'flex-start',
    paddingTop: 5,
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  addressType: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },

  iconContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  icon: {
    marginBottom: 10,
  },
});

export default RecentAddress;
