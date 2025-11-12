import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import OrdersFlatList from "../../../components/OrdersFlatList";
import { getOrders } from "../../../services/apiExamples";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";

interface Order {
  id: number;
  delivery_type: "DELIVERY" | "CURBSIDE";
  delivery_time: string;
  notes: string;
  created_at: string;
}

export default function Home() {
  const { colors } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const email = useSelector((state: RootState) => state.auth.user);
  
  const loadOrders = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    else setRefreshing(true);

    const result = await getOrders();
    if (result.success && Array.isArray(result.data)) {
      const sorted = [...result.data].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setOrders(sorted);
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const onRefresh = useCallback(() => {
    loadOrders(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={email.email} />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: colors.text,
            paddingHorizontal: 20,
            paddingTop: 16,
            marginBottom: 8,
          }}
        >
          Upcoming Deliveries
        </Text>

        <OrdersFlatList
          data={orders}
          loading={loading}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
}