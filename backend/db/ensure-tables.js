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
  let sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  sql = sql.split('\n').filter((line) => !/^\s*--/.test(line)).join('\n');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const st of statements) {
    try {
      await query(st + ';');
    } catch (err) {
      if (err.code !== 'ER_DUP_ENTRY' && err.code !== 'ER_NO_REFERENCED_ROW_2') throw err;
    }
  }
}

/** Create users, customers, roles, room_types, rooms, bookings, guests, reservations, reservation_rooms, checkins, services, service_orders, invoices, payments, housekeeping and audit_logs tables (and seed) if they don't exist. */
export async function ensureTables() {
  let needSchema = false;
  for (const table of ['users', 'customers', 'roles', 'hotels', 'room_types', 'rooms', 'bookings', 'guests', 'reservations', 'reservation_rooms', 'checkins', 'services', 'service_orders', 'invoices', 'payments', 'housekeeping', 'audit_logs']) {
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
    await runMigrations();
    await runSeed();
    console.log('Database ready (users, customers, roles, hotels, room_types, rooms, bookings, guests, ...).');
  } else {
    await runMigrations();
  }
}

/** Add new columns to bookings and rooms for Hotel/Booking schema (idempotent). */
async function runMigrations() {
  const alters = [
    'ALTER TABLE rooms ADD COLUMN hotel_id INT DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN hotel_id INT DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN guest_id INT DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN booking_date DATE DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN booking_time TIME DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN arrival_date DATE DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN departure_date DATE DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN est_arrival_time TIME DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN est_departure_time TIME DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN num_adults INT DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN num_children INT DEFAULT NULL',
    'ALTER TABLE bookings ADD COLUMN special_req TEXT DEFAULT NULL',
  ];
  for (const st of alters) {
    try {
      await query(st);
    } catch (err) {
      if (err.code !== 'ER_DUP_FIELDNAME' && err.code !== 'ER_DUP_KEYNAME' && err.code !== 'ER_FK_DUP_NAME') throw err;
    }
  }
  try {
    await query('ALTER TABLE rooms ADD CONSTRAINT fk_rooms_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE SET NULL');
  } catch (err) {
    if (err.code !== 'ER_FK_DUP_NAME' && err.code !== 'ER_DUP_KEYNAME') throw err;
  }
  try {
    await query('ALTER TABLE bookings ADD CONSTRAINT fk_bookings_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE SET NULL');
  } catch (err) {
    if (err.code !== 'ER_FK_DUP_NAME' && err.code !== 'ER_DUP_KEYNAME') throw err;
  }
  try {
    await query('ALTER TABLE bookings ADD CONSTRAINT fk_bookings_guest FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE SET NULL');
  } catch (err) {
    if (err.code !== 'ER_FK_DUP_NAME' && err.code !== 'ER_DUP_KEYNAME') throw err;
  }
}
