require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = require('../../dbConfig');

const getBowls = async () => {
  const result = await pool.query('SELECT * FROM bowls');
  return result.rows;
};

const getBowlById = async (id) => {
  const result = await pool.query('SELECT * FROM bowls WHERE id = $1', [id]);
  return result.rows[0];
};

const createBowl = async (location) => {
  const result = await pool.query(
    'INSERT INTO bowls (location) VALUES ($1) RETURNING *',
    [location]
  );
  return result.rows[0];
};

const updateBowl = async (id, location) => {
  const result = await pool.query(
    'UPDATE bowls SET location = $1 WHERE id = $2 RETURNING *',
    [location, id]
  );
  return result.rows[0];
};

const deleteBowl = async (id) => {
  const result = await pool.query('DELETE FROM bowls WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getBowls,
  getBowlById,
  createBowl,
  updateBowl,
  deleteBowl,
};
