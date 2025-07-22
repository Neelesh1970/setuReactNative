import { View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import ToastService from '../../../Utils/ToastService';
import { hideLoader, showLoader } from '../../../Utils/Loader';
import { getItem } from '../../../Utils/utils';
import { callconsultApi } from '../../../Utils/api/Agriculture';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

const NeedAssistance = () => {
  const [userID, setUserID] = useState(null);
  const categoriesData = useSelector(
    (state) => state.agriculture.categoriesData
  );

  const callCounsultAPI = () => {
    const phoneNumber = '+918605080945';
    Linking.openURL(`tel:${phoneNumber}`)
      .catch((err) => console.error('Error opening dialer:', err));
  }

  // const callCounsultAPI = async () => {
  //   showLoader();
  //   const data = {
  //     user_id: userID,
  //     type: 'agriculture',
  //   };
  //   try {
  //     console.log('callCounsultAPI data input:', data);
  //     const response = await callconsultApi(data);
  //     console.log('callCounsultAPI Response:', response);

  //     if (
  //       response &&
  //       (response.status === 200 || response.status === 201) &&
  //       !response?.data?.hasError
  //     ) {
  //       ToastService.showSuccess(
  //         'Success!',
  //         response.data.message || 'Thank you setu team will reach out soon!'
  //       );
  //     } else {
  //       ToastService.showError(
  //         'Error!',
  //         response.data.message || 'Something Went Wrong'
  //       );
  //     }
  //   } catch (error) {
  //     console.log(
  //       'Error from callCategory call:',
  //       error.response ? error.response.data : error.response.data.message
  //     );
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       ToastService.showError('Error!', error.response.data.message);
  //     } else {
  //       ToastService.showError(
  //         'Error!',
  //         'An error occurred. Please try again later.'
  //       );
  //     }
  //   } finally {
  //     hideLoader();
  //   }
  // };

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);

  return (
    <View style={styles.container}>
      {/* Assistance Section */}
      <View style={styles.assistanceBox}>
        <Text style={styles.assistanceText}>
          <Text style={styles.boldText}>Need assistance</Text>
          {'\n'}
          <Text>in completing booking?</Text>
        </Text>
        <TouchableOpacity
          style={styles.callBackButton}
          onPress={callCounsultAPI}
        >
          <Text style={styles.callBackText}>Get A Call Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  assistanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  assistanceText: {
    fontSize: 14,
    color: '#777',
    display: 'flex',
    flexDirection: 'column',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  callBackButton: {
    backgroundColor: '#53C275',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: ms(10),
  },
  callBackText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NeedAssistance;
