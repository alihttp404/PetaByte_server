require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const admin = require('../../middleware/firebase');
const pool = require('../../dbConfig');

const getUsers = async () => {
  console.log("Salam model before query");
  const result = await pool.query('SELECT * FROM users');
  console.log("Salam model after query");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (id, fullName, email, password, scannedBowls, age) => {
  console.log("Salam createUser model before query");
  const result = await pool.query(
    'INSERT INTO users (id, full_name, email, password, scanned_bowls, age) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, fullName, email, password, scannedBowls, age]
  );
  console.log("Salam createUser model after query");
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
  await admin.auth().deleteUser(id);

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
