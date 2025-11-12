import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import { AppStyles } from "../../../themes";
import { get } from "../../../services/api";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import BackHeader from "../../../components/BackHeader";
import { SCREENS } from "../../../constants/screens";

export function DeliveryDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { orderId } = route.params;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await get(`/orders/${orderId}`);
                if (response.success) {
                    setOrder(response.data);
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

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={AppStyles.colorSet.primary}
                    style={{ marginTop: 50 }}
                />
            </SafeAreaView>
        );
    }

    if (!order) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Failed to load order details.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title="Delivery Details" onBackPress={() => navigation.navigate(SCREENS.MAINSCREEN.HOME)} />
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Order #{order.orderId}</Text>
                    <Text style={styles.subTitle}>
                        Created {moment(order.created_at).fromNow()}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Delivery Info</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type:</Text>
                        <Text style={styles.value}>{order.delivery_type}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery Time:</Text>
                        <Text style={styles.value}>
                            {moment(order.delivery_time).format("ddd, MMM D • h:mm A")}
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.value}>{order.address}</Text>
                    <Text style={styles.value}>
                        {order.street}, {order.city}
                    </Text>
                    <Text style={styles.value}>
                        {order.state} - {order.postal_code}
                    </Text>
                    <Text style={styles.value}>{order.country}</Text>
                </View>

                {order.notes ? (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <Text style={styles.value}>{order.notes}</Text>
                    </View>
                ) : null}

                <View style={[styles.card, { backgroundColor: "#F9FAFB" }]}>
                    <Text style={styles.sectionTitle}>Created</Text>
                    <Text style={styles.value}>
                        {moment(order.created_at).format("YYYY-MM-DD HH:mm")}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
