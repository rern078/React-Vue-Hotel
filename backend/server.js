// Load .env from backend folder (so it works even if you run from project root)
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: path.join(__dirname, '.env') });
} catch (_) {}
import express from 'express';
import cors from 'cors';
import { pool } from './db/client.js';
import { ensureTables } from './db/ensure-tables.js';
import { roomsRouter } from './routes/rooms.js';
import { bookingsRouter } from './routes/bookings.js';
import { statsRouter } from './routes/stats.js';
import { authRouter } from './routes/auth.js';
import { customersRouter } from './routes/customers.js';
import { rolesRouter } from './routes/roles.js';
import { usersRouter } from './routes/users.js';
import { roomTypesRouter } from './routes/room-types.js';
import { reservationsRouter } from './routes/reservations.js';
import { reservationRoomsRouter } from './routes/reservation-rooms.js';
import { checkinsRouter } from './routes/checkins.js';
import { servicesRouter } from './routes/services.js';
import { serviceOrdersRouter } from './routes/service-orders.js';
import { invoicesRouter } from './routes/invoices.js';
import { paymentsRouter } from './routes/payments.js';
import { housekeepingRouter } from './routes/housekeeping.js';
import { auditLogsRouter } from './routes/audit-logs.js';
import { guestsRouter } from './routes/guests.js';
import { hotelsRouter } from './routes/hotels.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);
app.use('/api/room-types', roomTypesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/reservation-rooms', reservationRoomsRouter);
app.use('/api/checkins', checkinsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/service-orders', serviceOrdersRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/housekeeping', housekeepingRouter);
app.use('/api/audit-logs', auditLogsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true }));

// Test DB connection and create tables + seed if missing
pool.getConnection()
  .then((conn) => {
    conn.release();
    return ensureTables();
  })
  .then(() => {
    console.log('Database connected (hoteldb).');
  })
  .catch((err) => {
    if (err.message.includes('password not set')) {
      console.error('\n' + err.message + '\n');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR' || err.code === '28P01') {
      console.error(
        '\nMySQL password rejected. Check backend/.env:\n' +
        '  • MYSQL_PASSWORD= must be the same password you use for MySQL user "root".\n' +
        '  • Or set DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/hoteldb\n'
      );
    } else {
      console.error('Database connection failed:', err.message);
    }
  });

app.listen(PORT, () => {
  console.log(`Hotel API running at http://localhost:${PORT}`);
});
