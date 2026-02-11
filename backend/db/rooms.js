import { query } from './client.js';

function rowToRoom(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    room_type_id: row.room_type_id,
    price: row.price,
    capacity: row.capacity,
    amenities: Array.isArray(row.amenities) ? row.amenities : (row.amenities ? (typeof row.amenities === 'string' ? JSON.parse(row.amenities) : row.amenities) : []),
    image: row.image,
    available: Boolean(row.available),
  };
}

export async function getRooms(filters = {}) {
  let sql = 'SELECT * FROM rooms WHERE 1=1';
  const params = [];
  if (filters.available !== undefined) {
    sql += ' AND available = ?';
    params.push(filters.available === 'true' || filters.available === true ? 1 : 0);
  }
  if (filters.type) {
    sql += ' AND room_type_id = ?';
    params.push(filters.type);
  }
  sql += ' ORDER BY id';
  const result = await query(sql, params);
  return result.rows.map(rowToRoom);
}

export async function getRoomById(id) {
  const result = await query('SELECT * FROM rooms WHERE id = ?', [id]);
  return rowToRoom(result.rows[0]);
}

export async function createRoom(data) {
  const { name, room_type_id, price, capacity, amenities, image, available } = data;
  await query(
    `INSERT INTO rooms (name, room_type_id, price, capacity, amenities, image, available)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      Number(room_type_id),
      Number(price),
      Number(capacity) || 2,
      JSON.stringify(Array.isArray(amenities) ? amenities : []),
      image || null,
      available !== false ? 1 : 0,
    ]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  return getRoomById(newId);
}

export async function updateRoom(id, data) {
  const fields = [];
  const values = [];
  const allowed = ['name', 'room_type_id', 'price', 'capacity', 'amenities', 'image', 'available'];
  for (const key of allowed) {
    if (data[key] === undefined) continue;
    fields.push(`${key} = ?`);
    if (key === 'amenities') values.push(JSON.stringify(Array.isArray(data[key]) ? data[key] : []));
    else if (key === 'available') values.push(data[key] === true || data[key] === 'true' ? 1 : 0);
    else values.push(data[key]);
  }
  if (fields.length === 0) return getRoomById(id);
  values.push(id);
  await query(`UPDATE rooms SET ${fields.join(', ')} WHERE id = ?`, values);
  return getRoomById(id);
}

export async function deleteRoom(id) {
  const result = await query('DELETE FROM rooms WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}
