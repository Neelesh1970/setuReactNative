import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ms } from 'react-native-size-matters';

const NeedAssistanceBooktest = () => {

  const phoneNumber = '+918605080945';

    const handleCall = () => {
        Linking.openURL(`tel:${phoneNumber}`); 
    };
  return (
    <View style={styles.container}>
      {/* Assistance Section */}
      <View style={styles.assistanceBox}>
        <Text style={styles.assistanceText}>
          <Text style={styles.boldText}>Need assistance</Text>{"\n"}
          <Text>in completing booking?</Text>
        </Text>
        <TouchableOpacity style={styles.callBackButton}
        onPress={handleCall}
        >
          <Text style={styles.callBackText}>Get A Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
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
    display:'flex',
    flexDirection:'column'
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
    marginRight: ms(10)
  },
  callBackText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NeedAssistanceBooktest;
