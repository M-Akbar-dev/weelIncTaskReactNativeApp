import React, { useEffect } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { hideToast } from "../../redux/slices/toastSlice";
import { styles } from "./styles";
import { useTheme } from "../../themes/ThemeProvider";

const GlobalToast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast);
  const { colors } = useTheme();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() =>
          dispatch(hideToast())
        );
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  const backgroundColor =
    toast.type === "success" ? colors.success : toast.type === "error" ? colors.error : colors.info;

  const dynamicStyles = StyleSheet.create({
    toast: {
      ...styles.toast,
      backgroundColor,
    },
    text: {
      ...styles.text,
      color: colors.text,
    },
  });

  return (
    <Animated.View style={[dynamicStyles.toast, { opacity }]}>
      <Text style={dynamicStyles.text}>{toast.message}</Text>
    </Animated.View>
  );
};



export default GlobalToast;
