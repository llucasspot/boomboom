import { router } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

import { RootStackScreen } from "../src/navigation/RootStackScreenNavigator/RootStack";
import AuthService from "../src/services/AuthService/AuthService";
import ConfigurationService from "../src/services/ConfigurationService/ConfigurationService";
import {
  AppError,
  AppErrorMessage,
} from "../src/services/ErrorService/AppError";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../src/tsyringe/diUtils";

export default function OauthViewScreen() {
  const configurationService = getGlobalInstance<ConfigurationService>(
    ServiceInterface.ConfigurationService,
  );
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );

  const onNavigationStateChange = async (navState: { url: string }) => {
    if (navState.url.includes("api/auth/success")) {
      const authToken = extractTokenFromUrl(navState.url);
      if (authToken) {
        await handleAuth(authToken);
      }
    }
  };

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

  const extractTokenFromUrl = (url: string) => {
    const match = url.match(/userToken=([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <WebView
      source={{ uri: `${configurationService.getApiUrl()}/auth/spotify` }}
      onNavigationStateChange={onNavigationStateChange}
      style={{ flex: 1 }}
    />
  );
}
