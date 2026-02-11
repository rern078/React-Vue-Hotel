import { query } from './client.js';

function rowToService(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    service_name: row.service_name,
    price: Number(row.price),
    status: Boolean(row.status),
  };
}

export async function getServices() {
  const result = await query('SELECT id, service_name, price, status FROM services ORDER BY id ASC');
  return result.rows.map(rowToService);
}

export async function getServiceById(id) {
  const result = await query('SELECT id, service_name, price, status FROM services WHERE id = ?', [id]);
  return rowToService(result.rows[0]);
}

export async function createService({ service_name, price, status = 1 }) {
  const name = String(service_name ?? '').trim();
  if (!name) throw new Error('Service name is required');
  const p = price != null ? Number(price) : 0;
  const s = status ? 1 : 0;
  const result = await query(
    'INSERT INTO services (service_name, price, status) VALUES (?, ?, ?)',
    [name, p, s]
  );
  return getServiceById(result.insertId);
}

export async function updateService(id, fields) {
  const allowed = ['service_name', 'price', 'status'];
  const entries = Object.entries(fields || {}).filter(([key, value]) => allowed.includes(key) && value !== undefined);
  if (!entries.length) return getServiceById(id);

  const sets = [];
  const values = [];
  for (const [key, value] of entries) {
    sets.push(`${key} = ?`);
    if (key === 'price') values.push(Number(value));
    else if (key === 'status') values.push(value ? 1 : 0);
    else values.push(value);
  }
  values.push(id);
  const sql = `UPDATE services SET ${sets.join(', ')} WHERE id = ?`;
  const result = await query(sql, values);
  if (!result.affectedRows) return null;
  return getServiceById(id);
}

export async function deleteService(id) {
  const result = await query('DELETE FROM services WHERE id = ?', [id]);
  return !!result.affectedRows;
}

