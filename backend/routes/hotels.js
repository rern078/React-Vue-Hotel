import { Router } from 'express';
import * as hotelsDb from '../db/hotels.js';

export const hotelsRouter = Router();

hotelsRouter.get('/', async (_req, res) => {
  try {
    const list = await hotelsDb.getHotels();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

hotelsRouter.get('/:id', async (req, res) => {
  try {
    const hotel = await hotelsDb.getHotelById(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
});

hotelsRouter.post('/', async (req, res) => {
  try {
    const {
      hotelCode,
      hotelName,
      address,
      postcode,
      city,
      country,
      numRooms,
      phoneNo,
      starRating,
    } = req.body ?? {};
    if (!hotelCode?.trim() || !hotelName?.trim()) {
      return res.status(400).json({ error: 'Hotel code and hotel name are required.' });
    }
    const hotel = await hotelsDb.createHotel({
      hotelCode,
      hotelName,
      address,
      postcode,
      city,
      country,
      numRooms,
      phoneNo,
      starRating,
    });
    res.status(201).json(hotel);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Hotel code already exists.' });
    }
    res.status(500).json({ error: err.message || 'Failed to create hotel' });
  }
});

hotelsRouter.put('/:id', async (req, res) => {
  try {
    const {
      hotelCode,
      hotelName,
      address,
      postcode,
      city,
      country,
      numRooms,
      phoneNo,
      starRating,
    } = req.body ?? {};
    const updated = await hotelsDb.updateHotel(req.params.id, {
      hotel_code: hotelCode,
      hotel_name: hotelName,
      address,
      postcode,
      city,
      country,
      num_rooms: numRooms,
      phone_no: phoneNo,
      star_rating: starRating,
    });
    if (!updated) return res.status(404).json({ error: 'Hotel not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Hotel code already exists.' });
    }
    res.status(500).json({ error: err.message || 'Failed to update hotel' });
  }
});

hotelsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await hotelsDb.deleteHotel(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Hotel not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
});
