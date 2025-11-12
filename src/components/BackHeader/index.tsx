import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from '@react-native-vector-icons/material-icons'
import { useTheme } from '../../themes/ThemeProvider';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../themes/Images';

interface BackHeaderProps {
    title: string;
    onBackPress?: () => void;
}

export default function BackHeader({
    title,
    onBackPress,
}: BackHeaderProps) {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn("Cannot go back from this screen.");
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: {
            ...styles.container,
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
        },
        titleText: {
            ...styles.title,
            color: colors.text,
        },
        backIcon: {
            color: colors.text,
        }
    });

    return (
        <View style={dynamicStyles.container}>
            <TouchableOpacity
                onPress={handleBackPress}
                style={styles.iconContainer}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Image source={images.BackArrow} style={styles.backIcon} />
                {/* <MaterialIcon
                    name="arrow-back-ios"
                    size={24}
                    style={dynamicStyles.backIcon}
                /> */}
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={dynamicStyles.titleText} numberOfLines={1}>
                    {title}
                </Text>
            </View>
            <View style={styles.iconContainer} />
        </View>
    );
}
