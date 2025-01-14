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
  console.log("Salam model before query");
  const result = await pool.query('SELECT * FROM users');
  console.log("Salam model after query");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; // Return the first user (if any)
};

const createUser = async (full_name, email, password, age) => {
  console.log("Model function data:", { full_name, email, password, age });
  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, email, password, age]
    );
    console.log("Query result:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("SQL query error:", err);
    throw err;
  }
};

const createUsers = async (users) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const results = [];

    for (const user of users) {
      const { fullName, email, password, age } = user;
      const result = await client.query(
        'INSERT INTO users (full_name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *',
        [fullName, email, password, age]
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

const updateUser = async (id, fullName, email, password, scannedBowls) => {
  console.log('Update query params:', { id, fullName, email, password, scannedBowls });

  try {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, email = $2, password = $3, scanned_bowls = $4 WHERE id = $5 RETURNING *',
      [fullName, email, password, scannedBowls, id]
    );
    console.log('Query result:', result.rows);
    return result.rows[0];
  } catch (err) {
    console.error('Database error in updateUser:', err);
    throw err;
  }
};



const deleteUser = async (id) => {
  await admin.auth().deleteUser(id);
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
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
