import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './client.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function runSchema() {
  let sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  sql = sql.split('\n').filter((line) => !/^\s*--/.test(line)).join('\n');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const st of statements) {
    try {
      await query(st + ';');
    } catch (err) {
      if (err.code !== 'ER_DUP_KEYNAME') throw err;
    }
  }
}

export async function runSeed() {
  const count = await query('SELECT COUNT(*) AS n FROM rooms');
  const n = Number(count.rows[0]?.n ?? count.rows[0]?.N ?? 0);
  if (n > 0) return;
  const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  await query(sql);
}

/** Create users, customers, roles, room_types, rooms, bookings, reservations, reservation_rooms, checkins, services, service_orders, invoices, payments, housekeeping and audit_logs tables (and seed) if they don't exist. */
export async function ensureTables() {
  let needSchema = false;
  for (const table of ['users', 'customers', 'roles', 'room_types', 'rooms', 'bookings', 'reservations', 'reservation_rooms', 'checkins', 'services', 'service_orders', 'invoices', 'payments', 'housekeeping', 'audit_logs']) {
    try {
      await query(`SELECT 1 FROM ${table} LIMIT 1`);
    } catch (err) {
      if (err.code !== 'ER_NO_SUCH_TABLE') throw err;
      needSchema = true;
      break;
    }
  }
  if (needSchema) {
    console.log('Tables missing. Creating schema and seeding...');
    await runSchema();
    await runSeed();
    console.log('Database ready (users, customers, roles, room_types, rooms, bookings, reservations, reservation_rooms, checkins, services, service_orders, invoices, payments, housekeeping, audit_logs).');
  }
}
