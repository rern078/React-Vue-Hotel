/**
 * Creates the MySQL database "hoteldb".
 * Connects without a database, then runs CREATE DATABASE.
 * Usage: npm run db:create (from backend folder)
 */
try { await import('dotenv/config'); } catch (_) {}
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from backend folder
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
} catch (_) {}

const dbName = process.env.MYSQL_DATABASE || 'hoteldb';
const config = process.env.DATABASE_URL
  ? process.env.DATABASE_URL.replace(/\/[^/?#]*$/, '') // connect without database to run CREATE DATABASE
  : {
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
    };

async function main() {
  let conn;
  try {
    conn = await mysql.createConnection(config);
    await conn.query(`CREATE DATABASE \`${dbName}\``);
    console.log(`Database "${dbName}" created.`);
  } catch (err) {
    if (err.code === 'ER_DB_CREATE_EXISTS') {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      console.error('Failed to create database:', err.message);
      process.exit(1);
    }
  } finally {
    if (conn) await conn.end();
  }
  process.exit(0);
}

main();
