import { Router } from 'express';
import * as customersDb from '../db/customers.js';

export const customersRouter = Router();

// ---- Auth endpoints ----

// Customer registration
customersRouter.post('/register', async (req, res) => {
  try {
    const { full_name, gender, phone, email, id_card, address, password } = req.body ?? {};
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Full name, email and password are required.' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await customersDb.findByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const customer = await customersDb.createCustomer({
      full_name: String(full_name).trim(),
      gender,
      phone,
      email: normalizedEmail,
      id_card,
      address,
      password,
    });

    res.status(201).json({ customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Customer registration failed.' });
  }
});

// Customer login
customersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const row = await customersDb.findByEmail(String(email).trim().toLowerCase());
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const valid = await customersDb.verifyPassword(password, row.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const customer = {
      id: String(row.id),
      full_name: row.full_name,
      email: row.email,
      created_at: row.created_at,
    };
    res.json({ customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Customer login failed.' });
  }
});

// ---- Admin / management endpoints ----

// List customers
customersRouter.get('/', async (_req, res) => {
  try {
    const list = await customersDb.getCustomers();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Update customer (no password here)
customersRouter.put('/:id', async (req, res) => {
  try {
    const { full_name, gender, phone, email, id_card, address } = req.body ?? {};
    const updated = await customersDb.updateCustomer(req.params.id, {
      full_name,
      gender,
      phone,
      email,
      id_card,
      address,
    });
    if (!updated) return res.status(404).json({ error: 'Customer not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists for another customer.' });
    }
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// Delete customer
customersRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await customersDb.deleteCustomer(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

