import AsyncStorage from "@react-native-async-storage/async-storage";
import { Token } from "@utils/sessionUtils";
import { inject, singleton } from "tsyringe";

import LocalStorageItem from "./LocalStorageItem";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import ConfigurationService from "../ConfigurationService/ConfigurationService";
import { GenericService } from "../GenericService";
import { SupportedLanguages } from "../LanguageService/LanguageServiceI";

@singleton()
export default class StorageService extends GenericService {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    private configurationService: ConfigurationService,
  ) {
    super();
    if (this.configurationService.isAppInDebugMode()) {
      this.getAuthenticateToken()
        .then((token) => {
          this.logger.debug("authToken : ", token);
        })
        .catch(this.logger.error);
    }
  }

  private async logAuthToken(_token: string) {
    if (!this.configurationService.isAppInDebugMode()) {
      return;
    }
    const token = _token ?? (await this.getAuthenticateToken());
    this.logger.debug("authToken : ", token);
  }

  getAuthenticateToken(): Promise<Token | null> {
    return AsyncStorage.getItem(LocalStorageItem.BEARER_TOKEN);
  }

  async setAuthenticateToken(token: Token): Promise<void> {
    await this.logAuthToken(token);
    return AsyncStorage.setItem(LocalStorageItem.BEARER_TOKEN, token);
  }

  removeAuthenticateToken(): Promise<void> {
    return AsyncStorage.removeItem(LocalStorageItem.BEARER_TOKEN);
  }

  getCurrentUserId(): Promise<string | null> {
    return AsyncStorage.getItem(LocalStorageItem.CURRENT_USER_ID);
  }

  setCurrentUserId(userId: string): Promise<void> {
    return AsyncStorage.setItem(
      LocalStorageItem.CURRENT_USER_ID,
      userId.toString(),
    );
  }

  removeCurrentUserId(): Promise<void> {
    return AsyncStorage.removeItem(LocalStorageItem.CURRENT_USER_ID);
  }

  getLanguage(): Promise<SupportedLanguages | null> {
    return AsyncStorage.getItem(
      LocalStorageItem.LANGUAGE,
    ) as Promise<SupportedLanguages | null>;
  }

  setLanguage(language: SupportedLanguages): Promise<void> {
    return AsyncStorage.setItem(LocalStorageItem.LANGUAGE, language);
  }
}
