import { query } from './client.js';

function rowToPayment(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    invoice_id: row.invoice_id,
    payment_method: row.payment_method,
    amount: Number(row.amount),
    payment_date: row.payment_date,
    customer_name: row.customer_name ?? null,
    customer_email: row.customer_email ?? null,
  };
}

export async function getPayments() {
  const result = await query(
    `SELECT p.id,
            p.invoice_id,
            p.payment_method,
            p.amount,
            p.payment_date,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM payments p
     LEFT JOIN invoices i ON i.id = p.invoice_id
     LEFT JOIN checkins ci ON ci.id = i.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     ORDER BY p.payment_date DESC`
  );
  return result.rows.map(rowToPayment);
}

export async function createPayment({ invoice_id, payment_method, amount }) {
  await query(
    `INSERT INTO payments (invoice_id, payment_method, amount)
     VALUES (?, ?, ?)`,
    [Number(invoice_id), payment_method, Number(amount)]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT p.id,
            p.invoice_id,
            p.payment_method,
            p.amount,
            p.payment_date,
            c.full_name AS customer_name,
            c.email AS customer_email
     FROM payments p
     LEFT JOIN invoices i ON i.id = p.invoice_id
     LEFT JOIN checkins ci ON ci.id = i.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE p.id = ?`,
    [newId]
  );
  return rowToPayment(result.rows[0]);
}

export async function deletePayment(id) {
  const result = await query('DELETE FROM payments WHERE id = ?', [id]);
  return !!result.affectedRows;
}

