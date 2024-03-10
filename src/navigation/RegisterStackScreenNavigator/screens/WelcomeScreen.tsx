import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RegisterStackParamsList, RegisterStackScreen } from "../RegisterStack";

import { LueurButton } from "#components/Buttons/LueurButton";
import { LogoVertical } from "#components/LogoVertical";
import { LueurBackground } from "#components/LueurBackground";
import useEStyles from "#hooks/useEStyles";
import AuthService from "#services/AuthService/AuthService";
import LanguageService from "#services/LanguageService/LanguageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

type WelcomeScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.WELCOME_SCREEN
>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: "$backgroundColor",
      // paddingHorizontal: '$spacer6',
      // paddingVertical: '$spacer6',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: "$spacer6",
      paddingVertical: "$spacer6",
    },
    footer: {},
    header: {},
    content: {
      flex: 1,
      paddingHorizontal: "$spacer6",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: "$secondaryColor",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    subtitle: {
      color: "$secondaryColor",
      textAlign: "center",
    },
  });

  const handleNextStep = async () => {
    await authService.authenticateUser();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LueurBackground />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <LogoVertical />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {I18n.t("screen.WelcomeScreen.title")}
          </Text>
          <Text style={styles.subtitle}>
            {I18n.t("screen.WelcomeScreen.subtitle")}
          </Text>
        </View>
        <View style={styles.footer}>
          <LueurButton
            onPress={handleNextStep}
            content={I18n.t("screen.WelcomeScreen.submitButton")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
