import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useEffect } from "react";

import { useInitializedApp } from "./src/hooks/useInitializedApp";
import { AuthStackNavigator } from "./src/navigation/AuthStack/AuthStackNavigator";
import { RegisterStackNavigator } from "./src/navigation/RegisterStackScreenNavigator/RegisterStackNavigator";
import { RootStackNavigator } from "./src/navigation/RootStackScreenNavigator/RootStackNavigator";
import ServiceInterface from "./src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "./src/tsyringe/diUtils";

import "./src/tsyringe/tsyringe.config";
import AppService from "./src/services/AppService/AppService";

const queryClient = new QueryClient();

export default function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [loaded, error] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const { isAppInitialized } = useInitializedApp();
  const appService = getGlobalInstance<AppService>(ServiceInterface.AppService);
  const app = appService.useApp();

  const Stack = () => {
    if (!app.isAuthenticated) {
      return <AuthStackNavigator />;
    }
    if (app.isProfileComplete) {
      return <RootStackNavigator />;
    }
    return <RegisterStackNavigator />;
  };

  useEffect(() => {
    if (!loaded || !isAppInitialized) {
      return;
    }
    SplashScreen.hideAsync();
  }, [loaded, isAppInitialized]);

  if (!loaded || !isAppInitialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
