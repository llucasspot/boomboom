import { DatabaseDialect, DatabaseDialectDefaultPort } from './beans';
import { definePartialConfig } from './beans/definePartialConfig';
import { MysqlDatabaseService } from '#core/database/services/mysql.database.service';

export default definePartialConfig({
  database: {
    provider: MysqlDatabaseService,
    configs: {
      [DatabaseDialect.MY_SQL]: {
        host: '',
        port: DatabaseDialectDefaultPort.SQLITE,
        dialect: DatabaseDialect.MY_SQL,
        username: '',
        password: '',
        name: 'boumboum',
      },
    },
  },
  server: {
    port: 4001,
  },
  jwt: {
    expiresIn: '1d',
    secret: 'secret',
  },
});
