/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');

const database = config.get('database');
const DATABASE_CONFIG = database['configs'][database.selected];

module.exports = {
  development: {
    username: DATABASE_CONFIG.username,
    password: DATABASE_CONFIG.password,
    database: DATABASE_CONFIG.name,
    host: DATABASE_CONFIG.host,
    port: DATABASE_CONFIG.port,
    dialect: DATABASE_CONFIG.dialect,
  },
  test: {
    username: DATABASE_CONFIG.username,
    password: DATABASE_CONFIG.password,
    database: DATABASE_CONFIG.name,
    host: DATABASE_CONFIG.host,
    port: DATABASE_CONFIG.port,
    dialect: DATABASE_CONFIG.dialect,
  },
  production: {
    username: DATABASE_CONFIG.username,
    password: DATABASE_CONFIG.password,
    database: DATABASE_CONFIG.name,
    host: DATABASE_CONFIG.host,
    port: DATABASE_CONFIG.port,
    dialect: DATABASE_CONFIG.dialect,
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
      // },
    },
  },
};
