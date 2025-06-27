import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";



const SelectedAddress = ({ slotDetailsDataa }) => {
  const { addressId = '', pincode = '', houseNumber = '', recipientName = '', phoneNumber = '', addressType = '' } = slotDetailsDataa || {}
  console.log("SelectedAddress slotDetailsDataa", slotDetailsDataa)

  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* <Icon name="location-outline" size={25} color='#2372B5' /> */}
        <Icon name="location" size={25} color="#2372B5" />
        <Text style={styles.title}>
          {addressType
            ? addressType.charAt(0).toUpperCase() + addressType.slice(1).toLowerCase()
            : ''}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ChangeAddress")}>
          <Text style={styles.changeAddress}>Change Address</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.address}>
        {houseNumber}, {pincode}, {phoneNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    flex: 1,
  },
  changeAddress: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    paddingLeft: 10
  },
  icon: {
    height: 24,
    width: 24
  }
});

export default SelectedAddress;
