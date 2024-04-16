import { Module, ModuleMetadata, Provider } from '@nestjs/common';
import {
  DatabaseDialectConfigs,
  JwtConfig,
  SecurityConfig,
  ServerConfig,
  UploadConfig,
} from '#config/beans';
import config from 'config';
import { DefaultConfiguration } from '#config/beans/defineConfig';

const configProviders: Provider[] = [
  {
    provide: UploadConfig,
    useValue: new UploadConfig(
      config.get<DefaultConfiguration['upload']>('upload'),
    ),
  },
  {
    provide: ServerConfig,
    useValue: new ServerConfig(
      config.get<DefaultConfiguration['server']>('server'),
    ),
  },
  {
    provide: JwtConfig,
    useValue: new JwtConfig(config.get<DefaultConfiguration['jwt']>('jwt')),
  },
  {
    provide: SecurityConfig,
    useValue: new SecurityConfig(
      config.get<DefaultConfiguration['security']>('security'),
    ),
  },
  {
    provide: DatabaseDialectConfigs,
    useValue: new DatabaseDialectConfigs(
      config.get<DefaultConfiguration['database']>('database').configs,
    ),
  },
];

export const ConfigurationModuleMetadata: ModuleMetadata = {
  providers: [...configProviders],
  imports: [],
  exports: [...configProviders],
};

@Module(ConfigurationModuleMetadata)
export class ConfigurationModule {
  static getFileUploadStorageServiceProvider() {
    return config.get<DefaultConfiguration['FileUploadStorageServiceProvider']>(
      'FileUploadStorageServiceProvider',
    ).provider;
  }

  static getDatabaseServiceProvider() {
    return config.get<DefaultConfiguration['database']>('database').provider;
  }
}
