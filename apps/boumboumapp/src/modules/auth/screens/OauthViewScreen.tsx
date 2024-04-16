import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { WebView } from "react-native-webview";

import { AuthStackParamsList, AuthStackScreenName } from "../Auth.stack";

import { AuthService } from "#modules/core/auth/auth.service";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { diService } from "#modules/core/di/di-utils";

type OauthViewScreenProps = NativeStackScreenProps<
  AuthStackParamsList,
  AuthStackScreenName.OAUTH_SCREEN
>;

export function OauthViewScreen(props: OauthViewScreenProps): JSX.Element {
  const configurationService = diService.getInstance(ConfigurationService);
  const authService = diService.getInstance(AuthService);

  const queryClient = useQueryClient();

  const onNavigationStateChange = async (navState: { url: string }) => {
    if (navState.url.includes("api/auth/success")) {
      const authToken = extractTokenFromUrl(navState.url);
      if (authToken) {
        await handleAuth(authToken);
      }
    }
  };

  const handleAuth = async (authToken: string) => {
    await authService.authenticateUser(queryClient, authToken);
  };

  const extractTokenFromUrl = (url: string) => {
    const match = url.match(/access_token=([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <WebView
      source={{
        uri: `${configurationService.getApiBaseUrl()}/api/auth/spotify`,
      }}
      onNavigationStateChange={onNavigationStateChange}
      style={{ flex: 1 }}
    />
  );
}
