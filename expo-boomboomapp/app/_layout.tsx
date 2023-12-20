import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {router, SplashScreen, Stack} from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import '../src/tsyringe/tsyringe.config';
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import AuthService from "../src/services/AuthService/AuthService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import ConfigurationService from "../src/services/ConfigurationService/ConfigurationService";
import ErrorService from "../src/services/ErrorService/ErrorService";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const authService = getGlobalInstance<AuthService>(
      ServiceInterface.AuthService,
  );
  const configurationService = getGlobalInstance<ConfigurationService>(
      ServiceInterface.ConfigurationService,
  );

  useEffect(() => {
    if (!loaded) {
      return
    }
    authService.isUserConnected()
        .then((isUserConnected) => {
          if (loaded &&
              isUserConnected ||
              configurationService.byPassSignInScreen()
          ) {
            router.replace(`/${RootStackScreen.LOGIN_SUCCESSFUL}`);
            return;
          }
          router.replace(`/${RootStackScreen.AUTH_HOME}`);
        })
        .catch((err: any) => {
          router.replace(`/${RootStackScreen.AUTH_HOME}`);
        })
        .finally(() => {
          SplashScreen.hideAsync();
        })
  }, [loaded]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const isDarkMode = useColorScheme() === 'dark';

  const authService = getGlobalInstance<AuthService>(
      ServiceInterface.AuthService,
  );
  const errorService = getGlobalInstance<ErrorService>(
      ServiceInterface.ErrorService,
  );

  errorService.useListenError();

  useEffect(() => {
    authService.initialiseApplication(isDarkMode)
        .then(() => {})
        // TODO handle catch better
        .catch(err => console.log("RootLayoutNav : ", err));
  }, [])

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown: false}}/>
    </ThemeProvider>
  );
}
