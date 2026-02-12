import { query } from './client.js';

function rowToHotel(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    hotelCode: row.hotel_code,
    hotelName: row.hotel_name,
    address: row.address,
    postcode: row.postcode,
    city: row.city,
    country: row.country,
    numRooms: row.num_rooms,
    phoneNo: row.phone_no,
    starRating: row.star_rating != null ? Number(row.star_rating) : null,
    createdAt: row.created_at,
  };
}

export async function getHotels() {
  const result = await query('SELECT * FROM hotels ORDER BY hotel_code ASC');
  return result.rows.map(rowToHotel);
}

export async function getHotelById(id) {
  const result = await query('SELECT * FROM hotels WHERE id = ?', [id]);
  return rowToHotel(result.rows[0]);
}

export async function getHotelByCode(hotelCode) {
  const result = await query('SELECT * FROM hotels WHERE hotel_code = ?', [hotelCode]);
  return rowToHotel(result.rows[0]);
}

export async function createHotel(data) {
  const {
    hotelCode,
    hotelName,
    address,
    postcode,
    city,
    country,
    numRooms,
    phoneNo,
    starRating,
  } = data;
  const result = await query(
    `INSERT INTO hotels (hotel_code, hotel_name, address, postcode, city, country, num_rooms, phone_no, star_rating)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      (hotelCode || '').trim(),
      (hotelName || '').trim(),
      address || null,
      postcode || null,
      city || null,
      country || null,
      numRooms != null ? Number(numRooms) : null,
      phoneNo || null,
      starRating != null ? Number(starRating) : null,
    ]
  );
  const newId = result.insertId;
  if (!newId) return null;
  return getHotelById(newId);
}

export async function updateHotel(id, data) {
  const allowed = [
    'hotel_code',
    'hotel_name',
    'address',
    'postcode',
    'city',
    'country',
    'num_rooms',
    'phone_no',
    'star_rating',
  ];
  const entries = Object.entries(data || {}).filter(
    ([key, value]) => allowed.includes(key) && value !== undefined
  );
  if (!entries.length) return getHotelById(id);
  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  const values = entries.map(([, v]) => (v === null || v === '' ? null : v));
  values.push(id);
  await query(`UPDATE hotels SET ${sets} WHERE id = ?`, values);
  return getHotelById(id);
}

export async function deleteHotel(id) {
  const result = await query('DELETE FROM hotels WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}
