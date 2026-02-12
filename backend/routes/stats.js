import { Router } from 'express';
import { getStats } from '../db/stats.js';

export const statsRouter = Router();

statsRouter.get('/', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (err) {
    console.error('Stats error:', err.message);
    // If tables don't exist yet, return zeros so the UI still loads
    if (err.code === 'ER_NO_SUCH_TABLE' || err.message?.includes("doesn't exist")) {
      return res.json({
        totalRooms: 0,
        availableRooms: 0,
        totalBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        totalGuests: 0,
        totalHotels: 0,
      });
    }
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
