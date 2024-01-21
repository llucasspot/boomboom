import { container } from "tsyringe";

import ServiceInterface from "./ServiceInterface";
import { configureGlobalInjector, injectSingleton } from "./diUtils";
import { MatchApiMockService } from "../api/MatchApiService/MatchApiMockService";
import { MatchApiService } from "../api/MatchApiService/MatchApiService";
import { MatchApiServiceI } from "../api/MatchApiService/MatchApiServiceI";
import { ProfileApiMockService } from "../api/ProfileApiService/ProfileApiMockService";
import { ProfileApiService } from "../api/ProfileApiService/ProfileApiService";
import { ProfileApiServiceI } from "../api/ProfileApiService/ProfileApiServiceI";
import { SpotifyApiMockService } from "../api/SpotifyApiService/SpotifyApiMockService";
import { SpotifyApiService } from "../api/SpotifyApiService/SpotifyApiService";
import { SpotifyApiServiceI } from "../api/SpotifyApiService/SpotifyApiServiceI";
import AppService from "../services/AppService/AppService";
import AuthService from "../services/AuthService/AuthService";
import ConfigurationService from "../services/ConfigurationService/ConfigurationService";
import ErrorService from "../services/ErrorService/ErrorService";
import LanguageService from "../services/LanguageService/LanguageService";
import StorageService from "../services/StorageService/StorageService";
import StyleService from "../services/StyleService/StyleService";
import UserService from "../services/UserService/UserService";

const IS_APP_IN_MOCK_MODE = ConfigurationService.isAppInMockMode();

const injector = container.createChildContainer();
configureGlobalInjector(injector);

// api
injectSingleton<SpotifyApiServiceI>(
  ServiceInterface.SpotifyApiServiceI,
  IS_APP_IN_MOCK_MODE ? SpotifyApiMockService : SpotifyApiService,
);
injectSingleton<ProfileApiServiceI>(
  ServiceInterface.ProfileApiServiceI,
  IS_APP_IN_MOCK_MODE ? ProfileApiMockService : ProfileApiService,
);
injectSingleton<MatchApiServiceI>(
  ServiceInterface.MatchApiServiceI,
  IS_APP_IN_MOCK_MODE ? MatchApiMockService : MatchApiService,
);

// others
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
injectSingleton<AuthService>(ServiceInterface.AuthService, AuthService);
injectSingleton<UserService>(ServiceInterface.UserService, UserService);
injectSingleton<ErrorService>(ServiceInterface.ErrorService, ErrorService);
injectSingleton<AppService>(ServiceInterface.AppService, AppService);
