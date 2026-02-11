import { Router } from 'express';
import * as invoicesDb from '../db/invoices.js';

export const invoicesRouter = Router();

invoicesRouter.get('/', async (_req, res) => {
  try {
    const list = await invoicesDb.getInvoices();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

invoicesRouter.post('/', async (req, res) => {
  try {
    const { checkin_id, room_charge, service_charge, total_amount } = req.body ?? {};
    if (!checkin_id) {
      return res.status(400).json({ error: 'checkin_id is required.' });
    }
    const created = await invoicesDb.createInvoice({
      checkin_id,
      room_charge,
      service_charge,
      total_amount,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

invoicesRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await invoicesDb.deleteInvoice(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Invoice not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

