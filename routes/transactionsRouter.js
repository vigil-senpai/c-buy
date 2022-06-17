const express = require('express')
const { createTransaction } = require('../controllers/transactionsControllers')
const router = express.Router()

router.route('/').post(createTransaction).get()
router.route('/:transactionID').get()

module.exports = router