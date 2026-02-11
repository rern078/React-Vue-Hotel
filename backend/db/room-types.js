import { query } from './client.js';

function rowToRoomType(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    type_name: row.type_name,
    description: row.description,
    price: Number(row.price),
    max_person: row.max_person,
  };
}

export async function getRoomTypes() {
  const result = await query('SELECT id, type_name, description, price, max_person FROM room_types ORDER BY id ASC');
  return result.rows.map(rowToRoomType);
}

export async function getRoomTypeById(id) {
  const result = await query('SELECT id, type_name, description, price, max_person FROM room_types WHERE id = ?', [id]);
  return rowToRoomType(result.rows[0]);
}

export async function createRoomType({ type_name, description, price, max_person }) {
  const name = String(type_name ?? '').trim();
  if (!name) throw new Error('Type name is required');
  const p = price != null ? Number(price) : 0;
  const max = max_person != null ? Number(max_person) : 2;
  const result = await query(
    'INSERT INTO room_types (type_name, description, price, max_person) VALUES (?, ?, ?, ?)',
    [name, description ?? null, p, max]
  );
  return getRoomTypeById(result.insertId);
}

export async function updateRoomType(id, fields) {
  const allowed = ['type_name', 'description', 'price', 'max_person'];
  const entries = Object.entries(fields || {}).filter(([key, value]) => allowed.includes(key) && value !== undefined);
  if (!entries.length) return getRoomTypeById(id);

  const sets = [];
  const values = [];
  for (const [key, value] of entries) {
    sets.push(`${key} = ?`);
    if (key === 'price') values.push(Number(value));
    else if (key === 'max_person') values.push(Number(value));
    else values.push(value);
  }
  values.push(id);
  const sql = `UPDATE room_types SET ${sets.join(', ')} WHERE id = ?`;
  const result = await query(sql, values);
  if (!result.affectedRows) return null;
  return getRoomTypeById(id);
}

export async function deleteRoomType(id) {
  const result = await query('DELETE FROM room_types WHERE id = ?', [id]);
  return !!result.affectedRows;
}

