import { DatabaseDialect, DatabaseDialectDefaultPort } from './beans';
import appRoot from 'app-root-path';
import { defineConfig } from './beans/defineConfig';
import { MysqlDatabaseService } from '#core/database/services/mysql.database.service';
import { LocalFileUploadStorageService } from '#core/FileUploadStorageModule/services/LocalFileUploadStorage.service';

export const defaultConfiguration = defineConfig({
  database: {
    provider: MysqlDatabaseService,
    configs: {
      [DatabaseDialect.MY_SQL]: {
        host: '127.0.0.1',
        port: DatabaseDialectDefaultPort.MY_SQL,
        dialect: DatabaseDialect.MY_SQL,
        username: 'root',
        password: 'azerty',
        name: 'boumboum',
        logging: false,
        migrationsFolder: `${appRoot.path}/src/database/migrations/*.js`,
        runMigrations: true,
        alter: false,
      },
      [DatabaseDialect.SQLITE]: {
        host: '',
        port: DatabaseDialectDefaultPort.SQLITE,
        name: '',
        storage: ':memory',
        dialect: DatabaseDialect.SQLITE,
        username: 'root',
        password: 'azerty',
        runMigrations: true,
        migrationsFolder: `${appRoot.path}/src/database/migrations/*.js`,
        logging: false,
        alter: false,
      },
    },
  },
  upload: {
    uploadsFolder: `${appRoot.path}/uploads`,
  },
  server: {
    port: 4000,
    cors: {
      origin: [],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: [],
    },
  },
  security: {
    hashingNumberRoundsSalt: 12,
  },
  jwt: {
    algorithms: ['HS512'],
    expiresIn: '1d',
    refreshTokenExpiresIn: '7d',
    secret: 'secret',
    issuer: 'auth.boumboum.com',
    audience: 'auth.boumboum.com',
  },
  FileUploadStorageServiceProvider: {
    provider: LocalFileUploadStorageService,
  },
  ssoProviders: {
    spotify: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
      successURL: '',
    },
  },
});

export type DefaultConfigurationDatabaseConfigs =
  (typeof defaultConfiguration)['database']['configs'];

export default defaultConfiguration;
