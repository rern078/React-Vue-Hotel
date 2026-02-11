import bcrypt from 'bcryptjs';
import { query } from './client.js';

const SALT_ROUNDS = 10;

function rowToUser(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    created_at: row.created_at,
    user_id: row.user_id,
    username: row.username,
    password_hash: row.password_hash,
    full_name: row.full_name,
    phone: row.phone,
    role_id: row.role_id,
    status: row.status,
  };
}

export async function findByEmail(email) {
  const result = await query(
    'SELECT id, name, username, full_name, email, phone, role_id, status, password_hash, created_at FROM users WHERE email = ?',
    [email]
  );
  return result.rows[0] || null;
}

export async function createUser({ name, email, password, username = null, full_name = null, phone = null, role_id = null, status = 1 }) {
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await query(
    'INSERT INTO users (name, username, full_name, email, phone, role_id, status, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      name.trim(),
      username ? String(username).trim() : null,
      full_name ? String(full_name).trim() : null,
      email.trim().toLowerCase(),
      phone ? String(phone).trim() : null,
      role_id ?? null,
      status ?? 1,
      password_hash,
    ]
  );
  const id = result.insertId;
  const r = await query(
    'SELECT id, name, username, full_name, email, phone, role_id, status, password_hash, created_at FROM users WHERE id = ?',
    [id]
  );
  return rowToUser(r.rows[0]);
}

export async function verifyPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

export async function getUsers() {
  const result = await query(
    'SELECT id, name, username, full_name, email, phone, role_id, status, created_at FROM users ORDER BY id ASC'
  );
  return result.rows.map(rowToUser);
}

export async function getUserById(id) {
  const result = await query(
    'SELECT id, name, username, full_name, email, phone, role_id, status, created_at FROM users WHERE id = ?',
    [id]
  );
  return rowToUser(result.rows[0]);
}

export async function updateUser(id, fields) {
  const allowed = ['name', 'username', 'full_name', 'email', 'phone', 'role_id', 'status'];
  const entries = Object.entries(fields || {}).filter(([key, value]) => allowed.includes(key) && value !== undefined);
  if (!entries.length) {
    const existing = await getUserById(id);
    return existing;
  }
  const sets = entries.map(([key]) => `${key} = ?`);
  const values = entries.map(([, value]) => value);
  const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`;
  const result = await query(sql, [...values, id]);
  if (!result.affectedRows) return null;
  return getUserById(id);
}

export async function deleteUser(id) {
  const result = await query('DELETE FROM users WHERE id = ?', [id]);
  return !!result.affectedRows;
}
