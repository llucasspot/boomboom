import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';
import { DatabaseConfig } from '#config/beans';
import { SequelizeStorage, UmzugOptions } from 'umzug';
import { ConfigurationService } from '#core/configuration/configuration.service';
import { User } from '#modules/user/models/user.entity';
import { Profile } from '#modules/user/models/profile.entity';
import { AuthProvider } from '#modules/auth/models/auth-provider.entity';
import { AuthAccessToken } from '#modules/auth/models/auth-access-token.entity';
import { Match } from '#modules/matchs/models/match.entity';
import { MatchRequest } from '#modules/matchs/models/match-request.entity';
import { Avatar } from '#modules/user/models/avatar.entity';

export abstract class SequelizeDatabaseService extends DatabaseService {
  private sequelize = new Sequelize({
    dialect: this.databaseConfig.dialect,
    host: this.databaseConfig.host,
    port: this.databaseConfig.port,
    username: this.databaseConfig.username,
    password: this.databaseConfig.password,
    database: this.databaseConfig.name,
    storage: this.databaseConfig.storage,
    define: {
      underscored: true,
    },
    logging: this.databaseConfig.logging,
  });

  constructor(protected databaseConfig: DatabaseConfig) {
    super(databaseConfig);
  }

  getTransactionCreator(): () => Promise<Transaction> {
    return () => {
      return this.sequelize.transaction();
    };
  }

  public buildUmzugOptions(): UmzugOptions<object> {
    return {
      migrations: {
        glob: this.databaseConfig.migrationsFolder,
        resolve: ({ name, path, context: queryInterface }) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(queryInterface, Sequelize),
            down: async () => migration.down(queryInterface, Sequelize),
          };
        },
      },
      context: this.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: {
        info: console.info,
        warn: this.logger.warn,
        debug: this.logger.debug,
        error: this.logger.error,
      },
    };
  }

  addModels() {
    this.sequelize.addModels([
      User,
      Profile,
      AuthProvider,
      AuthAccessToken,
      Match,
      MatchRequest,
      Avatar,
    ]);
  }

  async authenticate() {
    if (ConfigurationService.isProductionMode()) {
      await this.sequelize.authenticate({
        logging: this.databaseConfig.logging,
      });
      this.logger.log('Authentication well done');
    } else {
      await this.sequelize.sync({
        force: false,
        alter: this.databaseConfig.alter,
        logging: this.databaseConfig.logging,
      });
      this.logger.log('Authentication well synced');
    }
  }

  async buildFactory(): Promise<Sequelize> {
    return this.sequelize;
  }
}
