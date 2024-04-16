import { Injectable } from '@nestjs/common';
import { SequelizeDatabaseService } from '#core/database/services/sequelize.database.service';
import { DatabaseDialect, DatabaseDialectConfigs } from '#config/beans';

@Injectable()
export class MysqlDatabaseService extends SequelizeDatabaseService {
  constructor(protected databaseDialectConfigs: DatabaseDialectConfigs) {
    super(databaseDialectConfigs[DatabaseDialect.MY_SQL]);
  }
}
