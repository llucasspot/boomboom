import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { Animated, ImageStyle, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "#components/lueurs/LueurButton";
import { BaseText } from "#components/texts/BaseText";
import logoWithTextLogoHorizontally from "#modules/auth/screens/assets/logo-with-text-logo-horizontally.png";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "#modules/registration/Register.stack";
import successLogo from "#modules/registration/assets/LoggedSuccess/check.png";

type SignInSuccessfulScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.LOGIN_SUCCESSFUL
>;

export function SignInSuccessfulScreen({
  navigation,
}: SignInSuccessfulScreenProps): JSX.Element {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle(makeStyles);

  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [logoAnim]);

  const translateY = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const scale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const handleNextStep = async () => {
    navigation.replace(RegisterStackScreen.REGISTRATION_SCREEN);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Animated.Image
          source={logoWithTextLogoHorizontally}
          style={
            {
              ...styles.logo,
              transform: [{ translateY }],
              opacity: logoAnim,
            } as ImageStyle
          }
        />
      </View>
      <View style={styles.content}>
        <Animated.Image
          source={successLogo}
          style={[styles.successLogo as ImageStyle, { transform: [{ scale }] }]}
        />
        <BaseText
          style={[styles.title, tagStyles.h2]}
          i18nKey="screen.SignInSuccessfulScreen.title"
        />
        <BaseText
          style={[tagStyles.p, styles.subtitle]}
          i18nKey="screen.SignInSuccessfulScreen.subtitle"
        />
      </View>
      <View style={styles.footer}>
        <LueurButton onPress={handleNextStep} content="common.next" />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    mainContainer: {
      flex: 1,
      backgroundColor: appTheme.colors.background,
      padding: appTheme.spacers.spacer6,
    },
    footer: {},
    header: {
      alignItems: "center",
    },
    logo: {
      justifyContent: "center",
      alignItems: "center",
      width: "10rem",
      height: "2.8rem",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      alignItems: "center",
      marginTop: "1rem",
    },
    successLogo: {
      width: 442 / 2,
      height: 442 / 2,
    },
  });
