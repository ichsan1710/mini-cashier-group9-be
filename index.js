const express = require('express')
const PORT = 8001
const app = express()
const { db } = require('./database')
const { authRoutes, transRoutes } = require('./routes')

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/trans', transRoutes)

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT)
})
