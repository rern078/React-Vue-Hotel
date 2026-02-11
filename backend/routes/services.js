import { Router } from 'express';
import * as servicesDb from '../db/services.js';

export const servicesRouter = Router();

// List services
servicesRouter.get('/', async (_req, res) => {
  try {
    const list = await servicesDb.getServices();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Create service
servicesRouter.post('/', async (req, res) => {
  try {
    const { service_name, price, status } = req.body ?? {};
    if (!service_name || !String(service_name).trim()) {
      return res.status(400).json({ error: 'Service name is required.' });
    }
    const service = await servicesDb.createService({ service_name, price, status });
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service
servicesRouter.put('/:id', async (req, res) => {
  try {
    const { service_name, price, status } = req.body ?? {};
    const updated = await servicesDb.updateService(req.params.id, { service_name, price, status });
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
servicesRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await servicesDb.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Service not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

