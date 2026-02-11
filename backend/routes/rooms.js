import { Router } from 'express';
import * as roomsDb from '../db/rooms.js';

export const roomsRouter = Router();

roomsRouter.get('/', async (req, res) => {
  try {
    const { available, type } = req.query;
    const list = await roomsDb.getRooms({ available, type });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

roomsRouter.get('/:id', async (req, res) => {
  try {
    const room = await roomsDb.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

roomsRouter.post('/', async (req, res) => {
  try {
    const room = await roomsDb.createRoom(req.body);
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

roomsRouter.put('/:id', async (req, res) => {
  try {
    const room = await roomsDb.updateRoom(req.params.id, req.body);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update room' });
  }
});

roomsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await roomsDb.deleteRoom(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Room not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});
