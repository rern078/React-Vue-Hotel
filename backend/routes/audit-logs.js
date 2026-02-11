import { Router } from 'express';
import * as auditLogsDb from '../db/audit-logs.js';

export const auditLogsRouter = Router();

auditLogsRouter.get('/', async (_req, res) => {
  try {
    const list = await auditLogsDb.getAuditLogs();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

auditLogsRouter.post('/', async (req, res) => {
  try {
    const { user_id, action } = req.body ?? {};
    if (!action) {
      return res.status(400).json({ error: 'action is required.' });
    }
    const created = await auditLogsDb.createAuditLog({
      user_id: user_id ?? null,
      action,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create audit log' });
  }
});

auditLogsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await auditLogsDb.deleteAuditLog(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Audit log not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete audit log' });
  }
});

