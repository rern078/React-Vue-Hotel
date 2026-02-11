import mysql from 'mysql2/promise';
// .env is loaded in server.js before any route runs

const connectionString = process.env.DATABASE_URL;
const password = process.env.MYSQL_PASSWORD ?? '';

const pool = mysql.createPool(
  connectionString
    ? connectionString
    : {
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: password,
        database: process.env.MYSQL_DATABASE || 'hoteldb',
        waitForConnections: true,
        connectionLimit: 10,
      }
);

/** Run a query. Returns { rows, insertId, affectedRows } so it behaves like pg result. */
export async function query(sql, params = []) {
  const [rowsOrResult] = await pool.execute(sql, params);
  const rows = Array.isArray(rowsOrResult) ? rowsOrResult : [];
  const insertId = rowsOrResult && rowsOrResult.insertId;
  const affectedRows = rowsOrResult && rowsOrResult.affectedRows;
  return { rows, insertId, affectedRows };
}

/** Run raw SQL (e.g. multi-statement schema). No params. */
export async function queryRaw(sql) {
  const [rows] = await pool.query(sql);
  return { rows: Array.isArray(rows) ? rows : [], insertId: rows?.insertId, affectedRows: rows?.affectedRows };
}

export { pool };
