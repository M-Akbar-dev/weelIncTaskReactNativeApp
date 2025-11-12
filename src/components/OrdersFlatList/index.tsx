import React from "react";
import { FlatList, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { useTheme } from "@react-navigation/native";
import { OrderItem } from "../OrderItem";
 
interface Order {
  id: number;
  delivery_type: "DELIVERY" | "CURBSIDE";
  delivery_time: string;
  notes: string;
  created_at: string;
}

interface Props {
  data: Order[];
  loading: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const OrdersFlatList: React.FC<Props> = ({
  data,
  loading,
  onRefresh,
  refreshing = false,
}) => {
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12, color: colors.text }}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OrderItem order={item} />}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        ) : undefined
      }
      ListEmptyComponent={
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontSize: 15,
            paddingVertical: 40,
            fontStyle: "italic",
          }}
        >
          No upcoming deliveries
        </Text>
      }
    />
  );
};

export default OrdersFlatList;