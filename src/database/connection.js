import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

export default connection;
