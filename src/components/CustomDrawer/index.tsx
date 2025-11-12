import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { SvgProps } from "react-native-svg";

import HomeIcon from "../../assets/svg/home.svg";
import TaskIcon from "../../assets/svg/task.svg";
import LogoutIcon from "../../assets/svg/logout.svg";

import { useTheme } from "../../themes/ThemeProvider";
import { styles } from "./styles";
import { AppStyles } from "../../themes";
import { SCREENS } from "../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/Store/store";

export default function CustomDrawer(props: any) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state.auth.user);

  const user = {
    name: "LanreB",
    events: 70,
    image:
      "https://i.pravatar.cc/150?img=3",
  };

  const drawerItems = [
    { label: "Home", icon: HomeIcon, screen: "Home" },
    { label: "Add Delivery", icon: TaskIcon, screen: "AddDelivery" },

  ];
  const handleSignOut = async () => {
    dispatch(logout());
    console.log("User signed out and local state cleared.");
    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.AUTH.LOGIN }],
    });
  };

  const dynamicStyles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.drawerBackground,
    },
    header: {
      paddingVertical: 30,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
      backgroundColor: colors.drawerHeaderBackground,
    },
    userName: {
      fontSize: 18,
      fontWeight: "600",
      //   color: "#4DB6AC",
      color: AppStyles.colorSet.primaryText
    },
    eventText: {
      fontSize: 14,
      color: colors.primaryLight,
    },
    menuContainer: {
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    menuText: {
      fontSize: 16,
      color: colors.drawerText,
      marginLeft: 15,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.divider,
      paddingVertical: 15,
      paddingHorizontal: 25,
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={dynamicStyles.drawerContainer}
      >
        <View style={dynamicStyles.header}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={dynamicStyles.userName}>Weel Inc</Text>
          <Text style={dynamicStyles.eventText}>{userData?.email}</Text>
        </View>

        <View style={dynamicStyles.menuContainer}>
          {drawerItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen as never)}
              >
                <Icon width={22} height={22} fill={colors.drawerIcon} />
                <Text style={dynamicStyles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={dynamicStyles.footer}
        onPress={handleSignOut}>
        <LogoutIcon width={22} height={22} fill={colors.drawerIcon} />
        <Text style={dynamicStyles.menuText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

