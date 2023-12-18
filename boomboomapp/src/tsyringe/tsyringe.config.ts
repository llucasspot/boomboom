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
import {SpotifyApiService} from '../api/SpotifyApiService';
import {ProfileApiService} from '../api/ProfileApiService';

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
injectSingleton<SpotifyApiService>(
  ServiceInterface.SpotifyApiService,
  SpotifyApiService,
);
injectSingleton<ProfileApiService>(
  ServiceInterface.ProfileApiService,
  ProfileApiService,
);