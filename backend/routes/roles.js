import { Router } from 'express';
import * as rolesDb from '../db/roles.js';

export const rolesRouter = Router();

// List roles
rolesRouter.get('/', async (_req, res) => {
  try {
    const list = await rolesDb.getRoles();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Create role
rolesRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body ?? {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Role name is required.' });
    }
    const role = await rolesDb.createRole({ name });
    res.status(201).json(role);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Role name already exists.' });
    }
    res.status(500).json({ error: 'Failed to create role' });
  }
});

// Update role
rolesRouter.put('/:id', async (req, res) => {
  try {
    const { name } = req.body ?? {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Role name is required.' });
    }
    const role = await rolesDb.updateRole(req.params.id, { name });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Role name already exists.' });
    }
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// Delete role
rolesRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await rolesDb.deleteRole(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Role not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete role' });
  }
});

