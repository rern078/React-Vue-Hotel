import { Router } from 'express';
import * as bookingsDb from '../db/bookings.js';

export const bookingsRouter = Router();

bookingsRouter.get('/', async (req, res) => {
  try {
    const { status, roomId, guestEmail } = req.query;
    const list = await bookingsDb.getBookings({ status, roomId, guestEmail });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

bookingsRouter.get('/:id', async (req, res) => {
  try {
    const booking = await bookingsDb.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

bookingsRouter.post('/', async (req, res) => {
  const { roomId, guestName, guestEmail, checkIn, checkOut, guests } = req.body;
  if (!roomId || !guestName || !guestEmail || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const booking = await bookingsDb.createBooking({
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

bookingsRouter.patch('/:id', async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Missing status' });
  try {
    const booking = await bookingsDb.updateBookingStatus(req.params.id, status);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

bookingsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await bookingsDb.deleteBooking(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Booking not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});
