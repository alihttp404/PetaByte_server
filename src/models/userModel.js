// require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,s
});

console.log('DB User:', pool.user)
console.log('DB Password:', pool.password)
console.log('DB Host:', pool.host)
console.log('DB Name:', pool.database)
console.log('DB Port:', pool.port)

const getUsers = async () => {
  console.log("Salam model before query");
  console.log('DB User:', pool.user)
  console.log('DB Password:', pool.password)
  console.log('DB Host:', pool.host)
  console.log('DB Name:', pool.database)
  console.log('DB Port:', pool.port)
  const result = await pool.query('SELECT * FROM users');
  console.log("Salam model after query");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (fullName, email, password, scannedBowls) => {
  const result = await pool.query(
    'INSERT INTO users (full_name, email, password, scanned_bowls) VALUES ($1, $2, $3, $4) RETURNING *',
    [fullName, email, password, scannedBowls]
  );
  return result.rows[0];
};

const updateUser = async (id, fullName, email, password, scannedBowls) => {
  const result = await pool.query(
    'UPDATE users SET full_name = $1, email = $2, password = $3, scanned_bowls = $4 WHERE id = $5 RETURNING *',
    [fullName, email, password, scannedBowls, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
