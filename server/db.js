require("dotenv").config();

const pg = require("pg");
pg.defaults.ssl = true;
connectionString =
    process.env.DATABASE_URL 

const pool = new pg.Pool({
    max: 50,
    ssl: { rejectUnauthorized: false },
    connectionString: connectionString,
});
module.exports = pool;