import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";
import styles from "./styles";
import { useTheme } from "../../themes/ThemeProvider";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  onLongPress?: () => void;
  icon?: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  iconPosition?: "left" | "right";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  onLongPress,
  icon,
  buttonStyle,
  textStyle,
  disabled = false,
  loading = false,
  backgroundColor,
  iconPosition = "left",
}) => {
  const { colors } = useTheme();
  const buttonBgColor = backgroundColor || colors.primary;

  const dynamicStyles = StyleSheet.create({
    button: {
      ...styles.button,
      backgroundColor: disabled ? colors.border : buttonBgColor,
    },
    text: {
      ...styles.text,
      color: disabled ? colors.textTertiary : colors.text,
    },
  });

  return (
    <TouchableOpacity
      onPress={!disabled && !loading ? onPress : undefined}
      onLongPress={!disabled && !loading ? onLongPress : undefined}
      activeOpacity={0.8}
      style={[dynamicStyles.button, buttonStyle]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          )}
          <Text style={[dynamicStyles.text, textStyle]}>{title}</Text>
          {icon && iconPosition === "right" && (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};


export default CustomButton;
