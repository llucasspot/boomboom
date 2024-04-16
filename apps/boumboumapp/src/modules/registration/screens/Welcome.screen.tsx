import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogoVertical } from "#components/logos/LogoVertical";
import { LueurBackground } from "#components/lueurs/LueurBackground";
import { LueurButton } from "#components/lueurs/LueurButton";
import { BaseText } from "#components/texts/BaseText";
import { AuthService } from "#modules/core/auth/auth.service";
import { diService } from "#modules/core/di/di-utils";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "#modules/registration/Register.stack";

type WelcomeScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.WELCOME_SCREEN
>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps): JSX.Element {
  const authService = diService.getInstance(AuthService);

  const styles = useAppThemeStyle(makeStyles);

  const queryClient = useQueryClient();

  const handleNextStep = async () => {
    await authService.authenticateUser(queryClient);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LueurBackground />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <LogoVertical />
        </View>
        <View style={styles.content}>
          <BaseText
            style={[styles.title]}
            i18nKey="screen.WelcomeScreen.title"
          />
          <BaseText
            style={[styles.subtitle]}
            i18nKey="screen.WelcomeScreen.subtitle"
          />
        </View>
        <View style={styles.footer}>
          <LueurButton
            onPress={handleNextStep}
            content="screen.WelcomeScreen.submitButton"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    mainContainer: {
      flex: 1,
      backgroundColor: appTheme.colors.background,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: appTheme.spacers.spacer6,
      paddingVertical: appTheme.spacers.spacer6,
    },
    footer: {},
    header: {},
    content: {
      flex: 1,
      paddingHorizontal: appTheme.spacers.spacer6,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: appTheme.colors.onSecondaryContainer,
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    subtitle: {
      color: appTheme.colors.onSecondaryContainer,
      textAlign: "center",
    },
  });
