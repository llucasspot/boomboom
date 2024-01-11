import AsyncStorage from "@react-native-async-storage/async-storage";
import { singleton } from "tsyringe";

import LocalStorageItem from "./LocalStorageItem";
import { Token } from "../../utils/sessionUtils";
import { SupportedLanguages } from "../LanguageService/LanguageServiceI";

@singleton()
export default class StorageService {
  getAuthenticateToken(): Promise<Token | null> {
    return AsyncStorage.getItem(LocalStorageItem.BEARER_TOKEN);
  }

  setAuthenticateToken(token: Token): Promise<void> {
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
