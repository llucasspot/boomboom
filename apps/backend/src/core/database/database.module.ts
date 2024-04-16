import { Module, ModuleMetadata, Provider } from '@nestjs/common';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { DatabaseService } from './services/database.service';

const databaseProviders: Provider[] = [
  {
    provide: DatabaseService,
    useClass: ConfigurationModule.getDatabaseServiceProvider(),
  },
];

export const DatabaseModuleMetadata: ModuleMetadata = {
  imports: [ConfigurationModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
};

@Module(DatabaseModuleMetadata)
export class DatabaseModule {}
