import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens";
import { Login, RequestAccount, SplashScreen } from "../screens";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.AUTH.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={SCREENS.AUTH.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.AUTH.REQUEST_ACCOUNT} component={RequestAccount} />
    </Stack.Navigator>
  );
}
