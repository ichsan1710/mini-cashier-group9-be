const express = require('express')
const PORT = 8002
const app = express()
const { db } = require('./database')
const cors = require('cors')
const { authRoutes, transRoutes } = require('./routes')

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/trans', transRoutes)

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT)
})
