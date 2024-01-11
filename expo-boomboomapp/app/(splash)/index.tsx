import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import useEStyles from "../../src/hooks/useEStyles";
import { RootStackScreen } from "../../src/navigation/RootStackScreenNavigator/RootStack";
import AuthService from "../../src/services/AuthService/AuthService";
import ConfigurationService from "../../src/services/ConfigurationService/ConfigurationService";
import ServiceInterface from "../../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../src/tsyringe/diUtils";
import UserService from "../../src/services/UserService/UserService";

export default function SplashScreen(): JSX.Element {
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const userService = getGlobalInstance<UserService>(
      ServiceInterface.UserService,
  );
  const configurationService = getGlobalInstance<ConfigurationService>(
    ServiceInterface.ConfigurationService,
  );
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    authService
      .isUserConnected()
      .then((isUserConnected) => {
        if (userService.getUserState().isConnected) {
            router.replace(`/${RootStackScreen.HOME}`);
            return;
        }
        if (isUserConnected || configurationService.byPassSignInScreen()) {
          router.replace(`/${RootStackScreen.LOGIN_SUCCESSFUL}`);
          return;
        }
        router.replace(`/${RootStackScreen.AUTH_HOME}`);
      })
      // TODO handle catch better
      .catch((err: any) => {
        console.error(err);
        router.replace(`/${RootStackScreen.AUTH_HOME}`);
      });
  }, []);

  return <View style={styles.mainContainer} />;
}
