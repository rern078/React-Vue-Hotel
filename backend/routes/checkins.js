import { Router } from 'express';
import * as checkinsDb from '../db/checkins.js';

export const checkinsRouter = Router();

checkinsRouter.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const list = await checkinsDb.getCheckins({ status });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch check-ins' });
  }
});

checkinsRouter.post('/', async (req, res) => {
  try {
    const { reservation_id, checkin_datetime, status } = req.body ?? {};
    if (!reservation_id) {
      return res.status(400).json({ error: 'reservation_id is required.' });
    }
    const checkin = await checkinsDb.createCheckin({
      reservation_id,
      checkin_datetime,
      status,
    });
    res.status(201).json(checkin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create check-in' });
  }
});

checkinsRouter.patch('/:id', async (req, res) => {
  try {
    const { checkout_datetime, status } = req.body ?? {};
    const updated = await checkinsDb.updateCheckin(req.params.id, { checkout_datetime, status });
    if (!updated) return res.status(404).json({ error: 'Check-in not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update check-in' });
  }
});

checkinsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await checkinsDb.deleteCheckin(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Check-in not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete check-in' });
  }
});

