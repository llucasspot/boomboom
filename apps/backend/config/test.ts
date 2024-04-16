import { definePartialConfig } from './beans/definePartialConfig';
import { SqliteDatabaseService } from '#core/database/services/sqlite.database.service';

export default definePartialConfig({
  database: {
    provider: SqliteDatabaseService,
  },
});
