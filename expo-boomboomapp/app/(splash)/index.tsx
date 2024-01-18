import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

import useEStyles from "../../src/hooks/useEStyles";
import { RootStackScreen } from "../../src/navigation/RootStackScreenNavigator/RootStack";
import AuthService from "../../src/services/AuthService/AuthService";
import {
  AppError,
  AppErrorMessage,
} from "../../src/services/ErrorService/AppError";
import StorageService from "../../src/services/StorageService/StorageService";
import ServiceInterface from "../../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../src/tsyringe/diUtils";

export default function SplashScreen(): JSX.Element {
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const storageService = getGlobalInstance<StorageService>(
    ServiceInterface.StorageServiceI,
  );
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const handleAuth = async (authToken: string) => {
    try {
      await authService.authenticateUser(authToken);
      router.replace(`/${RootStackScreen.HOME}`);
    } catch (err: unknown) {
      if (
        err instanceof AppError &&
        err.message === AppErrorMessage.PROFILE_NOT_SET
      ) {
        router.replace(`/${RootStackScreen.LOGIN_SUCCESSFUL}`);
        return;
      }
      throw err;
    }
  };

  useEffect(() => {
    authService
      .isUserConnected()
      .then(() => storageService.getAuthenticateToken())
      .then((authToken) => {
        if (authToken) {
          return handleAuth(authToken);
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
