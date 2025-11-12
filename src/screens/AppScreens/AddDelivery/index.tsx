import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import styles from "./styles";
import { AppStyles } from "../../../themes";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import { post } from "../../../services/api";
import { useNavigation } from "@react-navigation/native";

export function AddDelivery() {
    const navigation = useNavigation<any>();

    const [form, setForm] = useState({
        delivery_type: "",
        delivery_time: "",
        address: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        notes: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    const deliveryOptions = [
        { label: "Delivery", value: "DELIVERY" },
        { label: "Curbside", value: "CURBSIDE" },
    ];

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: "" });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.delivery_type) newErrors.delivery_type = "Delivery type is required";
        if (!form.delivery_time) newErrors.delivery_time = "Delivery time is required";
        if (!form.address) newErrors.address = "Address is required";
        if (!form.city) newErrors.city = "City is required";
        if (!form.state) newErrors.state = "State is required";
        if (!form.postal_code) newErrors.postal_code = "Postal code is required";
        if (!form.country) newErrors.country = "Country is required";
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const response = await post("/orders", form);
        if (response.success) {
            console.log("Order created successfully", response.data);
            navigation.goBack();
        } else {
            console.log("Error creating order:", response.error);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleChange("delivery_time", selectedDate.toISOString());
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>Add Delivery</Text>

                <CustomDropdown
                    label="Delivery Type"
                    data={deliveryOptions}
                    value={form.delivery_type}
                    onChange={(value) => handleChange("delivery_type", value)}
                    error={errors.delivery_type}
                    placeholder="Select delivery type"
                />

                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.label}>Delivery Time</Text>
                    <TouchableOpacity
                        style={[
                            styles.inputBox,
                            { borderColor: errors.delivery_time ? AppStyles.colorSet.red : AppStyles.colorSet.gray },
                        ]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text
                            style={{
                                color: form.delivery_time ? AppStyles.colorSet.black : AppStyles.colorSet.gray,
                                fontSize: 14,
                            }}
                        >
                            {form.delivery_time
                                ? moment(form.delivery_time).format("YYYY-MM-DD HH:mm")
                                : "Select delivery time"}
                        </Text>
                    </TouchableOpacity>
                    {errors.delivery_time && <Text style={styles.errorText}>{errors.delivery_time}</Text>}
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={form.delivery_time ? new Date(form.delivery_time) : new Date()}
                        mode="datetime"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={onDateChange}
                    />
                )}

                <CustomTextInput
                    label="Address"
                    placeholder="Enter your address"
                    value={form.address}
                    onChangeText={(text) => handleChange("address", text)}
                    error={errors.address}
                />

                <CustomTextInput
                    label="Street"
                    placeholder="Enter your street"
                    value={form.street}
                    onChangeText={(text) => handleChange("street", text)}
                    error={errors.street}
                />

                <CustomTextInput
                    label="City"
                    placeholder="Enter your city"
                    value={form.city}
                    onChangeText={(text) => handleChange("city", text)}
                    error={errors.city}
                />

                <CustomTextInput
                    label="State"
                    placeholder="Enter your state"
                    value={form.state}
                    onChangeText={(text) => handleChange("state", text)}
                    error={errors.state}
                />

                <CustomTextInput
                    label="Postal Code"
                    placeholder="Enter postal code"
                    value={form.postal_code}
                    onChangeText={(text) => handleChange("postal_code", text)}
                    error={errors.postal_code}
                />

                <CustomTextInput
                    label="Country"
                    placeholder="Enter country"
                    value={form.country}
                    onChangeText={(text) => handleChange("country", text)}
                    error={errors.country}
                />

                <CustomTextInput
                    label="Notes (Optional)"
                    placeholder="Any special instructions?"
                    value={form.notes}
                    onChangeText={(text) => handleChange("notes", text)}
                    error={errors.notes}
                    multiline
                />

                <View style={{ marginTop: 20 }}>
                    <CustomButton
                        title="Add Delivery"
                        onPress={handleSubmit}
                        textStyle={{ fontSize: 18, color: AppStyles.colorSet.white }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
