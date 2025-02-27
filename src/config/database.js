const { Pool } = require("pg");
require("dotenv").config();

/**
 * Konfigurasi koneksi database PostgreSQL menggunakan Pool.
 */
const pool = new Pool({
  user: process.env.DB_USER, // Username database
  host: process.env.DB_HOST, // Host database
  database: process.env.DB_NAME, // Nama database
  password: process.env.DB_PASSWORD, // Password database
  port: process.env.DB_PORT, // Port database
});

module.exports = pool;
