import { query } from './client.js';

function toDateStr(val) {
  if (!val) return '';
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  return String(val).slice(0, 10);
}

function toTimeStr(val) {
  if (!val) return '';
  const s = String(val);
  if (s.length >= 5) return s.slice(0, 5);
  return s;
}

function rowToBooking(row, room = null, hotel = null, guest = null) {
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
    hotelId: row.hotel_id != null ? String(row.hotel_id) : null,
    guestId: row.guest_id != null ? String(row.guest_id) : null,
    bookingDate: toDateStr(row.booking_date),
    bookingTime: toTimeStr(row.booking_time),
    arrivalDate: toDateStr(row.arrival_date) || toDateStr(row.check_in),
    departureDate: toDateStr(row.departure_date) || toDateStr(row.check_out),
    estArrivalTime: toTimeStr(row.est_arrival_time),
    estDepartureTime: toTimeStr(row.est_departure_time),
    numAdults: row.num_adults != null ? row.num_adults : null,
    numChildren: row.num_children != null ? row.num_children : null,
    specialReq: row.special_req || null,
  };
  if (room) b.room = room;
  if (hotel) b.hotel = hotel;
  if (guest) b.guest = guest;
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

function rowToHotel(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    hotelCode: row.hotel_code,
    hotelName: row.hotel_name,
    city: row.city,
    country: row.country,
  };
}

function rowToGuestSummary(row) {
  if (!row) return null;
  return {
    id: String(row.guest_id),
    firstName: row.guest_first_name,
    lastName: row.guest_last_name,
    email: row.guest_email_addr,
  };
}

export async function getBookings(filters = {}) {
  let sql = `
    SELECT b.*,
           r.id AS room_id, r.name AS room_name, r.room_type_id AS room_type_id, r.price AS room_price,
           r.capacity AS room_capacity, r.amenities AS room_amenities, r.image AS room_image, r.available AS room_available,
           h.id AS hotel_id, h.hotel_code AS hotel_code, h.hotel_name AS hotel_name, h.city AS hotel_city, h.country AS hotel_country,
           g.id AS g_id, g.first_name AS guest_first_name, g.last_name AS guest_last_name, g.email AS guest_email_addr
    FROM bookings b
    JOIN rooms r ON r.id = b.room_id
    LEFT JOIN hotels h ON h.id = b.hotel_id
    LEFT JOIN guests g ON g.id = b.guest_id
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
  if (filters.hotelId) {
    sql += ' AND b.hotel_id = ?';
    params.push(filters.hotelId);
  }
  if (filters.guestEmail) {
    sql += ' AND (b.guest_email = ? OR g.email = ?)';
    params.push(filters.guestEmail, filters.guestEmail);
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
    const hotel = row.hotel_id ? rowToHotel({
      id: row.hotel_id,
      hotel_code: row.hotel_code,
      hotel_name: row.hotel_name,
      city: row.hotel_city,
      country: row.hotel_country,
    }) : null;
    const guest = row.g_id ? rowToGuestSummary(row) : null;
    return rowToBooking(row, room, hotel, guest);
  });
}

export async function getBookingById(id) {
  const result = await query(
    `SELECT b.*,
            r.id AS room_id, r.name AS room_name, r.room_type_id AS room_type_id, r.price AS room_price,
            r.capacity AS room_capacity, r.amenities AS room_amenities, r.image AS room_image, r.available AS room_available,
            h.id AS hotel_id, h.hotel_code AS hotel_code, h.hotel_name AS hotel_name, h.city AS hotel_city, h.country AS hotel_country,
            g.id AS g_id, g.first_name AS guest_first_name, g.last_name AS guest_last_name, g.email AS guest_email_addr
     FROM bookings b
     JOIN rooms r ON r.id = b.room_id
     LEFT JOIN hotels h ON h.id = b.hotel_id
     LEFT JOIN guests g ON g.id = b.guest_id
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
  const hotel = row.hotel_id ? rowToHotel({
    id: row.hotel_id,
    hotel_code: row.hotel_code,
    hotel_name: row.hotel_name,
    city: row.hotel_city,
    country: row.hotel_country,
  }) : null;
  const guest = row.g_id ? rowToGuestSummary(row) : null;
  return rowToBooking(row, room, hotel, guest);
}

export async function createBooking(data) {
  const {
    roomId,
    hotelId,
    guestId,
    guestName,
    guestEmail,
    checkIn,
    checkOut,
    guests,
    bookingDate,
    bookingTime,
    arrivalDate,
    departureDate,
    estArrivalTime,
    estDepartureTime,
    numAdults,
    numChildren,
    specialReq,
  } = data;
  const arrDate = arrivalDate || checkIn;
  const depDate = departureDate || checkOut;
  await query(
    `INSERT INTO bookings (
      room_id, hotel_id, guest_id, guest_name, guest_email, check_in, check_out, guests, status,
      booking_date, booking_time, arrival_date, departure_date, est_arrival_time, est_departure_time,
      num_adults, num_children, special_req
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      roomId,
      hotelId || null,
      guestId || null,
      guestName || '',
      guestEmail || '',
      checkIn || arrDate,
      checkOut || depDate,
      guests != null ? guests : 1,
      bookingDate || null,
      bookingTime || null,
      arrDate || null,
      depDate || null,
      estArrivalTime || null,
      estDepartureTime || null,
      numAdults != null ? numAdults : null,
      numChildren != null ? numChildren : null,
      specialReq || null,
    ]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  return getBookingById(newId);
}

async function getRoomForBooking(roomId) {
  const r = await query('SELECT * FROM rooms WHERE id = ?', [roomId]);
  const row = r.rows[0];
  if (!row) return null;
  return rowToRoom(row);
}

export async function updateBookingStatus(id, status) {
  await query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  return getBookingById(id);
}

export async function updateBooking(id, data) {
  const allowed = [
    'hotel_id',
    'guest_id',
    'guest_name',
    'guest_email',
    'booking_date',
    'booking_time',
    'arrival_date',
    'departure_date',
    'est_arrival_time',
    'est_departure_time',
    'num_adults',
    'num_children',
    'special_req',
    'status',
    'check_in',
    'check_out',
    'guests',
  ];
  const entries = Object.entries(data || {}).filter(
    ([key, value]) => allowed.includes(key) && value !== undefined
  );
  if (!entries.length) return getBookingById(id);
  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  const values = entries.map(([, v]) => (v === null || v === '' ? null : v));
  values.push(id);
  await query(`UPDATE bookings SET ${sets} WHERE id = ?`, values);
  return getBookingById(id);
}

export async function deleteBooking(id) {
  const result = await query('DELETE FROM bookings WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}
