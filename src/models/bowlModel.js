require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = require('../../dbConfig');

const getBowls = async () => {
  try {
    const result = await pool.query('SELECT * FROM bowls');
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};


const getBowlById = async (id) => {
  const result = await pool.query('SELECT * FROM bowls WHERE id = $1', [id]);
  return result.rows[0];
};

const createBowl = async ({ x, y }, status, description, lastupdated) => {
  const point = `(${x}, ${y})`;
  const result = await pool.query(
    'INSERT INTO bowls (location, status, description, lastupdated) VALUES ($1, $2, $3, $4) RETURNING *',
    [point, status, description, lastupdated]
  );
  return result.rows[0];
};

const updateBowl = async (id, { x, y }, status, description, lastupdated) => {
  const point = `(${x}, ${y})`;
  const result = await pool.query(
    `UPDATE bowls 
     SET location = $2, 
         status = $3, 
         description = $4, 
         lastupdated = $5 
     WHERE id = $1 
     RETURNING *`,
    [id, point, status, description, lastupdated]
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
