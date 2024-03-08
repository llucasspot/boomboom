import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { WebView } from "react-native-webview";

import { AuthStackParamsList, AuthStackScreenName } from "../AuthStack";

import AuthService from "#services/AuthService/AuthService";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

type OauthViewScreenProps = NativeStackScreenProps<
  AuthStackParamsList,
  AuthStackScreenName.OAUTH_SCREEN
>;

export function OauthViewScreen({ navigation }: OauthViewScreenProps) {
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
    await authService.authenticateUser(authToken);
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
