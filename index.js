const express = require('express')
const PORT = 8001
const app = express()
const {db} = require('./database')

app.use(express.json())

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT)
})

