import { query } from './client.js';

function rowToInvoice(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    checkin_id: row.checkin_id,
    room_charge: Number(row.room_charge),
    service_charge: Number(row.service_charge),
    total_amount: Number(row.total_amount),
    created_at: row.created_at,
    customer_name: row.customer_name ?? null,
    customer_email: row.customer_email ?? null,
    reservation_id: row.reservation_id ?? null,
  };
}

export async function getInvoices() {
  const result = await query(
    `SELECT i.id,
            i.checkin_id,
            i.room_charge,
            i.service_charge,
            i.total_amount,
            i.created_at,
            ci.reservation_id,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM invoices i
     LEFT JOIN checkins ci ON ci.id = i.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     ORDER BY i.created_at DESC`
  );
  return result.rows.map(rowToInvoice);
}

export async function createInvoice({ checkin_id, room_charge, service_charge, total_amount }) {
  const room = room_charge != null ? Number(room_charge) : 0;
  const service = service_charge != null ? Number(service_charge) : 0;
  const total = total_amount != null ? Number(total_amount) : room + service;
  await query(
    `INSERT INTO invoices (checkin_id, room_charge, service_charge, total_amount)
     VALUES (?, ?, ?, ?)`,
    [Number(checkin_id), room, service, total]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT i.id,
            i.checkin_id,
            i.room_charge,
            i.service_charge,
            i.total_amount,
            i.created_at,
            ci.reservation_id,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM invoices i
     LEFT JOIN checkins ci ON ci.id = i.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE i.id = ?`,
    [newId]
  );
  return rowToInvoice(result.rows[0]);
}

export async function deleteInvoice(id) {
  const result = await query('DELETE FROM invoices WHERE id = ?', [id]);
  return !!result.affectedRows;
}

