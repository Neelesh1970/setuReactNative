import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
// import AddressHeader from './AddressHeader'
import RecentAddress from './RecentAddress'
import CartHeader from '../BookTest/Cart/CartHeader'
import { FetchAddressList } from '../../../Utils/api/bookTest'
import Loader, { hideLoader, showLoader } from '../../../Utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ToastService from '../../../Utils/ToastService'
import { AddressList } from '../../../features/booktest/booktestSlice'
import { getItem } from '../../../Utils/utils'

const ChangeAddress = () => {
  const dispatch = useDispatch()
  const AddressListDataa = useSelector((state) => state.bookTest.AddressListData);
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

  console.log('AddressListDataa', AddressListDataa)

  const FetchAddressListAPI = async () => {
    showLoader();
    try {
      const dataa = {
        'user_id': userID
      }
      const response = await FetchAddressList(dataa);
      console.log('FetchAddressList Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // navigation.navigate('PickupSlotDetails');
        // ToastService.showSuccess('Success!', response.data.message || 'Address added successfully.')
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

  useEffect(() => {
    if (userID && userID != null) {
      FetchAddressListAPI()
    }
  }, [userID])

  return (
    <View>
      <Loader />
      <CartHeader name="Change or Add Address" />
      <RecentAddress AddressListDataa={AddressListDataa} />
    </View>
  )
}

export default ChangeAddress
