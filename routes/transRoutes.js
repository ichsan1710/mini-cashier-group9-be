const express = require('express')
const { transController } = require('../controllers')

const router = express.Router()

router.get('/gross', transController.gross)
router.get('/transaction', transController.trans)
router.get('/topOne', transController.topOne)
router.get('/topFive', transController.topFive)

module.exports = router
