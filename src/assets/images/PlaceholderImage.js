import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PlaceholderImage = ({ width = 100, height = 100, color = '#e0e0e0', borderRadius = 0 }) => (
  <View style={[styles.placeholder, { width, height, backgroundColor: color, borderRadius }]} />
);

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default PlaceholderImage;
