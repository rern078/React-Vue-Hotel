import { query } from './client.js';

function rowToCheckin(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    reservation_id: row.reservation_id,
    checkin_datetime: row.checkin_datetime,
    checkout_datetime: row.checkout_datetime,
    status: row.status,
    customer_name: row.customer_name ?? null,
    customer_email: row.customer_email ?? null,
  };
}

export async function getCheckins(filters = {}) {
  let sql = `
    SELECT ci.id,
           ci.reservation_id,
           ci.checkin_datetime,
           ci.checkout_datetime,
           ci.status,
           c.full_name AS customer_name,
           c.email AS customer_email
    FROM checkins ci
    LEFT JOIN reservations r ON r.id = ci.reservation_id
    LEFT JOIN customers c ON c.id = r.customer_id
    WHERE 1=1
  `;
  const params = [];
  if (filters.status) {
    sql += ' AND ci.status = ?';
    params.push(filters.status);
  }
  sql += ' ORDER BY ci.checkin_datetime DESC';
  const result = await query(sql, params);
  return result.rows.map(rowToCheckin);
}

export async function getCheckinById(id) {
  const result = await query(
    `SELECT ci.id,
            ci.reservation_id,
            ci.checkin_datetime,
            ci.checkout_datetime,
            ci.status,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM checkins ci
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE ci.id = ?`,
    [id]
  );
  return rowToCheckin(result.rows[0]);
}

export async function createCheckin({ reservation_id, checkin_datetime, status = 'CheckedIn' }) {
  if (checkin_datetime) {
    await query(
      `INSERT INTO checkins (reservation_id, checkin_datetime, status)
       VALUES (?, ?, ?)`,
      [Number(reservation_id), checkin_datetime, status]
    );
  } else {
    await query(
      `INSERT INTO checkins (reservation_id, status)
       VALUES (?, ?)`,
      [Number(reservation_id), status]
    );
  }
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  return getCheckinById(newId);
}

export async function updateCheckin(id, { checkout_datetime, status }) {
  const fields = [];
  const params = [];
  if (checkout_datetime !== undefined) {
    fields.push('checkout_datetime = ?');
    params.push(checkout_datetime);
  }
  if (status !== undefined) {
    fields.push('status = ?');
    params.push(status);
  }
  if (!fields.length) return getCheckinById(id);
  params.push(id);
  await query(`UPDATE checkins SET ${fields.join(', ')} WHERE id = ?`, params);
  return getCheckinById(id);
}

export async function deleteCheckin(id) {
  const result = await query('DELETE FROM checkins WHERE id = ?', [id]);
  return !!result.affectedRows;
}

