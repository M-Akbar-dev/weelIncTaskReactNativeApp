import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import { SCREENS } from "../constants/screens";
import { AddDelivery, EditDeliveries, DeliveryDetails } from "../screens";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Drawer as root */}
      <Stack.Screen name={SCREENS.MAINSCREEN.HOME} component={DrawerNavigation} />

      {/* Stack screens */}
      <Stack.Screen name={SCREENS.MAINSCREEN.ADD_DELIVERY} component={AddDelivery} />
      <Stack.Screen name={SCREENS.MAINSCREEN.EDIT_DELIVERIES} component={EditDeliveries} />
      <Stack.Screen name={SCREENS.MAINSCREEN.DELIVERY_DETAILS} component={DeliveryDetails} />
    </Stack.Navigator>
  );
}
