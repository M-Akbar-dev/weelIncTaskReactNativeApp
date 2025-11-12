import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SCREENS } from "../constants/screens"
import DrawerNavigation from "./DrawerNavigation"
import { EditDeliveries, AddDelivery, DeliveryDetails, SplashScreen } from "../screens"

export default function MainStackNavigator() {
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name={SCREENS.AUTH.SPLASH_SCREEN} component={SplashScreen} />
            <stack.Screen name={SCREENS.MAINSCREEN.HOME} component={DrawerNavigation} />
            <stack.Screen name={SCREENS.MAINSCREEN.EDIT_DELIVERIES} component={EditDeliveries} />
            <stack.Screen name={SCREENS.MAINSCREEN.ADD_DELIVERY} component={AddDelivery} />
            <stack.Screen name={SCREENS.MAINSCREEN.DELIVERY_DETAILS} component={DeliveryDetails} />

        </stack.Navigator>
    )
}