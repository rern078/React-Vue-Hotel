import { Router } from 'express';
import * as paymentsDb from '../db/payments.js';

export const paymentsRouter = Router();

paymentsRouter.get('/', async (_req, res) => {
  try {
    const list = await paymentsDb.getPayments();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

paymentsRouter.post('/', async (req, res) => {
  try {
    const { invoice_id, payment_method, amount } = req.body ?? {};
    if (!invoice_id || !payment_method || amount == null) {
      return res.status(400).json({ error: 'invoice_id, payment_method and amount are required.' });
    }
    const created = await paymentsDb.createPayment({
      invoice_id,
      payment_method: String(payment_method).trim(),
      amount,
    });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

paymentsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await paymentsDb.deletePayment(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Payment not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
});

