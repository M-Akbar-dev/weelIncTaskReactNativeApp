import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";
import styles from "./styles";
import { useTheme } from "../../themes/ThemeProvider";
import { AppStyles } from "../../themes";

interface CustomTextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: React.FC<SvgProps>;
  iconPosition?: "left" | "right";
  onIconPress?: () => void;
  error?: string;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  keboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon: Icon,
  iconPosition = "right",
  onIconPress,
  error,
  inputStyle,
  containerStyle,
  keboardType,
  autoCapitalize,
}) => {
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      ...styles.container,
    },
    label: {
      ...styles.label,
      color: colors.text,
    },
    inputContainer: {
      ...styles.inputContainer,
      backgroundColor: colors.surface,
      borderColor: error ? colors.error : colors.border,
    },
    input: {
      ...styles.input,
      color: colors.text,
    },
    error: {
      ...styles.error,
      color: AppStyles.colorSet.redIII,
      fontWeight: '500',
    },
  });

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {label && <Text style={dynamicStyles.label}>{label}</Text>}

      <View style={dynamicStyles.inputContainer}>
        {Icon && iconPosition === "left" && (
          <TouchableOpacity onPress={onIconPress} style={styles.icon}>
            <Icon width={20} height={20} fill={colors.textSecondary} />
          </TouchableOpacity>
        )}

        <TextInput
          style={[dynamicStyles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
        />

        {Icon && iconPosition === "right" && (
          <TouchableOpacity onPress={onIconPress} style={styles.icon}>
            <Icon width={20} height={20} fill={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={dynamicStyles.error}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;

