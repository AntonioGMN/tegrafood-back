import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
let connectionString;

if (process.env.NODE_ENV === 'prod') {
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL_DOCKER;
}

console.log(connectionString);

const connection = new Pool({
  connectionString: connectionString,
});

export default connection;
