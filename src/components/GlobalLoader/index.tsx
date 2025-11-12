import React from "react";
import { ActivityIndicator, View, StyleSheet, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store/store";
import styles from "./styles";
import { useTheme } from "../../themes/ThemeProvider";

const GlobalLoader = () => {
  const loading = useSelector((state: RootState) => state.loader.loading);
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    overlay: {
      ...styles.overlay,
      backgroundColor: colors.shadow,
    },
  });

  return (
    <Modal transparent visible={loading} animationType="fade">
      <View style={dynamicStyles.overlay}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};



export default GlobalLoader;
