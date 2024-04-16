/* eslint-disable react-hooks/rules-of-hooks */
import i18next, { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { initReactI18next, useTranslation } from "react-i18next";

import { GenericService } from "../GenericService";

import { inject, singleton } from "#modules/core/di/di-utils";
import { en } from "#modules/core/language/Languages/en";
import { fr } from "#modules/core/language/Languages/fr";
import { SupportedLanguages } from "#modules/core/language/language.serviceI";
import { StorageService } from "#modules/core/storage/storage.service";

@singleton()
export class LanguageService extends GenericService {
  constructor(
    @inject(StorageService)
    private storageService: StorageService,
  ) {
    super();
  }

  override async init() {
    this.initialiseI18next();
    const currentLanguage = await this.storageService.language.get();
    if (currentLanguage) {
      await this.setLanguage(currentLanguage);
    }
  }

  getLanguage(): string {
    return i18next.language;
    // Take the language from Asyncstorage instead of i18n directly
  }

  async setLanguage(language: SupportedLanguages): Promise<void> {
    this.storageService.language
      .set(language)
      .then(() => i18next.changeLanguage(language))
      .catch(this.logger.error);
  }

  translate(string: string, options?: TOptionsBase & $Dictionary): string {
    return i18next.t(string, options);
  }

  useTranslation() {
    return useTranslation();
  }

  private initialiseI18next(): void {
    i18next.use(initReactI18next).init({
      compatibilityJSON: "v3",
      fallbackLng: SupportedLanguages.FR,
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
}
