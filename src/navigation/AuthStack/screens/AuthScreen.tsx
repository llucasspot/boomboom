import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, ImageStyle, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamsList, AuthStackScreenName } from "../AuthStack";

import girlBackground from "#assets/girl.png";
import { BaseButtonIconPosition } from "#components/Buttons/BaseButton";
import { LueurButton } from "#components/Buttons/LueurButton";
import { Logo } from "#components/Logo";
import { LueurBackground } from "#components/LueurBackground";
import useEStyles from "#hooks/useEStyles";
import AuthService from "#services/AuthService/AuthService";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import LanguageService from "#services/LanguageService/LanguageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

type AuthScreenProps = NativeStackScreenProps<
  AuthStackParamsList,
  AuthStackScreenName.AUTH_HOME
>;

export function AuthScreen({ navigation }: AuthScreenProps): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const configurationService = getGlobalInstance<ConfigurationService>(
    ServiceInterface.ConfigurationService,
  );
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: "$backgroundColor",
    },
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
      marginRight: "$spacer4",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: "$spacer6",
      justifyContent: "flex-end",
      bottom: "$spacer6",
      gap: "$spacer4",
    },
    text: {
      color: "$secondaryColor",
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    button: {},
  });

  const authenticate = async () => {
    if (configurationService.isAppInMockMode()) {
      await authService.authenticateUser();
      return;
    }
    navigation.push(AuthStackScreenName.OAUTH_SCREEN);
  };

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.girlBackgroundContainer}>
        <Animated.Image
          source={girlBackground}
          style={
            {
              ...styles.girlBackground,
              opacity,
              transform: [{ translateY: translateYImage }],
            } as ImageStyle
          }
        />
      </View>
      <LueurBackground />
      <Animated.View
        style={{
          ...styles.contentContainer,
          opacity,
          transform: [{ translateY: translateYText }],
        }}
      >
        <Logo />
        <Text style={styles.text}>{I18n.t("screen.SignInScreen.title")}</Text>
        <LueurButton
          onPress={authenticate}
          style={styles.button}
          iconPosition={BaseButtonIconPosition.LEFT}
          icon="spotify"
          content={I18n.t("screen.SignInScreen.spotifySignInButtonLabel")}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
