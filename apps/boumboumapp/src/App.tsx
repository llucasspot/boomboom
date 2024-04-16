import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import "#modules/core/di";
import { MeProfileApiService } from "#modules/api/services/ProfileApi/me-profile-api.service";
import { AuthNavigator } from "#modules/auth/Auth.navigator";
import { AppService } from "#modules/core/app/app.service";
import { diService } from "#modules/core/di/di-utils";
import { StyleProvider } from "#modules/core/style/StyleProvider";
import { RootNavigator } from "#modules/match/Root.navigator";
import { RegisterNavigator } from "#modules/registration/Register.navigator";

const queryClient = new QueryClient();

export default function WrappedApp() {
  const appService = diService.getInstance(AppService);
  const appState = appService.useAppState();

  return (
    <StyleProvider isColorSchemeDark={appState.isDark}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    </StyleProvider>
  );
}

function App() {
  const meProfileApiService = diService.getInstance(MeProfileApiService);
  const {
    data: userInfo,
    isLoading,
    isError,
  } = meProfileApiService.useProfile();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (!userInfo || isError) {
    return <AuthNavigator />;
  }
  if (!userInfo.data.profile) {
    return <RegisterNavigator />;
  }
  return <RootNavigator userInfo={userInfo.data} />;
}
