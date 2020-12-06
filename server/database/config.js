const { Pool } = require('pg');

const client = new Pool({
  user: 'postgres',
  password: 'okay',
  host: 'localhost',
  database: 'testdb',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  client,
};
