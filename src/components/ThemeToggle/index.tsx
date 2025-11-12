import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { useTheme } from '../../themes/ThemeProvider';

interface ThemeToggleProps {
  style?: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { colors } = useTheme();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }, style]}
      onPress={handleToggle}
    >
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>
          {themeMode === 'light' ? '🌙' : '☀️'} 
          {themeMode === 'light' ? ' Dark Mode' : ' Light Mode'}
        </Text>
        <View style={[styles.toggle, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.toggleButton,
              {
                backgroundColor: colors.primary,
                transform: [{ translateX: themeMode === 'dark' ? 20 : 0 }],
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ThemeToggle;
