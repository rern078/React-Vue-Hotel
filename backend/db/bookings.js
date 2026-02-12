import { query } from './client.js';

function toDateStr(val) {
  if (!val) return '';
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  return String(val).slice(0, 10);
}

function rowToBooking(row, room = null) {
  if (!row) return null;
  const b = {
    id: String(row.id),
    roomId: String(row.room_id),
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    checkIn: toDateStr(row.check_in),
    checkOut: toDateStr(row.check_out),
    guests: row.guests,
    status: row.status,
  };
  if (room) b.room = room;
  return b;
}

function rowToRoom(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    type: row.room_type_id ?? row.type,
    price: row.price,
    capacity: row.capacity,
    amenities: Array.isArray(row.amenities) ? row.amenities : (row.amenities ? (typeof row.amenities === 'string' ? JSON.parse(row.amenities) : row.amenities) : []),
    image: row.image,
    available: Boolean(row.available),
  };
}

export async function getBookings(filters = {}) {
  let sql = `
    SELECT b.*, r.id AS room_id, r.name AS room_name, r.room_type_id AS room_type_id, r.price AS room_price,
           r.capacity AS room_capacity, r.amenities AS room_amenities, r.image AS room_image, r.available AS room_available
    FROM bookings b
    JOIN rooms r ON r.id = b.room_id
    WHERE 1=1
  `;
  const params = [];
  if (filters.status) {
    sql += ' AND b.status = ?';
    params.push(filters.status);
  }
  if (filters.roomId) {
    sql += ' AND b.room_id = ?';
    params.push(filters.roomId);
  }
  if (filters.guestEmail) {
    sql += ' AND b.guest_email = ?';
    params.push(filters.guestEmail);
  }
  sql += ' ORDER BY b.id';
  const result = await query(sql, params);
  return result.rows.map((row) => {
    const room = rowToRoom({
      id: row.room_id,
      name: row.room_name,
      room_type_id: row.room_type_id,
      price: row.room_price,
      capacity: row.room_capacity,
      amenities: row.room_amenities,
      image: row.room_image,
      available: row.room_available,
    });
    return rowToBooking(
      {
        id: row.id,
        room_id: row.room_id,
        guest_name: row.guest_name,
        guest_email: row.guest_email,
        check_in: row.check_in,
        check_out: row.check_out,
        guests: row.guests,
        status: row.status,
      },
      room
    );
  });
}

export async function getBookingById(id) {
  const result = await query(
    `SELECT b.*, r.id AS room_id, r.name AS room_name, r.room_type_id AS room_type_id, r.price AS room_price,
            r.capacity AS room_capacity, r.amenities AS room_amenities, r.image AS room_image, r.available AS room_available
     FROM bookings b
     JOIN rooms r ON r.id = b.room_id
     WHERE b.id = ?`,
    [id]
  );
  const row = result.rows[0];
  if (!row) return null;
  const room = rowToRoom({
    id: row.room_id,
    name: row.room_name,
    room_type_id: row.room_type_id,
    price: row.room_price,
    capacity: row.room_capacity,
    amenities: row.room_amenities,
    image: row.room_image,
    available: row.room_available,
  });
  return rowToBooking(
    {
      id: row.id,
      room_id: row.room_id,
      guest_name: row.guest_name,
      guest_email: row.guest_email,
      check_in: row.check_in,
      check_out: row.check_out,
      guests: row.guests,
      status: row.status,
    },
    room
  );
}

export async function createBooking(data) {
  const { roomId, guestName, guestEmail, checkIn, checkOut, guests } = data;
  await query(
    `INSERT INTO bookings (room_id, guest_name, guest_email, check_in, check_out, guests, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [roomId, guestName, guestEmail, checkIn, checkOut, guests || 1]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const room = await getRoomForBooking(roomId);
  const rowResult = await query('SELECT * FROM bookings WHERE id = ?', [newId]);
  const row = rowResult.rows[0];
  return rowToBooking(row, room);
}

async function getRoomForBooking(roomId) {
  const r = await query('SELECT * FROM rooms WHERE id = ?', [roomId]);
  const row = r.rows[0];
  if (!row) return null;
  return rowToRoom(row);
}

export async function updateBookingStatus(id, status) {
  await query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  const result = await query('SELECT * FROM bookings WHERE id = ?', [id]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  const room = await getRoomForBooking(row.room_id);
  return rowToBooking(row, room);
}

export async function deleteBooking(id) {
  const result = await query('DELETE FROM bookings WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}
