import bcrypt from 'bcryptjs';
import { query } from './client.js';

const SALT_ROUNDS = 10;

function rowToCustomer(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    full_name: row.full_name,
    gender: row.gender,
    phone: row.phone,
    email: row.email,
    id_card: row.id_card,
    address: row.address,
    created_at: row.created_at,
  };
}

export async function findByEmail(email) {
  const result = await query(
    'SELECT id, full_name, gender, phone, email, id_card, address, password_hash, created_at FROM customers WHERE email = ?',
    [email]
  );
  return result.rows[0] || null;
}

export async function createCustomer({ full_name, gender, phone, email, id_card, address, password }) {
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await query(
    `INSERT INTO customers (full_name, gender, phone, email, id_card, address, password_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      full_name.trim(),
      gender ? String(gender).trim() : null,
      phone ? String(phone).trim() : null,
      email.trim().toLowerCase(),
      id_card ? String(id_card).trim() : null,
      address ?? null,
      password_hash,
    ]
  );
  const id = result.insertId;
  const r = await query(
    'SELECT id, full_name, gender, phone, email, id_card, address, created_at FROM customers WHERE id = ?',
    [id]
  );
  return rowToCustomer(r.rows[0]);
}

export async function verifyPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

export async function getCustomers() {
  const result = await query(
    'SELECT id, full_name, gender, phone, email, id_card, address, created_at FROM customers ORDER BY id ASC'
  );
  return result.rows.map(rowToCustomer);
}

export async function getCustomerById(id) {
  const result = await query(
    'SELECT id, full_name, gender, phone, email, id_card, address, created_at FROM customers WHERE id = ?',
    [id]
  );
  return rowToCustomer(result.rows[0]);
}

export async function updateCustomer(id, fields) {
  const allowed = ['full_name', 'gender', 'phone', 'email', 'id_card', 'address'];
  const entries = Object.entries(fields || {}).filter(([key, value]) => allowed.includes(key) && value !== undefined);
  if (!entries.length) return getCustomerById(id);

  const sets = [];
  const values = [];
  for (const [key, value] of entries) {
    sets.push(`${key} = ?`);
    values.push(value);
  }
  values.push(id);
  await query(`UPDATE customers SET ${sets.join(', ')} WHERE id = ?`, values);
  return getCustomerById(id);
}

export async function deleteCustomer(id) {
  const result = await query('DELETE FROM customers WHERE id = ?', [id]);
  return !!result.affectedRows;
}

