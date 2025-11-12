import React, { useEffect, useState } from "react";
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
import { get, put } from "../../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackHeader from "../../../components/BackHeader";
import { SCREENS } from "../../../constants/screens";

export function EditDeliveries() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { orderId } = route.params;

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
    const [loading, setLoading] = useState(true);

    const deliveryOptions = [
        { label: "Delivery", value: "DELIVERY" },
        { label: "Curbside", value: "CURBSIDE" },
    ];

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await get(`/orders/${orderId}`);
                if (response.success) {
                    const order = response.data;
                    setForm({
                        delivery_type: order.delivery_type || "",
                        delivery_time: order.delivery_time || "",
                        address: order.address || "",
                        street: order.street || "",
                        city: order.city || "",
                        state: order.state || "",
                        postal_code: order.postal_code || "",
                        country: order.country || "",
                        notes: order.notes || "",
                    });
                } else {
                    console.log("Error fetching order:", response.error);
                }
            } catch (err) {
                console.log("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

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

        const response = await put(`/orders/${orderId}`, form);
        if (response.success) {
            console.log("Order updated successfully", response.data);
            navigation.goBack();
        } else {
            console.log("Error updating order:", response.error);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleChange("delivery_time", selectedDate.toISOString());
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: 30 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title="Edit Delivery" onBackPress={() => navigation.navigate(SCREENS.MAINSCREEN.HOME)} />
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>Edit Delivery</Text>

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
                        title="Update Delivery"
                        onPress={handleSubmit}
                        textStyle={{ fontSize: 18, color: AppStyles.colorSet.white }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
