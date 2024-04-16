import { Injectable } from '@nestjs/common';
import { SequelizeDatabaseService } from '#core/database/services/sequelize.database.service';
import { DatabaseDialect, DatabaseDialectConfigs } from '#config/beans';

@Injectable()
export class SqliteDatabaseService extends SequelizeDatabaseService {
  constructor(protected databaseDialectConfigs: DatabaseDialectConfigs) {
    super(databaseDialectConfigs[DatabaseDialect.SQLITE]);
  }
}
