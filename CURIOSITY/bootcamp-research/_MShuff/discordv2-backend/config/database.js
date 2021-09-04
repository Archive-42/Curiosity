// Here we are just grabbing all the configuration files we need and exporting it

const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  test: {
    dialect: 'sqlite',
    DB_CONN: 'sqlite.memory',
    logging: false,
  },
  production: {
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
    use_env_variable: 'DATABASE_URL',
  },
};
