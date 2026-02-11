import { Router } from 'express';
import * as reservationRoomsDb from '../db/reservation-rooms.js';

export const reservationRoomsRouter = Router();

reservationRoomsRouter.get('/', async (_req, res) => {
  try {
    const list = await reservationRoomsDb.getReservationRooms();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reservation rooms' });
  }
});

reservationRoomsRouter.post('/', async (req, res) => {
  try {
    const { reservation_id, room_id, price } = req.body ?? {};
    if (!reservation_id || !room_id) {
      return res.status(400).json({ error: 'reservation_id and room_id are required.' });
    }
    const created = await reservationRoomsDb.createReservationRoom({ reservation_id, room_id, price });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create reservation room' });
  }
});

reservationRoomsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await reservationRoomsDb.deleteReservationRoom(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Reservation room not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete reservation room' });
  }
});

