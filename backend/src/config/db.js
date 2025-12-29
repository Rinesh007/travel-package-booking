const mysql = require("mysql2/promise");
const {
  dbHost,
  dbUser,
  dbPass,
  dbName
} = require("./env");


const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
