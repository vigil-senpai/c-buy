const express = require('express')
const { getProductsFromStore, getAllStores } = require('../controllers/storesControllers')
const paginate = require('../middleware/paginate')
const router = express.Router()

router.route('/:storeID').get(getProductsFromStore)
router.route('/').get(getAllStores)


module.exports = router