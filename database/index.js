const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1Sampai9DwikaSQL",
    database: "purwadhika",
    port: 3306,
    connectionLimit: 10
})

const db = pool.promise()

pool.getConnection((err, connection) => {
    if (err) {
        console.error(`Error connecting to database: ${err.message}`);
    } else {
        console.log('Successfully connected to the database');
        connection.release();
    }
});

module.exports = {
    db,
    query: (...params) => {
        return db.query(...params).then(([rows]) => rows);
    }
}