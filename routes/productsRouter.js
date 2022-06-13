const express = require('express')
const { getProducts, postProduct } = require('../controllers/productsControllers')
const paginate = require('../middleware/paginate')
const router = express.Router()

router.route('/:page').get(paginate, getProducts)
router.route('/').post(postProduct)

module.exports = router