import {
  DatabaseConfigs,
  JwtConfig,
  SecurityConfig,
  ServerConfig,
  UploadConfig,
} from './Configuration';
import { FileUploadStorageServiceProviderConfig } from './providers';
import { SpotifyOauthConfig } from '#core/passport/spotify/SpotifyOauth.config';

export type DefaultConfiguration = {
  server: ServerConfig;
  database: DatabaseConfigs;
  jwt: JwtConfig;
  security: SecurityConfig;
  upload: UploadConfig;
  FileUploadStorageServiceProvider: FileUploadStorageServiceProviderConfig;
  ssoProviders: {
    spotify: SpotifyOauthConfig;
  };
};

export function defineConfig(
  config: DefaultConfiguration,
): DefaultConfiguration {
  return config;
}
