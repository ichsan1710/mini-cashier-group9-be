const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "db_minicashier",
    port: 3306
})

db.connect((err) => {
    if (err) {
        return console.error(`error: ${err.message}`)
    }
    console.log("Connected to mysql server")
})

module.exports = { db }