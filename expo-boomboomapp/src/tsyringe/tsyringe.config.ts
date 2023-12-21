import {container} from 'tsyringe';
import {configureGlobalInjector, injectSingleton} from './diUtils';
import ServiceInterface from './ServiceInterface';
import StyleService from '../services/StyleService/StyleService';
import LanguageService from '../services/LanguageService/LanguageService';
import StorageService from '../services/StorageService/StorageService';
import UserService from '../services/UserService/UserService';
import AuthService from '../services/AuthService/AuthService';
import ConfigurationService from '../services/ConfigurationService/ConfigurationService';
import LoggerService from '../services/LoggerService/LoggerService';
import ErrorService from '../services/ErrorService/ErrorService';
import {SpotifyApiService} from '../api/SpotifyApiService/SpotifyApiService';
import {ProfileApiService} from '../api/ProfileApiService/ProfileApiService';
import {SpotifyApiMockService} from "../api/SpotifyApiService/SpotifyApiMockService";
import {SpotifyApiServiceI} from "../api/SpotifyApiService/SpotifyApiServiceI";
import {ProfileApiServiceI} from "../api/ProfileApiService/ProfileApiServiceI";
import {ProfileApiMockService} from "../api/ProfileApiService/ProfileApiMockService";

const IS_APP_IN_MOCK_MODE = ConfigurationService.isAppInMockMode()

const injector = container.createChildContainer();
configureGlobalInjector(injector);

injectSingleton<StyleService>(ServiceInterface.StyleServiceI, StyleService);
injectSingleton<LanguageService>(
  ServiceInterface.LanguageServiceI,
  LanguageService,
);
injectSingleton<StorageService>(
  ServiceInterface.StorageServiceI,
  StorageService,
);
injectSingleton<ConfigurationService>(
  ServiceInterface.ConfigurationService,
  ConfigurationService,
);
injectSingleton<AuthService>(ServiceInterface.AuthService, AuthService);
injectSingleton<LoggerService>(ServiceInterface.LoggerService, LoggerService);
injectSingleton<AuthService>(ServiceInterface.AuthService, AuthService);
injectSingleton<UserService>(ServiceInterface.UserService, UserService);
injectSingleton<ErrorService>(ServiceInterface.ErrorService, ErrorService);
injectSingleton<SpotifyApiServiceI>(
  ServiceInterface.SpotifyApiServiceI,
    IS_APP_IN_MOCK_MODE ? SpotifyApiMockService : SpotifyApiService,
);
injectSingleton<ProfileApiServiceI>(
  ServiceInterface.ProfileApiServiceI,
    IS_APP_IN_MOCK_MODE ? ProfileApiMockService : ProfileApiService
);
