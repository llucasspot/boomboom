import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Animated, ImageStyle } from "react-native";

import { AuthStackParamsList, AuthStackScreenName } from "../Auth.stack";

import { BaseButtonIconPosition } from "#components/buttons/BaseButton";
import { IconName } from "#components/buttons/IconName";
import { Logo } from "#components/logos/Logo";
import { LueurBackground } from "#components/lueurs/LueurBackground";
import { LueurButton } from "#components/lueurs/LueurButton";
import { BaseText } from "#components/texts/BaseText";
import { PageView } from "#components/views/PageView";
import { SafeView } from "#components/views/SafeView";
import girlBackground from "#modules/auth/screens/assets/girl.png";
import { AuthService } from "#modules/core/auth/auth.service";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { diService } from "#modules/core/di/di-utils";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

type AuthScreenProps = NativeStackScreenProps<
  AuthStackParamsList,
  AuthStackScreenName.AUTH_HOME
>;

export function AuthScreen({ navigation }: AuthScreenProps): JSX.Element {
  const configurationService = diService.getInstance(ConfigurationService);
  const authService = diService.getInstance(AuthService);

  const queryClient = useQueryClient();

  const styles = useAppThemeStyle(makeStyles);

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  const translateYImage = fadeInAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const translateYText = fadeInAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const opacity = fadeInAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const authenticate = async () => {
    if (configurationService.isAppInMockMode()) {
      await authService.authenticateUser(queryClient);
      return;
    }
    navigation.push(AuthStackScreenName.OAUTH_SCREEN);
  };

  return (
    <PageView>
      <SafeView style={styles.girlBackgroundContainer}>
        <Animated.Image
          source={girlBackground}
          style={[
            styles.girlBackground as ImageStyle,
            {
              opacity,
              transform: [{ translateY: translateYImage }],
            },
          ]}
        />
      </SafeView>
      <LueurBackground />
      <SafeView>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity,
              transform: [{ translateY: translateYText }],
            },
          ]}
        >
          <Logo />
          <BaseText style={styles.text} i18nKey="screen.SignInScreen.title" />
          <LueurButton
            onPress={authenticate}
            style={styles.button}
            iconPosition={BaseButtonIconPosition.LEFT}
            icon={IconName.SPOTIFY}
            content="screen.SignInScreen.spotifySignInButtonLabel"
          />
        </Animated.View>
      </SafeView>
    </PageView>
  );
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    logoContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    girlBackgroundContainer: {
      flex: 4,
      position: "relative",
      alignItems: "center",
    },
    girlBackground: {
      resizeMode: "contain",
      width: "100%",
      height: "100%",
    },
    logoImageText: {
      width: "3rem",
      height: "3rem",
      marginRight: appTheme.spacers.spacer4,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: appTheme.spacers.spacer6,
      justifyContent: "flex-end",
      bottom: appTheme.spacers.spacer6,
      gap: appTheme.spacers.spacer4,
    },
    text: {
      color: appTheme.colors.onSecondaryContainer,
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    button: {},
  });
