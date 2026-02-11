import { Router } from 'express';
import * as roomTypesDb from '../db/room-types.js';

export const roomTypesRouter = Router();

// List room types
roomTypesRouter.get('/', async (_req, res) => {
  try {
    const list = await roomTypesDb.getRoomTypes();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch room types' });
  }
});

// Create room type
roomTypesRouter.post('/', async (req, res) => {
  try {
    const { type_name, description, price, max_person } = req.body ?? {};
    if (!type_name || !String(type_name).trim()) {
      return res.status(400).json({ error: 'Type name is required.' });
    }
    const created = await roomTypesDb.createRoomType({
      type_name,
      description,
      price,
      max_person,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create room type' });
  }
});

// Update room type
roomTypesRouter.put('/:id', async (req, res) => {
  try {
    const updated = await roomTypesDb.updateRoomType(req.params.id, req.body ?? {});
    if (!updated) return res.status(404).json({ error: 'Room type not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update room type' });
  }
});

// Delete room type
roomTypesRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await roomTypesDb.deleteRoomType(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Room type not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete room type' });
  }
});

