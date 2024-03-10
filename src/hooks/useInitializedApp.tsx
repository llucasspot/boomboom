import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import AppService from "#services/AppService/AppService";
import AuthService from "#services/AuthService/AuthService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

export const useInitializedApp = () => {
  const isDarkMode = useColorScheme() === "dark";
  const appService = getGlobalInstance<AppService>(ServiceInterface.AppService);
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const storageService = getGlobalInstance<StorageService>(
    ServiceInterface.StorageServiceI,
  );
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  useEffect(() => {
    appService
      .initialiseApplication(isDarkMode)
      .then(() => storageService.getAuthenticateToken())
      .then((authToken) => {
        if (authToken) {
          return authService.authenticateUser(authToken);
        }
      })
      .then(() => {})
      // TODO handle catch better
      .catch((err) => console.log("RootLayoutNav : ", err))
      .finally(() => {
        setIsAppInitialized(true);
      });
  }, []);
  return {
    isAppInitialized,
  };
};
