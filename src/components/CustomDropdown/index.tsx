import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./styles";
import { AppStyles } from "../../themes";

interface CustomDropdownProps {
    label: string;
    data: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    data,
    value,
    onChange,
    error,
    placeholder = "Select option",
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Dropdown
                style={[
                    styles.dropdown,
                    { borderColor: error ? AppStyles.colorSet.red : AppStyles.colorSet.gray },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                data={data}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={(item) => onChange(item.value)}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

export default CustomDropdown;
