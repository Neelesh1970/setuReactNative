import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [moodTrackerEnabled, setMoodTrackerEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* GENERAL Section - Commented out as per request
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notification</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#8367B1' }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Mood Tracker</Text>
            <Switch
              value={moodTrackerEnabled}
              onValueChange={setMoodTrackerEnabled}
              trackColor={{ false: '#E0E0E0', true: '#8367B1' }}
              thumbColor="white"
            />
          </View>
        </View>
        */}

        {/* USER ACCESS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>USER ACCESS</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Language</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Theme</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* SYSTEM LOGS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SYSTEM LOGS</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Clear Cache</Text>
            <Text style={styles.cacheSize}>12.5 MB</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#1C39BB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerIconPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    paddingLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  cacheSize: {
    fontSize: 14,
    color: '#888',
  },
});

export default SettingsScreen;
