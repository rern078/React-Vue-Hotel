import bcrypt from 'bcryptjs';
import { query } from './client.js';

const SALT_ROUNDS = 10;

function rowToGuest(row, booking = null) {
  if (!row) return null;
  const g = {
    id: String(row.id),
    bookingId: String(row.booking_id),
    guestTitle: row.guest_title,
    firstName: row.first_name,
    lastName: row.last_name,
    dob: row.dob ? String(row.dob).slice(0, 10) : null,
    gender: row.gender,
    phoneNo: row.phone_no,
    email: row.email,
    passportNo: row.passport_no,
    address: row.address,
    postcode: row.postcode,
    city: row.city,
    country: row.country,
    createdAt: row.created_at,
  };
  if (booking) g.booking = booking;
  return g;
}

export async function getGuests(filters = {}) {
  let sql = `
    SELECT g.*, b.id AS b_id, b.room_id AS b_room_id, b.guest_name AS b_guest_name, b.guest_email AS b_guest_email,
           b.check_in AS b_check_in, b.check_out AS b_check_out, b.guests AS b_guests, b.status AS b_status
    FROM guests g
    JOIN bookings b ON b.id = g.booking_id
    WHERE 1=1
  `;
  const params = [];
  if (filters.bookingId) {
    sql += ' AND g.booking_id = ?';
    params.push(filters.bookingId);
  }
  if (filters.email) {
    sql += ' AND g.email = ?';
    params.push(filters.email);
  }
  sql += ' ORDER BY g.id';
  const result = await query(sql, params);
  return result.rows.map((row) => {
    const booking = {
      id: String(row.b_id),
      roomId: String(row.b_room_id),
      guestName: row.b_guest_name,
      guestEmail: row.b_guest_email,
      checkIn: row.b_check_in ? String(row.b_check_in).slice(0, 10) : null,
      checkOut: row.b_check_out ? String(row.b_check_out).slice(0, 10) : null,
      guests: row.b_guests,
      status: row.b_status,
    };
    return rowToGuest(
      {
        id: row.id,
        booking_id: row.booking_id,
        guest_title: row.guest_title,
        first_name: row.first_name,
        last_name: row.last_name,
        dob: row.dob,
        gender: row.gender,
        phone_no: row.phone_no,
        email: row.email,
        passport_no: row.passport_no,
        address: row.address,
        postcode: row.postcode,
        city: row.city,
        country: row.country,
        created_at: row.created_at,
      },
      booking
    );
  });
}

export async function getGuestById(id) {
  const result = await query(
    `SELECT g.*, b.id AS b_id, b.room_id AS b_room_id, b.guest_name AS b_guest_name, b.guest_email AS b_guest_email,
            b.check_in AS b_check_in, b.check_out AS b_check_out, b.guests AS b_guests, b.status AS b_status
     FROM guests g
     JOIN bookings b ON b.id = g.booking_id
     WHERE g.id = ?`,
    [id]
  );
  const row = result.rows[0];
  if (!row) return null;
  const booking = {
    id: String(row.b_id),
    roomId: String(row.b_room_id),
    guestName: row.b_guest_name,
    guestEmail: row.b_guest_email,
    checkIn: row.b_check_in ? String(row.b_check_in).slice(0, 10) : null,
    checkOut: row.b_check_out ? String(row.b_check_out).slice(0, 10) : null,
    guests: row.b_guests,
    status: row.b_status,
  };
  return rowToGuest(
    {
      id: row.id,
      booking_id: row.booking_id,
      guest_title: row.guest_title,
      first_name: row.first_name,
      last_name: row.last_name,
      dob: row.dob,
      gender: row.gender,
      phone_no: row.phone_no,
      email: row.email,
      passport_no: row.passport_no,
      address: row.address,
      postcode: row.postcode,
      city: row.city,
      country: row.country,
      created_at: row.created_at,
    },
    booking
  );
}

export async function createGuest(data) {
  const {
    bookingId,
    guestTitle,
    firstName,
    lastName,
    dob,
    gender,
    phoneNo,
    email,
    password,
    passportNo,
    address,
    postcode,
    city,
    country,
  } = data;
  const passwordHash = password ? await bcrypt.hash(password, SALT_ROUNDS) : null;
  const result = await query(
    `INSERT INTO guests (booking_id, guest_title, first_name, last_name, dob, gender, phone_no, email, password_hash, passport_no, address, postcode, city, country)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      bookingId,
      guestTitle || null,
      (firstName || '').trim(),
      (lastName || '').trim(),
      dob || null,
      gender || null,
      phoneNo || null,
      email ? String(email).trim().toLowerCase() : null,
      passwordHash,
      passportNo || null,
      address || null,
      postcode || null,
      city || null,
      country || null,
    ]
  );
  const newId = result.insertId || result.rows?.[0]?.id;
  if (!newId) {
    const lastId = await query('SELECT LAST_INSERT_ID() AS id');
    const id = lastId.rows[0]?.id;
    if (!id) return null;
    return getGuestById(id);
  }
  return getGuestById(newId);
}

export async function updateGuest(id, fields) {
  const allowed = [
    'guest_title',
    'first_name',
    'last_name',
    'dob',
    'gender',
    'phone_no',
    'email',
    'passport_no',
    'address',
    'postcode',
    'city',
    'country',
  ];
  const entries = Object.entries(fields || {}).filter(
    ([key, value]) => allowed.includes(key) && value !== undefined
  );
  if (!entries.length) return getGuestById(id);

  const sets = [];
  const values = [];
  for (const [key, value] of entries) {
    sets.push(`${key} = ?`);
    values.push(value === null || value === '' ? null : value);
  }
  values.push(id);
  await query(`UPDATE guests SET ${sets.join(', ')} WHERE id = ?`, values);
  return getGuestById(id);
}

export async function updateGuestPassword(id, password) {
  if (!password) return getGuestById(id);
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await query('UPDATE guests SET password_hash = ? WHERE id = ?', [passwordHash, id]);
  return getGuestById(id);
}

export async function deleteGuest(id) {
  const result = await query('DELETE FROM guests WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}
