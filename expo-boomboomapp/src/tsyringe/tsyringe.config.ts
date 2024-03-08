// openapi-generator-cli generate api service using js URL api
// but react native don't have this api
// we need to import it
import "react-native-url-polyfill/auto";
import {
  SpotifyApiInterface,
  UserApiInterface,
} from "swagger-boomboom-backend";
import { container } from "tsyringe";

import ServiceInterface from "./ServiceInterface";
import { configureGlobalInjector, injectSingleton } from "./diUtils";

import { ProfileApiMockService } from "#api/ProfileApiService/ProfileApiMockService";
import { ProfileApiService } from "#api/ProfileApiService/ProfileApiService";
import { ProfileApiServiceI } from "#api/ProfileApiService/ProfileApiServiceI";
import { SpotifyApiMockService } from "#api/SpotifyApiService/SpotifyApiMockService";
import { SpotifyApiService } from "#api/SpotifyApiService/SpotifyApiService";
import { UserApiMockService } from "#api/UserApiService/UserApiMockService";
import { UserApiService } from "#api/UserApiService/UserApiService";
import AppService from "#services/AppService/AppService";
import AuthService from "#services/AuthService/AuthService";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import ErrorService from "#services/ErrorService/ErrorService";
import LanguageService from "#services/LanguageService/LanguageService";
import StorageService from "#services/StorageService/StorageService";
import StyleService from "#services/StyleService/StyleService";
import UserService from "#services/UserService/UserService";

const IS_APP_IN_MOCK_MODE = ConfigurationService.isAppInMockMode();

const injector = container.createChildContainer();
configureGlobalInjector(injector);

// base
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
// api
injectSingleton<ProfileApiServiceI>(
  ServiceInterface.ProfileApiServiceI,
  IS_APP_IN_MOCK_MODE ? ProfileApiMockService : ProfileApiService,
);

injectSingleton<UserApiInterface>(
  ServiceInterface.UserApiInterface,
  IS_APP_IN_MOCK_MODE ? UserApiMockService : UserApiService,
);
injectSingleton<SpotifyApiInterface>(
  ServiceInterface.SpotifyApiInterface,
  IS_APP_IN_MOCK_MODE ? SpotifyApiMockService : SpotifyApiService,
);

// others
injectSingleton<AuthService>(ServiceInterface.AuthService, AuthService);
injectSingleton<UserService>(ServiceInterface.UserService, UserService);
injectSingleton<ErrorService>(ServiceInterface.ErrorService, ErrorService);
injectSingleton<AppService>(ServiceInterface.AppService, AppService);
