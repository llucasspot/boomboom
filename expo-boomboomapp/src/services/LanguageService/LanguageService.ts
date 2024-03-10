import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { inject, singleton } from "tsyringe";

import { SupportedLanguages } from "./LanguageServiceI";
import en from "./Languages/en";
import fr from "./Languages/fr";
import { GenericService } from "../GenericService";
import StorageService from "../StorageService/StorageService";

import ServiceInterface from "#tsyringe/ServiceInterface";

@singleton()
export default class LanguageService extends GenericService {
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    private storageService: StorageService,
  ) {
    super();
    storageService.removeAuthenticateToken();
    this.initialise();
  }

  private initialise(): void {
    i18next.use(initReactI18next).init({
      compatibilityJSON: "v3",
      fallbackLng: "en",
      supportedLngs: Object.values(SupportedLanguages),
      resources: {
        en: {
          translation: en,
        },
        fr: {
          translation: fr,
        },
      },
      interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
      },
    });
  }

  async initialiseService() {
    const currentLanguage = await this.storageService.getLanguage();
    if (currentLanguage) {
      await this.setLanguage(currentLanguage);
    }
  }

  getLanguage(): string {
    return i18next.language;
    // Take the language from Asyncstorage instead of i18n directly
  }

  async setLanguage(language: SupportedLanguages): Promise<void> {
    this.storageService
      .setLanguage(language)
      .then(() => i18next.changeLanguage(language))
      .catch((error) => this.logger.error(error));
  }

  translate(string: string): string {
    return ((): string => useTranslation().t(string))();
  }

  useTranslation() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTranslation();
  }
}
