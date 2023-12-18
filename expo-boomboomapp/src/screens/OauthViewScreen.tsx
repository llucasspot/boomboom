import React, {useEffect, useState} from 'react';
import {getGlobalInstance} from '../tsyringe/diUtils';
import ServiceInterface from '../tsyringe/ServiceInterface';
import ConfigurationService from '../services/ConfigurationService/ConfigurationService';
import {WebView} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../navigation/RootStackScreenNavigator/RootStack';
import AuthService from '../services/AuthService/AuthService';

type WebViewScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.OAUTH_SCREEN
>;

export const OauthViewScreen = ({navigation}: WebViewScreenProps) => {
  const [token, setToken] = useState<string | null>(null);
  const configurationService = getGlobalInstance<ConfigurationService>(
    ServiceInterface.ConfigurationService,
  );
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );

  const onNavigationStateChange = (navState: {url: string}) => {
    if (navState.url.includes('signin-success')) {
      const jwtToken = extractTokenFromUrl(navState.url);
      if (jwtToken) {
        setToken(jwtToken);
      }
    }
  };

  const extractTokenFromUrl = (url: string) => {
    const match = url.match(/userToken=([^&]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (token) {
      authService
        .setToken(token)
        .then(() => {
          navigation.navigate(RootStackScreen.SPLASH);
        })
        // TODO handle catch better
        .catch(console.log);
    }
  }, [token]);

  return (
    <WebView
      source={{uri: `${configurationService.getApiUrl()}/signin`}}
      onNavigationStateChange={onNavigationStateChange}
      style={{flex: 1}}
    />
  );
};
