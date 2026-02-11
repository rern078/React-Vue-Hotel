import { query } from './client.js';

function rowToServiceOrder(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    checkin_id: row.checkin_id,
    service_id: row.service_id,
    quantity: row.quantity,
    total_price: Number(row.total_price),
    order_date: row.order_date,
    service_name: row.service_name ?? null,
    customer_name: row.customer_name ?? null,
  };
}

export async function getServiceOrders() {
  const result = await query(
    `SELECT so.id,
            so.checkin_id,
            so.service_id,
            so.quantity,
            so.total_price,
            so.order_date,
            s.service_name,
            c.full_name AS customer_name
     FROM service_orders so
     LEFT JOIN services s ON s.id = so.service_id
     LEFT JOIN checkins ci ON ci.id = so.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     ORDER BY so.order_date DESC`
  );
  return result.rows.map(rowToServiceOrder);
}

export async function createServiceOrder({ checkin_id, service_id, quantity, total_price }) {
  const qty = quantity != null ? Number(quantity) : 1;
  const total = total_price != null ? Number(total_price) : 0;
  await query(
    `INSERT INTO service_orders (checkin_id, service_id, quantity, total_price)
     VALUES (?, ?, ?, ?)`,
    [Number(checkin_id), Number(service_id), qty, total]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT so.id,
            so.checkin_id,
            so.service_id,
            so.quantity,
            so.total_price,
            so.order_date,
            s.service_name,
            c.full_name AS customer_name
     FROM service_orders so
     LEFT JOIN services s ON s.id = so.service_id
     LEFT JOIN checkins ci ON ci.id = so.checkin_id
     LEFT JOIN reservations r ON r.id = ci.reservation_id
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE so.id = ?`,
    [newId]
  );
  return rowToServiceOrder(result.rows[0]);
}

export async function deleteServiceOrder(id) {
  const result = await query('DELETE FROM service_orders WHERE id = ?', [id]);
  return !!result.affectedRows;
}

