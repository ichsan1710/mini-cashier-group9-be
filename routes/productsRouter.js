const express = require('express')
const { productsController } = require('../controller')

const router = express.Router()

router.post('/', productsController.createProduct)

module.exports = router