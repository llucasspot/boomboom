import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import {inject, singleton} from 'tsyringe';
import en from './Languages/en';
import fr from './Languages/fr';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import {I18nI, SupportedLanguages} from './LanguageServiceI';
import StorageService from '../StorageService/StorageService';
import LoggerService from "../LoggerService/LoggerService";
import {Logger} from "../LoggerService/LoggerServiceI";

@singleton()
export default class LanguageService {
  private logger: Logger;
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    private storageService: StorageService,
    @inject(ServiceInterface.LoggerService)
    private loggerService: LoggerService,
  ) {
    this.logger = loggerService.create(LanguageService.constructor.name)
    this.initialise();
  }

  private initialise(): void {
    i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      fallbackLng: 'en',
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
      .catch(error => this.logger.error(error));
  }

  translate(string: string): string {
    return ((): string => useTranslation().t(string))();
  }

  useTranslation(): I18nI {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTranslation();
  }
}
