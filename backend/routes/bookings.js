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
  const {
    roomId,
    hotelId,
    guestId,
    guestName,
    guestEmail,
    checkIn,
    checkOut,
    guests,
    bookingDate,
    bookingTime,
    arrivalDate,
    departureDate,
    estArrivalTime,
    estDepartureTime,
    numAdults,
    numChildren,
    specialReq,
  } = req.body ?? {};
  if (!roomId || (!guestName && !guestEmail && !guestId)) {
    return res.status(400).json({ error: 'Room and guest (name/email or guestId) are required.' });
  }
  const arrival = arrivalDate || checkIn;
  const departure = departureDate || checkOut;
  if (!arrival || !departure) {
    return res.status(400).json({ error: 'Check-in and check-out (or arrival/departure dates) are required.' });
  }
  try {
    const booking = await bookingsDb.createBooking({
      roomId,
      hotelId,
      guestId,
      guestName,
      guestEmail,
      checkIn: arrival,
      checkOut: departure,
      guests,
      bookingDate,
      bookingTime,
      arrivalDate: arrival,
      departureDate: departure,
      estArrivalTime,
      estDepartureTime,
      numAdults,
      numChildren,
      specialReq,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to create booking' });
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

bookingsRouter.put('/:id', async (req, res) => {
  try {
    const {
      hotelId,
      guestId,
      guestName,
      guestEmail,
      bookingDate,
      bookingTime,
      arrivalDate,
      departureDate,
      estArrivalTime,
      estDepartureTime,
      numAdults,
      numChildren,
      specialReq,
      status,
      checkIn,
      checkOut,
      guests,
    } = req.body ?? {};
    const updated = await bookingsDb.updateBooking(req.params.id, {
      hotel_id: hotelId,
      guest_id: guestId,
      guest_name: guestName,
      guest_email: guestEmail,
      booking_date: bookingDate,
      booking_time: bookingTime,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      est_arrival_time: estArrivalTime,
      est_departure_time: estDepartureTime,
      num_adults: numAdults,
      num_children: numChildren,
      special_req: specialReq,
      status,
      check_in: checkIn,
      check_out: checkOut,
      guests,
    });
    if (!updated) return res.status(404).json({ error: 'Booking not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to update booking' });
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
