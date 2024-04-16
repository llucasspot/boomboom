import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModuleMetadata } from './configuration.module';
import { DatabaseService } from '#core/database/services/database.service';
import config from 'config';
import defaultConfiguration from '#config/default';
import {
  DatabaseDialectConfigs,
  JwtConfig,
  SecurityConfig,
  ServerConfig,
} from '#config/beans';

describe('ConfigurationService', () => {
  let serverConfig: ServerConfig;
  let jwtConfig: JwtConfig;
  let securityConfig: SecurityConfig;
  let databaseDialectConfigs: DatabaseDialectConfigs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      ConfigurationModuleMetadata,
    )
      .overrideProvider(DatabaseService)
      .useValue(null)
      .compile();

    serverConfig = module.get<ServerConfig>(ServerConfig);
    jwtConfig = module.get<JwtConfig>(JwtConfig);
    securityConfig = module.get<SecurityConfig>(SecurityConfig);
    databaseDialectConfigs = module.get<DatabaseDialectConfigs>(
      DatabaseDialectConfigs,
    );
  });

  it('should return the server defaultConfiguration', () => {
    const defaultServerConfig = defaultConfiguration.server;

    jest.spyOn(config, 'get').mockReturnValue(serverConfig);

    expect(defaultServerConfig).toEqual(serverConfig);
  });

  it('should return the database defaultConfiguration', () => {
    const defaultDatabaseDialectConfigs = defaultConfiguration.database.configs;

    jest.spyOn(config, 'get').mockReturnValue(databaseDialectConfigs);

    expect(defaultDatabaseDialectConfigs).toEqual(databaseDialectConfigs);
  });

  it('should return the JWT defaultConfiguration', () => {
    const defaultJwtConfig = defaultConfiguration.jwt;

    jest.spyOn(config, 'get').mockReturnValue(jwtConfig);

    expect(defaultJwtConfig).toEqual(jwtConfig);
  });

  it('should return the security defaultConfiguration', () => {
    const defaultSecurityConfig = defaultConfiguration.security;

    jest.spyOn(config, 'get').mockReturnValue(securityConfig);

    expect(defaultSecurityConfig).toEqual(securityConfig);
  });
});
