import { query } from './client.js';

function rowToReservationRoom(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    reservation_id: row.reservation_id,
    room_id: row.room_id,
    price: Number(row.price),
    reservation_status: row.reservation_status ?? null,
    check_in_date: row.check_in_date ?? null,
    check_out_date: row.check_out_date ?? null,
    room_name: row.room_name ?? null,
  };
}

export async function getReservationRooms() {
  const result = await query(
    `SELECT rr.id,
            rr.reservation_id,
            rr.room_id,
            rr.price,
            r.status AS reservation_status,
            r.check_in_date,
            r.check_out_date,
            rm.name AS room_name
     FROM reservation_rooms rr
     LEFT JOIN reservations r ON r.id = rr.reservation_id
     LEFT JOIN rooms rm ON rm.id = rr.room_id
     ORDER BY rr.id ASC`
  );
  return result.rows.map(rowToReservationRoom);
}

export async function createReservationRoom({ reservation_id, room_id, price }) {
  const p = price != null ? Number(price) : 0;
  await query(
    `INSERT INTO reservation_rooms (reservation_id, room_id, price)
     VALUES (?, ?, ?)`,
    [Number(reservation_id), Number(room_id), p]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT rr.id,
            rr.reservation_id,
            rr.room_id,
            rr.price,
            r.status AS reservation_status,
            r.check_in_date,
            r.check_out_date,
            rm.name AS room_name
     FROM reservation_rooms rr
     LEFT JOIN reservations r ON r.id = rr.reservation_id
     LEFT JOIN rooms rm ON rm.id = rr.room_id
     WHERE rr.id = ?`,
    [newId]
  );
  return rowToReservationRoom(result.rows[0]);
}

export async function deleteReservationRoom(id) {
  const result = await query('DELETE FROM reservation_rooms WHERE id = ?', [id]);
  return !!result.affectedRows;
}

