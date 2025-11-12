import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/Store/store';
// import { toggleTheme, setTheme } from '../redux/slices/themeSlice';
// import { useTheme } from '../themes/ThemeProvider';
// import { ReduxPersistenceUtils, ThemePersistenceUtils } from '../utils/reduxPersistenceUtils';
import { RootState } from '../../redux/Store/store';
import { useTheme } from '../../themes/ThemeProvider';
import { ReduxPersistenceUtils, ThemePersistenceUtils } from '../../utils/reduxPersistenceUtils';
import { setTheme, toggleTheme } from '../../redux/slices/themeSlice';

const PersistenceTestComponent = () => {
  const dispatch = useDispatch();
  const { colors, isDark } = useTheme();
  const themeState = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Log persistence status on component mount
    checkPersistenceStatus();
  }, []);

  const checkPersistenceStatus = async () => {
    const isPersisted = await ThemePersistenceUtils.isThemePersisted();
    const storedTheme = await ThemePersistenceUtils.getStoredTheme();
    console.log('Theme persistence status:', {
      isPersisted,
      storedTheme,
      currentTheme: themeState.mode,
      isInitialized: themeState.isInitialized,
    });
  };

  const handleClearPersistence = async () => {
    await ReduxPersistenceUtils.clearPersistedData();
    console.log('Persistence cleared');
  };

  const handleFlushPersistence = async () => {
    await ReduxPersistenceUtils.flushPersistedState();
    console.log('Persistence flushed');
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    text: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
    buttonText: {
      color: colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    dangerButton: {
      backgroundColor: colors.error,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Redux Persistence Test</Text>
      
      <Text style={dynamicStyles.text}>
        Current Theme: {themeState.mode}
      </Text>
      <Text style={dynamicStyles.text}>
        Initialized: {themeState.isInitialized ? 'Yes' : 'No'}
      </Text>
      <Text style={dynamicStyles.text}>
        Is Dark Mode: {isDark ? 'Yes' : 'No'}
      </Text>

      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={() => dispatch(toggleTheme())}
      >
        <Text style={dynamicStyles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={() => dispatch(setTheme('light'))}
      >
        <Text style={dynamicStyles.buttonText}>Set Light Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={() => dispatch(setTheme('dark'))}
      >
        <Text style={dynamicStyles.buttonText}>Set Dark Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[dynamicStyles.button, dynamicStyles.dangerButton]}
        onPress={handleClearPersistence}
      >
        <Text style={dynamicStyles.buttonText}>Clear Persistence</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={handleFlushPersistence}
      >
        <Text style={dynamicStyles.buttonText}>Flush Persistence</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={checkPersistenceStatus}
      >
        <Text style={dynamicStyles.buttonText}>Check Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersistenceTestComponent;
