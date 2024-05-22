require('dotenv').config()

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_USERNAME_PO,
  DB_PASSWORD_PO,
  DB_NAME_PO,
  DB_HOST_PO
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: 'Postgres',
    password: DB_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: DB_USERNAME_PO,
    password: DB_PASSWORD_PO,
    database: DB_NAME_PO,
    host: DB_HOST_PO,
    port: 47188,
    dialect: 'postgres'
  }
}
