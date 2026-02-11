import { Router } from 'express';
import * as usersDb from '../db/users.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    });
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const row = await usersDb.findByEmail(String(email).trim().toLowerCase());
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const valid = await usersDb.verifyPassword(password, row.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const user = {
      id: String(row.id),
      name: row.name,
      email: row.email,
      created_at: row.created_at,
    };
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed.' });
  }
});
