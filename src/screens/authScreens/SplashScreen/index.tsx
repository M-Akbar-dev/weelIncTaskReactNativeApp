import { Image, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import images from "../../../themes/Images";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constants/screens";

export default function SplashScreen() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigation = useNavigation<any>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 1 }
    ).start();
  }, [scaleAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (isLoggedIn) {
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.MAINSCREEN.HOME }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.AUTH.LOGIN }],
            });
          }          
    }, 4000); 

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={images.SplashImg}
        style={[
          styles.image,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}