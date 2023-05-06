const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1Sampai9DwikaSQL",
    database: "purwadhika",
    port: 3306,
    connectionLimit: 10
});

const db = {
  query: async (...params) => {
    const conn = await pool.getConnection();
    try {
      return await conn.query(...params);
    } catch (err) {
      console.error(err);
    } finally {
      conn.release();
    }
  }
};

const query = db.query.bind(db);

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Successfully connected to the database');
    conn.release();
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
  }
})();

module.exports = {
  db,
  query
};
