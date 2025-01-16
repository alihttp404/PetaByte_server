require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const admin = require('../../middleware/firebase');
const pool = require('../../dbConfig');

const getLeaderboard = async () => {
  const result = await pool.query(
    'SELECT full_name, scanned_bowls FROM users ORDER BY scanned_bowls DESC'
  );
  return result.rows;
};

const getUsers = async () => {
  const result = await pool.query('SELECT id, full_name, email, age, scanned_bowls FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT id, full_name, email, age, scanned_bowls FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT id, full_name, email, age, scanned_bowls FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async (full_name, email, age) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, email, age) VALUES ($1, $2, $3) RETURNING id, full_name, email, age, scanned_bowls',
      [full_name, email, age]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const createUsers = async (users) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const results = [];
    for (const user of users) {
      const { fullName, email, age } = user;
      const result = await client.query(
        'INSERT INTO users (full_name, email, age) VALUES ($1, $2, $3) RETURNING id, full_name, email, age, scanned_bowls',
        [fullName, email, age]
      );
      results.push(result.rows[0]);
    }
    await client.query('COMMIT');
    return results;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const updateUser = async (id, fullName, email, scannedBowls) => {
  const result = await pool.query(
    'UPDATE users SET full_name = $1, email = $2, scanned_bowls = $3 WHERE id = $4 RETURNING id, full_name, email, age, scanned_bowls',
    [fullName, email, scannedBowls, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await admin.auth().deleteUser(id);
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, full_name, email, age, scanned_bowls', [id]);
  return result.rows[0];
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  createUsers,
  updateUser,
  deleteUser,
  getLeaderboard,
};
