import React, { useState } from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

let loaderControl = {};

const Loader = () => {
  const [visible, setVisible] = useState(false);

  loaderControl.showLoader = () => setVisible(true);
  loaderControl.hideLoader = () => setVisible(false);

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

export const showLoader = () => {
  if (loaderControl.showLoader) {
    loaderControl.showLoader();
  }
};

export const hideLoader = () => {
  if (loaderControl.hideLoader) {
    loaderControl.hideLoader();
  }
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  loader: {
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
});

export default Loader;
