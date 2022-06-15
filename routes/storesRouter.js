const express = require('express')
const { getProductsFromStore } = require('../controllers/storesControllers')
const paginate = require('../middleware/paginate')
const router = express.Router()

router.route('/:storeID').get(getProductsFromStore)

module.exports = router