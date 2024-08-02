// require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const poolConfig = {
  user: 'postgres',
  host: '91.220.216.1',
  database: 'mydatabase',
  password: 'Sin90is1!',
  port: 5432,
};

const pool = new Pool(poolConfig);

const getUsers = async () => {
  console.log("Salam model before query");
  console.log('DB User:', poolConfig.user);
  console.log('DB Password:', poolConfig.password);
  console.log('DB Host:', poolConfig.host);
  console.log('DB Name:', poolConfig.database);
  console.log('DB Port:', poolConfig.port);
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
