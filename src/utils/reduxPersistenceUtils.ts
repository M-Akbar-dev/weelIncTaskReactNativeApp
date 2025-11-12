import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '../redux/Store/store';

export const ReduxPersistenceUtils = {
  clearPersistedData: async () => {
    try {
      await persistor.purge();
      console.log('All persisted data cleared');
    } catch (error) {
      console.error('Error clearing persisted data:', error);
    }
  },

  clearSpecificKey: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Key ${key} cleared from AsyncStorage`);
    } catch (error) {
      console.error(`Error clearing key ${key}:`, error);
    }
  },

  getAllPersistedKeys: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error getting persisted keys:', error);
      return [];
    }
  },

  isDataPersisted: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking if ${key} is persisted:`, error);
      return false;
    }
  },

  getPersistedData: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting persisted data for ${key}:`, error);
      return null;
    }
  },

  flushPersistedState: async () => {
    try {
      await persistor.flush();
      console.log('Persisted state flushed');
    } catch (error) {
      console.error('Error flushing persisted state:', error);
    }
  },
};

export const ThemePersistenceUtils = {
  getStoredTheme: async () => {
    try {
      const themeData = await AsyncStorage.getItem('persist:root');
      if (themeData) {
        const parsed = JSON.parse(themeData);
        const themeState = JSON.parse(parsed.theme || '{}');
        return themeState.mode || 'light';
      }
      return 'light';
    } catch (error) {
      console.error('Error getting stored theme:', error);
      return 'light';
    }
  },

  isThemePersisted: async () => {
    try {
      const themeData = await AsyncStorage.getItem('persist:root');
      return themeData !== null;
    } catch (error) {
      console.error('Error checking if theme is persisted:', error);
      return false;
    }
  },
};
