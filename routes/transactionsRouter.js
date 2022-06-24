const express = require('express')
const { createTransaction, confirmTransaction, getAllTransactions, getTransactionData } = require('../controllers/transactionsControllers')
const router = express.Router()

router.route('/').post(createTransaction).get(getAllTransactions)
router.route('/').patch(confirmTransaction)
router.route('/:transactionID').get(getTransactionData)

module.exports = router