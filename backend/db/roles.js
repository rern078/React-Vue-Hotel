import { query } from './client.js';

function rowToRole(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
  };
}

export async function getRoles() {
  const result = await query('SELECT id, name FROM roles ORDER BY id ASC');
  return result.rows.map(rowToRole);
}

export async function getRoleById(id) {
  const result = await query('SELECT id, name FROM roles WHERE id = ?', [id]);
  return rowToRole(result.rows[0]);
}

export async function createRole({ name }) {
  const trimmed = String(name ?? '').trim();
  if (!trimmed) throw new Error('Role name is required');
  const result = await query('INSERT INTO roles (name) VALUES (?)', [trimmed]);
  const created = await getRoleById(result.insertId);
  return created;
}

export async function updateRole(id, { name }) {
  const trimmed = String(name ?? '').trim();
  if (!trimmed) throw new Error('Role name is required');
  const result = await query('UPDATE roles SET name = ? WHERE id = ?', [trimmed, id]);
  if (!result.affectedRows) return null;
  const updated = await getRoleById(id);
  return updated;
}

export async function deleteRole(id) {
  const result = await query('DELETE FROM roles WHERE id = ?', [id]);
  return !!result.affectedRows;
}

