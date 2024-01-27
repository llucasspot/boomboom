import successLogo from "@assets/LoggedSuccess/check.png";
import logoWithTextLogoHorizontally from "@assets/logos/logo-with-text-logo-horizontally.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { Animated, ImageStyle, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "../../../components/Buttons/LueurButton";
import useEStyles from "../../../hooks/useEStyles";
import LanguageService from "../../../services/LanguageService/LanguageService";
import { useCoreStyles } from "../../../services/StyleService/styles";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { RegisterStackParamsList, RegisterStackScreen } from "../RegisterStack";

type SignInSuccessfulScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.LOGIN_SUCCESSFUL
>;

export function SignInSuccessfulScreen({
  navigation,
}: SignInSuccessfulScreenProps): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: "$backgroundColor",
      padding: "$spacer6",
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
  const coreStyles = useCoreStyles();

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
          style={
            { ...styles.successLogo, transform: [{ scale }] } as ImageStyle
          }
        />
        <Text style={{ ...styles.title, ...coreStyles.H2 }}>
          {I18n.t("screen.SignInSuccessfulScreen.title")}
        </Text>
        <Text style={{ ...styles.subtitle, ...coreStyles.P }}>
          {I18n.t("screen.SignInSuccessfulScreen.subtitle")}
        </Text>
      </View>
      <View style={styles.footer}>
        <LueurButton onPress={handleNextStep} content={I18n.t("common.next")} />
      </View>
    </SafeAreaView>
  );
}
