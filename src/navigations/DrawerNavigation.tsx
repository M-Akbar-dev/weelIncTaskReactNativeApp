import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SCREENS } from "../constants/screens";
import { Home, About, SplashScreen, AddDelivery } from "../screens";
import CustomDrawer from "../components/CustomDrawer";
import { useTheme } from "../themes/ThemeProvider";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: colors.drawerBackground },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name={SCREENS.MAINSCREEN.HOME} component={Home} />
      <Drawer.Screen name={SCREENS.MAINSCREEN.ADD_DELIVERY} component={AddDelivery} />
      {/* Add other permanent drawer screens if needed */}
    </Drawer.Navigator>
  );
}
