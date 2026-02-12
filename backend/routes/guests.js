import { Router } from 'express';
import * as guestsDb from '../db/guests.js';

export const guestsRouter = Router();

// List guests (optional filter by bookingId or email)
guestsRouter.get('/', async (req, res) => {
  try {
    const { bookingId, email } = req.query;
    const list = await guestsDb.getGuests({ bookingId, email });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});

// Get one guest
guestsRouter.get('/:id', async (req, res) => {
  try {
    const guest = await guestsDb.getGuestById(req.params.id);
    if (!guest) return res.status(404).json({ error: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guest' });
  }
});

// Create guest
guestsRouter.post('/', async (req, res) => {
  try {
    const {
      bookingId,
      guestTitle,
      firstName,
      lastName,
      dob,
      gender,
      phoneNo,
      email,
      password,
      passportNo,
      address,
      postcode,
      city,
      country,
    } = req.body ?? {};
    if (!bookingId || !firstName?.trim() || !lastName?.trim()) {
      return res.status(400).json({ error: 'Booking ID, first name and last name are required.' });
    }
    const guest = await guestsDb.createGuest({
      bookingId,
      guestTitle,
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      dob,
      gender,
      phoneNo,
      email,
      password,
      passportNo,
      address,
      postcode,
      city,
      country,
    });
    res.status(201).json(guest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to create guest' });
  }
});

// Update guest
guestsRouter.put('/:id', async (req, res) => {
  try {
    const {
      guestTitle,
      firstName,
      lastName,
      dob,
      gender,
      phoneNo,
      email,
      passportNo,
      address,
      postcode,
      city,
      country,
    } = req.body ?? {};
    const updated = await guestsDb.updateGuest(req.params.id, {
      guest_title: guestTitle,
      first_name: firstName,
      last_name: lastName,
      dob,
      gender,
      phone_no: phoneNo,
      email,
      passport_no: passportNo,
      address,
      postcode,
      city,
      country,
    });
    if (!updated) return res.status(404).json({ error: 'Guest not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to update guest' });
  }
});

// Delete guest
guestsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await guestsDb.deleteGuest(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Guest not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete guest' });
  }
});
