import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EcartBottomNavBar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'Home', icon: 'home' },
    { key: 'Categories', icon: 'list' },
    { key: 'Favorites', icon: 'heart-outline' },
    { key: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
          >
            <Icon
              name={tab.icon}
              size={22}
              color={isActive ? '#000' : '#7a7a7a'}
            />
            <Text style={isActive ? styles.labelActive : styles.label}>
              {tab.key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default EcartBottomNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#7a7a7a',
    marginTop: 4,
  },
  labelActive: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    marginTop: 4,
  },
});
