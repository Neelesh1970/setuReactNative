import AsyncStorage from '@react-native-async-storage/async-storage';

const MOOD_STORAGE_KEY = '@mental_health_mood_logs';
const ACTIVITY_STORAGE_KEY = '@mental_health_activity_logs';

export const logMood = async (moodData) => {
  try {
    // Get existing logs
    const existingLogs = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    
    // Add new log with timestamp if not provided
    const newLog = {
      ...moodData,
      id: Date.now().toString(),
      timestamp: moodData.timestamp || new Date().toISOString(),
    };
    
    // Save updated logs
    await AsyncStorage.setItem(
      MOOD_STORAGE_KEY,
      JSON.stringify([...logs, newLog])
    );
    
    return newLog;
  } catch (error) {
    console.error('Error logging mood:', error);
    throw error;
  }
};

export const getMoodHistory = async (params = {}) => {
  try {
    const logs = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
    let moodLogs = logs ? JSON.parse(logs) : [];
    
    // Apply filters if provided
    if (params.startDate || params.endDate) {
      moodLogs = moodLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        return (
          (!params.startDate || logDate >= new Date(params.startDate)) &&
          (!params.endDate || logDate <= new Date(params.endDate))
        );
      });
    }
    
    return moodLogs;
  } catch (error) {
    console.error('Error fetching mood history:', error);
    throw error;
  }
};

export const logActivity = async (activityData) => {
  try {
    // Get existing logs
    const existingLogs = await AsyncStorage.getItem(ACTIVITY_STORAGE_KEY);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    
    // Add new log with timestamp if not provided
    const newLog = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: activityData.timestamp || new Date().toISOString(),
    };
    
    // Save updated logs
    await AsyncStorage.setItem(
      ACTIVITY_STORAGE_KEY,
      JSON.stringify([...logs, newLog])
    );
    
    return newLog;
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
};

export const getActivityHistory = async (params = {}) => {
  try {
    const logs = await AsyncStorage.getItem(ACTIVITY_STORAGE_KEY);
    let activityLogs = logs ? JSON.parse(logs) : [];
    
    // Apply filters if provided
    if (params.startDate || params.endDate) {
      activityLogs = activityLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        return (
          (!params.startDate || logDate >= new Date(params.startDate)) &&
          (!params.endDate || logDate <= new Date(params.endDate))
        );
      });
    }
    
    return activityLogs;
  } catch (error) {
    console.error('Error fetching activity history:', error);
    throw error;
  }
};
