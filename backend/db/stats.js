import { query } from './client.js';

/** Safe read of a count from a row (MySQL may return different column name casing). */
function num(row, key) {
  if (!row) return 0;
  const v = row[key] ?? row[key.toUpperCase()];
  return Number(v) || 0;
}

export async function getStats() {
  const result = await query(`
    SELECT
      (SELECT COUNT(*) FROM rooms) AS total_rooms,
      (SELECT COUNT(*) FROM rooms WHERE available = 1) AS available_rooms,
      (SELECT COUNT(*) FROM bookings) AS total_bookings,
      (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') AS confirmed_bookings,
      (SELECT COUNT(*) FROM bookings WHERE status = 'pending') AS pending_bookings
  `);
  const row = result.rows[0];
  return {
    totalRooms: num(row, 'total_rooms'),
    availableRooms: num(row, 'available_rooms'),
    totalBookings: num(row, 'total_bookings'),
    confirmedBookings: num(row, 'confirmed_bookings'),
    pendingBookings: num(row, 'pending_bookings'),
  };
}
