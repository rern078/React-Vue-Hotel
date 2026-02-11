import { query } from './client.js';

function rowToHousekeeping(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    room_id: row.room_id,
    staff_name: row.staff_name,
    status: row.status,
    cleaned_date: row.cleaned_date,
    room_name: row.room_name ?? null,
  };
}

export async function getHousekeeping() {
  const result = await query(
    `SELECT h.id,
            h.room_id,
            h.staff_name,
            h.status,
            h.cleaned_date,
            r.name AS room_name
     FROM housekeeping h
     LEFT JOIN rooms r ON r.id = h.room_id
     ORDER BY h.cleaned_date DESC, h.id DESC`
  );
  return result.rows.map(rowToHousekeeping);
}

export async function createHousekeeping({ room_id, staff_name, status, cleaned_date }) {
  if (cleaned_date) {
    await query(
      `INSERT INTO housekeeping (room_id, staff_name, status, cleaned_date)
       VALUES (?, ?, ?, ?)`,
      [Number(room_id), staff_name, status, cleaned_date]
    );
  } else {
    await query(
      `INSERT INTO housekeeping (room_id, staff_name, status)
       VALUES (?, ?, ?)`,
      [Number(room_id), staff_name, status]
    );
  }
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT h.id,
            h.room_id,
            h.staff_name,
            h.status,
            h.cleaned_date,
            r.name AS room_name
     FROM housekeeping h
     LEFT JOIN rooms r ON r.id = h.room_id
     WHERE h.id = ?`,
    [newId]
  );
  return rowToHousekeeping(result.rows[0]);
}

export async function deleteHousekeeping(id) {
  const result = await query('DELETE FROM housekeeping WHERE id = ?', [id]);
  return !!result.affectedRows;
}

