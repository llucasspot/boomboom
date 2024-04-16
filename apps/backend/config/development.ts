import { DatabaseDialect } from './beans';
import { definePartialConfig } from './beans/definePartialConfig';
import { SqliteDatabaseService } from '#core/database/services/sqlite.database.service';

export default definePartialConfig({
  database: {
    provider: SqliteDatabaseService,
    configs: {
      [DatabaseDialect.SQLITE]: {
        logging: true,
        storage: './database.sqlite3',
      },
    },
  },
  server: {
    cors: {
      origin: '*',
    },
  },
});
