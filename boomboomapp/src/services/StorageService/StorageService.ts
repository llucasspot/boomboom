import AsyncStorage from '@react-native-async-storage/async-storage';
import {singleton} from 'tsyringe';
import LocalStorageItem from './LocalStorageItem';
import {Id} from '../../utils/globals-beans';
import {Theme} from '../StyleService/StyleStateServiceI';
import {Token} from '../../utils/sessionUtils';
import {SupportedLanguages} from '../LanguageService/LanguageServiceI';

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

  getCurrentUserId(): Promise<Id | null> {
    return AsyncStorage.getItem(LocalStorageItem.CURRENT_USER_ID);
  }

  setCurrentUserId(userId: Id): Promise<void> {
    return AsyncStorage.setItem(
      LocalStorageItem.CURRENT_USER_ID,
      userId.toString(),
    );
  }

  removeCurrentUserId(): Promise<void> {
    return AsyncStorage.removeItem(LocalStorageItem.CURRENT_USER_ID);
  }

  getTheme(): Promise<Theme | null> {
    return AsyncStorage.getItem(
      LocalStorageItem.THEME,
    ) as Promise<Theme | null>;
  }

  setTheme(theme: Theme): Promise<void> {
    return AsyncStorage.setItem(LocalStorageItem.THEME, theme);
  }

  getLanguage(): Promise<SupportedLanguages | null> {
    return AsyncStorage.getItem(
      LocalStorageItem.LANGUAGE,
    ) as Promise<SupportedLanguages | null>;
  }

  setLanguage(language: SupportedLanguages): Promise<void> {
    return AsyncStorage.setItem(LocalStorageItem.LANGUAGE, language);
  }

  getProfilePicture(): Promise<string | null> {
    return AsyncStorage.getItem(LocalStorageItem.PROFILE_PICTURE) as Promise<
      string | null
    >;
  }

  setProfilePicture(profilePictureFilename: string): Promise<void> {
    return AsyncStorage.setItem(
      LocalStorageItem.PROFILE_PICTURE,
      profilePictureFilename,
    );
  }

  async getBottomTabBarDim(): Promise<{height: number; y: number}> {
    const dim = await AsyncStorage.getItem(
      LocalStorageItem.BOTTOM_TAB_BAR_HEIGHT,
    );
    if (dim) {
      return <{height: number; y: number}>JSON.parse(dim);
    }
    return {height: 0, y: 0};
  }

  async setBottomTabBarDim(dim?: {height: number; y: number}): Promise<void> {
    if (dim) {
      await AsyncStorage.setItem(
        LocalStorageItem.BOTTOM_TAB_BAR_HEIGHT,
        JSON.stringify(dim),
      );
    }
  }
}
