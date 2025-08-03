require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1', // Use IP instead of localhost
    port: process.env.VPS_DB_PORT || 5432,
    database: process.env.VPS_DB_NAME || 'petcity_db',
    user: process.env.VPS_DB_USER || 'ali',
    password: process.env.VPS_DB_PASSWORD,
    ssl: false
});

module.exports = pool;