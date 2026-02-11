import { Router } from 'express';
import * as serviceOrdersDb from '../db/service-orders.js';

export const serviceOrdersRouter = Router();

serviceOrdersRouter.get('/', async (_req, res) => {
  try {
    const list = await serviceOrdersDb.getServiceOrders();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch service orders' });
  }
});

serviceOrdersRouter.post('/', async (req, res) => {
  try {
    const { checkin_id, service_id, quantity, total_price } = req.body ?? {};
    if (!checkin_id || !service_id) {
      return res.status(400).json({ error: 'checkin_id and service_id are required.' });
    }
    const created = await serviceOrdersDb.createServiceOrder({
      checkin_id,
      service_id,
      quantity,
      total_price,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service order' });
  }
});

serviceOrdersRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await serviceOrdersDb.deleteServiceOrder(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Service order not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete service order' });
  }
});

