import React, {memo} from 'react';
import {StatusBar, StyleSheet, View, Platform} from 'react-native';
import {normalize} from '../../Utils/normalize';

export default memo(props => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? normalize(20) : normalize(35),
    backgroundColor: 'white',
  },
});
