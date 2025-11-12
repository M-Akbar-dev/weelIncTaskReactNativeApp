import React, { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/slices/toastSlice";
import { showLoader } from "../../../redux/slices/loaderSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SCREENS } from "../../../constants/screens";
import { authUser, } from "../../../redux/slices/authSlice";
import { AppStyles, Images } from "../../../themes";
import TestIcon from "../../../assets/svg/visible-eye.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useDispatch()
  const navigation = useNavigation();


  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      dispatch(showToast({ message: "Email is required", type: "error" }))
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      dispatch(showToast({ message: "Password is required", type: "error" }))
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const result = await dispatch(authUser({ email: email, password: password, mode: 'login' }));
        console.log(result, "result--login");
        if (authUser.fulfilled.match(result)) {
          navigation.navigate(SCREENS.MAINSCREEN.HOME as never);
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden />
      <View style={styles.headerView}>
        <View>
          <Image
            style={styles.logo}
            source={Images.Logo} />
          <Text style={styles.title}>Welcome to Weel Task</Text>
          <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>
          <View style={styles.whiteCard}>
            <ScrollView>
              <CustomTextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                error={errors.email}
                keboardType="email-address"
                autoCapitalize='none'
              />

              <CustomTextInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                secureTextEntry={!showPass}
                icon={TestIcon}
                iconPosition="right"
                onIconPress={() => setShowPass(!showPass)}
                error={errors.password}
              />

              <CustomButton
                title="Sign In"
                onPress={handleLogin}
                // disabled={!email || !password}
                textStyle={{ fontSize: 18, color: AppStyles.colorSet.white }}
              />
              <Text style={styles.dontHavetxt}>Don't have an account? <Text onPress={() => { navigation.navigate(SCREENS.AUTH.REQUEST_ACCOUNT) }} style={styles.registerAccountTxt}>Register Now</Text> </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}