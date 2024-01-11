import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "../src/components/Buttons/LueurButton";
import { LogoVertical } from "../src/components/LogoVertical";
import { LueurBackground } from "../src/components/LueurBackground";
import useEStyles from "../src/hooks/useEStyles";
import { RootStackScreen } from "../src/navigation/RootStackScreenNavigator/RootStack";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../src/tsyringe/diUtils";

export default function WelcomeScreen(): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
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
    router.replace(`/${RootStackScreen.HOME}`);
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
