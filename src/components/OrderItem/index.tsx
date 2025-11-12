import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import moment from "moment";
import Svg, { Path } from "react-native-svg";
import { AppStyles } from "../../themes";
import { styles as cardStyles } from "./styles";
import { SCREENS } from "../../constants/screens";

interface Order {
    id: number;
    delivery_type: "DELIVERY" | "CURBSIDE";
    delivery_time: string;
    notes?: string;
    created_at: string;
}

interface Props {
    order: Order;
}

const PK_TIMEZONE = "Asia/Karachi";

export const OrderItem: React.FC<Props> = ({ order }) => {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();

    const formatDeliveryTime = (iso: string) => {
        const m = moment.utc(iso);
        const now = moment();

        if (m.isSame(now, "day")) return `Today, ${m.format("h:mm A")}`;
        if (m.isSame(now.clone().add(1, "day"), "day"))
            return `Tomorrow, ${m.format("h:mm A")}`;
        return m.format("ddd, MMM D • h:mm A");
    };

    const handleCardPress = () => {
        navigation.navigate(SCREENS.MAINSCREEN.DELIVERY_DETAILS, { orderId: order.id });
    };

    const handleEditPress = (event: GestureResponderEvent) => {
        event.stopPropagation();
        navigation.navigate(SCREENS.MAINSCREEN.EDIT_DELIVERIES, { orderId: order.id });
    };

    return (
        <TouchableOpacity
            onPress={handleCardPress}
            style={[
                cardStyles.card,
                { backgroundColor: colors.card, borderLeftColor: colors.primary },
            ]}
            activeOpacity={0.9}
        >
            <View style={cardStyles.header}>
                <Text style={[cardStyles.time, { color: colors.text }]}>
                    {formatDeliveryTime(order.delivery_time)}
                </Text>

                <View style={cardStyles.rightHeader}>
                    <View
                        style={[
                            cardStyles.badge,
                            {
                                backgroundColor: `${colors.primary}20`,
                                borderColor: colors.primary,
                            },
                        ]}
                    >
                        <Text style={[cardStyles.badgeText, { color: AppStyles.colorSet.white }]}>
                            {order.delivery_type === "DELIVERY" ? "Delivery" : "Curbside"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        onPress={handleEditPress} style={styles.editButton}>
                        <Svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.primary}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <Path d="M12 20h9" />
                            <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>

            {order.notes ? (
                <Text style={[cardStyles.notes, { color: colors.text }]} numberOfLines={2}>
                    {order.notes}
                </Text>
            ) : null}

            <Text style={[cardStyles.ago, { color: colors.text }]}>
                {moment.utc(order.created_at).fromNow()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    editButton: {
        marginLeft: 40,
        padding: 5,
        top: 25,
        backgroundColor:AppStyles.colorSet.darkGray,
        alignItems:"center",
        borderRadius:20
    },
});
