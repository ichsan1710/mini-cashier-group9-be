const express = require('express')
const PORT = 8001
const app = express()
const { db } = require('./database')
const { productsRouter } = require('./routers')
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use('/', productsRouter)

app.use('/products', productsRouter)

app.use('/edit-products/:id', productsRouter)

app.use('/delete-products/:id', productsRouter)


app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT)
})
