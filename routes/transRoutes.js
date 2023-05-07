const express = require('express')
const { transController } = require('../controllers')

const router = express.Router()

router.post('/gross', transController.gross)
router.post('/transaction', transController.trans)
router.post('/topone', transController.topOne)
router.post('/topfive', transController.topFive)

module.exports = router
