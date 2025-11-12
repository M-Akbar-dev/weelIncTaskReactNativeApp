import { ThemeMode } from '../redux/slices/themeSlice';

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  secondary: string;
  secondaryLight: string;
  
  success: string;
  warning: string;
  error: string;
  info: string;
  
  border: string;
  divider: string;
  
  drawerBackground: string;
  drawerHeaderBackground: string;
  drawerText: string;
  drawerIcon: string;
  
  statusBar: string;
  
  shadow: string;
}

export const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  card: '#FFFFFF',
  
  text: '#151723',
  textSecondary: '#7e7e7e',
  textTertiary: '#b3b3b3',
  
  primary: '#115659',
  primaryLight: '#115659',
  primaryDark: '#115659',
  
  secondary: '#DF891C',
  secondaryLight: '#F0A14A',
  
  success: '#3CC541',
  warning: '#F7AA43',
  error: '#EE5540',
  info: '#518EEE',
  
  border: '#e0e0e0',
  divider: '#eaeaea',
  
  drawerBackground: '#FFFFFF',
  drawerHeaderBackground: '#E8F8F5',
  drawerText: '#333333',
  drawerIcon: '#00BFA5',
  
  statusBar: '#00BFA5',
  
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2D2D2D',
  
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  
  primary: '#167278',
  primaryLight: '#1F8A86',
  primaryDark: '#0F5158',
  
  secondary: '#DF891C',
  secondaryLight: '#F0A14A',
  
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  border: '#333333',
  divider: '#404040',
  
  drawerBackground: '#1E1E1E',
  drawerHeaderBackground: '#2D2D2D',
  drawerText: '#FFFFFF',
  drawerIcon: '#167278',
  
  statusBar: '#0F5158',
  
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const getThemeColors = (mode: ThemeMode): ThemeColors => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
