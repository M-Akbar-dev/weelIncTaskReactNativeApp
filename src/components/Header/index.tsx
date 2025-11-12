import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SvgProps } from 'react-native-svg';
import MenuIcon from '../../assets/svg/drawer.svg'
import { styles } from './styles';
import { useTheme } from '../../themes/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  userName?: string;
  userImage?: string;
  onMenuPress?: () => void;
}

export default function Header({
  title,
  userName = '',
  userImage,
  onMenuPress,
}: HeaderProps) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { colors } = useTheme();

  const handleDrawer = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDrawer} style={styles.iconContainer}>
        <MenuIcon width={26} height={26} fill={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.userContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {userName}
        </Text>
      </View>
    </View>
  );
}