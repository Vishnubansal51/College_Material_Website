const { URL } = require('url');
require('dotenv').config();

const parseDatabaseUrl = (url) => {
  const parsedUrl = new URL(url);
  return {
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.split('/')[1],
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: '+05:30'
  };
};

module.exports = {
  development: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    port: '26257',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: '+05:30'
  },
  test: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: '26257',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    port: '26257',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
