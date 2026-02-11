import { query } from './client.js';

function rowToReservation(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    customer_id: row.customer_id,
    check_in_date: row.check_in_date,
    check_out_date: row.check_out_date,
    status: row.status,
    created_at: row.created_at,
    customer_name: row.customer_name ?? null,
    customer_email: row.customer_email ?? null,
  };
}

export async function getReservations(filters = {}) {
  let sql = `
    SELECT r.id,
           r.customer_id,
           r.check_in_date,
           r.check_out_date,
           r.status,
           r.created_at,
           c.full_name AS customer_name,
           c.email AS customer_email
    FROM reservations r
    LEFT JOIN customers c ON c.id = r.customer_id
    WHERE 1=1
  `;
  const params = [];
  if (filters.status) {
    sql += ' AND r.status = ?';
    params.push(filters.status);
  }
  if (filters.customerEmail) {
    sql += ' AND c.email = ?';
    params.push(filters.customerEmail);
  }
  sql += ' ORDER BY r.created_at DESC';
  const result = await query(sql, params);
  return result.rows.map(rowToReservation);
}

export async function getReservationById(id) {
  const result = await query(
    `SELECT r.id,
            r.customer_id,
            r.check_in_date,
            r.check_out_date,
            r.status,
            r.created_at,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM reservations r
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE r.id = ?`,
    [id]
  );
  return rowToReservation(result.rows[0]);
}

export async function createReservation({ customer_id, check_in_date, check_out_date, status = 'Pending' }) {
  await query(
    `INSERT INTO reservations (customer_id, check_in_date, check_out_date, status)
     VALUES (?, ?, ?, ?)`,
    [Number(customer_id), check_in_date, check_out_date, status]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  return getReservationById(newId);
}

export async function updateReservationStatus(id, status) {
  await query('UPDATE reservations SET status = ? WHERE id = ?', [status, id]);
  return getReservationById(id);
}

export async function deleteReservation(id) {
  const result = await query('DELETE FROM reservations WHERE id = ?', [id]);
  return (result.affectedRows || 0) > 0;
}

