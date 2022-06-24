const express = require('express')
const { createTransaction, confirmTransaction } = require('../controllers/transactionsControllers')
const router = express.Router()

router.route('/').post(createTransaction).get()
router.route('/').patch(confirmTransaction)
router.route('/:transactionID').get()

module.exports = router