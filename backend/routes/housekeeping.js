import { Router } from 'express';
import * as housekeepingDb from '../db/housekeeping.js';

export const housekeepingRouter = Router();

housekeepingRouter.get('/', async (_req, res) => {
  try {
    const list = await housekeepingDb.getHousekeeping();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch housekeeping records' });
  }
});

housekeepingRouter.post('/', async (req, res) => {
  try {
    const { room_id, staff_name, status, cleaned_date } = req.body ?? {};
    if (!room_id || !staff_name || !status) {
      return res.status(400).json({ error: 'room_id, staff_name and status are required.' });
    }
    const created = await housekeepingDb.createHousekeeping({
      room_id,
      staff_name: String(staff_name).trim(),
      status: String(status).trim(),
      cleaned_date,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create housekeeping record' });
  }
});

housekeepingRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await housekeepingDb.deleteHousekeeping(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Housekeeping record not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete housekeeping record' });
  }
});

