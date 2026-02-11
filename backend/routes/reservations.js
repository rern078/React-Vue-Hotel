import { Router } from 'express';
import * as reservationsDb from '../db/reservations.js';

export const reservationsRouter = Router();

reservationsRouter.get('/', async (req, res) => {
  try {
    const { status, customerEmail } = req.query;
    const list = await reservationsDb.getReservations({ status, customerEmail });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

reservationsRouter.post('/', async (req, res) => {
  try {
    const { customer_id, check_in_date, check_out_date, status } = req.body ?? {};
    if (!customer_id || !check_in_date || !check_out_date) {
      return res.status(400).json({ error: 'customer_id, check_in_date and check_out_date are required.' });
    }
    const reservation = await reservationsDb.createReservation({
      customer_id,
      check_in_date,
      check_out_date,
      status,
    });
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

reservationsRouter.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body ?? {};
    if (!status) return res.status(400).json({ error: 'Missing status' });
    const reservation = await reservationsDb.updateReservationStatus(req.params.id, status);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update reservation' });
  }
});

reservationsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await reservationsDb.deleteReservation(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Reservation not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

