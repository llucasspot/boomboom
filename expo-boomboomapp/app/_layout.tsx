import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import '../src/tsyringe/tsyringe.config';
import RootStackScreenNavigator from "../src/navigation/RootStackScreenNavigator/RootStackScreenNavigator";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import AuthService from "../src/services/AuthService/AuthService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: RootStackScreen.SPLASH,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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

  useEffect(() => {
    authService.initialiseApplication(isDarkMode)
        .then(() => {})
        // TODO handle catch better
        .catch(err => console.log("RootLayoutNav : ", err));
  }, [])

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <RootStackScreenNavigator />
    </ThemeProvider>
  );
}
