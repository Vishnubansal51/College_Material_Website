const { URL } = require('url');

const parseDatabaseUrl = (url) => {
  const parsedUrl = new URL(url);
  return {
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.split('/')[1],
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    dialect: 'mysql',
    timezone: '+05:30'
  };
};
console.log(process.env.DATABASE_URL);

module.exports = {
  development: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    timezone: '+05:30'
  },
  test: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql'
  },
  production: process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql'
  }
};
console.log(process.env.DATABASE_URL);
console.log(password)

console.log(host);
console.log(port)
