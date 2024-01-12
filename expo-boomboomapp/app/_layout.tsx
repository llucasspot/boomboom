import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

import "../src/tsyringe/tsyringe.config";
import AppService from "../src/services/AppService/AppService";
import ErrorService from "../src/services/ErrorService/ErrorService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../src/tsyringe/diUtils";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (!loaded) {
      return;
    }
    SplashScreen.hideAsync();
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
  const isDarkMode = useColorScheme() === "dark";
  const appService = getGlobalInstance<AppService>(ServiceInterface.AppService);
  const errorService = getGlobalInstance<ErrorService>(
    ServiceInterface.ErrorService,
  );

  errorService.useListenError();

  useEffect(() => {
    appService
      .initialiseApplication(isDarkMode)
      .then(() => {})
      // TODO handle catch better
      .catch((err) => console.log("RootLayoutNav : ", err));
  }, []);

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
