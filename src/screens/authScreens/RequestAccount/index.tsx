import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/slices/toastSlice";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constants/screens";
import { authUser, } from "../../../redux/slices/authSlice";
import { AppStyles, Images } from "../../../themes";
import { AppDispatch } from "../../../redux/Store/store";
import TestIcon from "../../../assets/svg/visible-eye.svg";

export default function RequestAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();

    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
            dispatch(showToast({ message: "Email is required", type: "error" }));
        } else if (!validateEmail(email)) {
            newErrors.email = "Enter a valid email address";
            dispatch(showToast({ message: "Enter a valid email address", type: "error" }));
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            dispatch(showToast({ message: "Password is required", type: "error" }));
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            dispatch(showToast({ message: "Password must be at least 6 characters", type: "error" }));
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const result = await dispatch(authUser({ email: email, password: password, mode: 'login' }));
                console.log(result, "result--register");
                if (authUser.fulfilled.match(result)) {
                    navigation.navigate(SCREENS.AUTH.LOGIN as never);
                } else {
                    const errorMessage = result.payload?.message || 'Registration failed. Please try again.';
                    dispatch(showToast({ message: errorMessage, type: "error" }));
                }
            } catch (error) {
                console.error('Registration error:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerView}>
                    <Image style={styles.logo} source={Images.Logo} />
                    <Text style={styles.title}>Register Your Account</Text>
                    <Text style={styles.subtitle}>Welcome! Please create your account.</Text>

                    <View style={styles.whiteCard}>
                        <CustomTextInput
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            error={errors.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <CustomTextInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            icon={TestIcon}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) setErrors({ ...errors, password: undefined });
                            }}
                            secureTextEntry={!showPass}
                            iconPosition="right"
                            onIconPress={() => setShowPass(!showPass)}
                            error={errors.password}
                        />

                        <CustomButton
                            title="Register"
                            onPress={handleRegister}
                            textStyle={{ fontSize: 18, color: AppStyles.colorSet.white }}
                        />

                        <Text style={styles.dontHavetxt}>
                            Already have an account?{" "}
                            <Text
                                onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN)}
                                style={styles.registerAccountTxt}
                            >
                                Log In
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}