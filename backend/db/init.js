import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from backend folder before loading DB client
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
} catch (_) {}

async function main() {
  try {
    const { runSchema } = await import('./ensure-tables.js');
    await runSchema();
    console.log('Schema applied.');
    process.exit(0);
  } catch (err) {
    console.error('DB init failed:', err.message);
    process.exit(1);
  }
}

main();
