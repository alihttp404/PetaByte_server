const { Pool } = require('pg');
const { DBConnLink } = require('./config'); 

const pool = new Pool({
    connectionString: DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pool;