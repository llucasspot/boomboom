import { GenericService } from '#core/generic.service';
import { Umzug, UmzugOptions } from 'umzug';
import { DatabaseConfig } from '#config/beans';

export abstract class DatabaseService<
  TTTransaction = any,
> extends GenericService {
  protected constructor(protected databaseConfig: DatabaseConfig) {
    super();
  }

  abstract getTransactionCreator(): () => TTTransaction;

  abstract buildUmzugOptions(): UmzugOptions<object>;

  abstract authenticate(): Promise<void>;

  abstract addModels(): void | Promise<void>;

  public async runMigrations(): Promise<void> {
    if (!this.databaseConfig.runMigrations) {
      this.logger.log('Migrations was not triggered');
      return;
    }
    const umzug = new Umzug(this.buildUmzugOptions());
    try {
      await umzug.up();
      this.logger.log('All migrations performed successfully');
    } catch (error) {
      this.logger.error('Migration error:', error);
    }
  }
}
