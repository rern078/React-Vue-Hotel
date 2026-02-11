import { Router } from 'express';
import * as usersDb from '../db/users.js';

export const usersRouter = Router();

// List users
usersRouter.get('/', async (_req, res) => {
  try {
    const list = await usersDb.getUsers();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user (admin)
usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password, username, full_name, phone, role_id, status } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await usersDb.findByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    const user = await usersDb.createUser({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
      username,
      full_name,
      phone,
      role_id,
      status,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
usersRouter.put('/:id', async (req, res) => {
  try {
    const { name, username, full_name, email, phone, role_id, status } = req.body ?? {};
    const updated = await usersDb.updateUser(req.params.id, {
      name,
      username,
      full_name,
      email,
      phone,
      role_id,
      status,
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
usersRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await usersDb.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

