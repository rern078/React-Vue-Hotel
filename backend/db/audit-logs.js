import { query } from './client.js';

function rowToAuditLog(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    user_id: row.user_id,
    action: row.action,
    log_date: row.log_date,
    user_name: row.user_name ?? null,
    user_email: row.user_email ?? null,
  };
}

export async function getAuditLogs() {
  const result = await query(
    `SELECT l.id,
            l.user_id,
            l.action,
            l.log_date,
            u.name AS user_name,
            u.email AS user_email
     FROM audit_logs l
     LEFT JOIN users u ON u.id = l.user_id
     ORDER BY l.log_date DESC, l.id DESC`
  );
  return result.rows.map(rowToAuditLog);
}

export async function createAuditLog({ user_id, action }) {
  await query(
    `INSERT INTO audit_logs (user_id, action)
     VALUES (?, ?)`,
    [user_id != null ? Number(user_id) : null, String(action).trim()]
  );
  const lastId = await query('SELECT LAST_INSERT_ID() AS id');
  const newId = lastId.rows[0]?.id;
  if (!newId) return null;
  const result = await query(
    `SELECT l.id,
            l.user_id,
            l.action,
            l.log_date,
            u.name AS user_name,
            u.email AS user_email
     FROM audit_logs l
     LEFT JOIN users u ON u.id = l.user_id
     WHERE l.id = ?`,
    [newId]
  );
  return rowToAuditLog(result.rows[0]);
}

export async function deleteAuditLog(id) {
  const result = await query('DELETE FROM audit_logs WHERE id = ?', [id]);
  return !!result.affectedRows;
}

