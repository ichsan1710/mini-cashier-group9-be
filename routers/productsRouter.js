const express = require('express')
const { productsController } = require('../controller')

const router = express.Router()

router.post('/', productsController.createProduct)
router.get('/products', productsController.getProducts)
router.patch('/edit-products/:id', productsController.editProducts)
router.delete('/delete-products/:id', productsController.deleteProducts)

module.exports = router