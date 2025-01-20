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
  const result = await pool.query('SELECT id, full_name, uid, age, scanned_bowls FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT id, full_name, uid, age, scanned_bowls FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getUserByUid = async (uid) => {
  const result = await pool.query('SELECT id, full_name, uid, age, scanned_bowls FROM users WHERE uid = $1', [uid]);
  return result.rows[0];
};

const createUser = async (full_name, uid, age) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, uid, age, scanned_bowls) VALUES ($1, $2, $3, $4) RETURNING id, full_name, uid, age, scanned_bowls',
      [full_name, uid, age, 0]
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
      const { fullName, uid, age } = user;
      const result = await client.query(
        'INSERT INTO users (full_name, uid, age) VALUES ($1, $2, $3) RETURNING id, full_name, uid, age, scanned_bowls',
        [fullName, uid, age]
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

const updateUser = async (id, fullName, uid, scannedBowls) => {
  const result = await pool.query(
    'UPDATE users SET full_name = $1, uid = $2, scanned_bowls = $3 WHERE id = $4 RETURNING id, full_name, uid, age, scanned_bowls',
    [fullName, uid, scannedBowls, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await admin.auth().deleteUser(id);
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, full_name, uid, age, scanned_bowls', [id]);
  return result.rows[0];
};

module.exports = {
  getUsers,
  getUserById,
  getUserByUid,
  createUser,
  createUsers,
  updateUser,
  deleteUser,
  getLeaderboard,
};
