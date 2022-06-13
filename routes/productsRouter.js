const express = require('express')
const { getProducts, postProduct, getProduct, patchProduct } = require('../controllers/productsControllers')
const paginate = require('../middleware/paginate')
const router = express.Router()

router.route('/page/:page').get(paginate, getProducts)
router.route('/:productID').get(getProduct)
router.route('/').post(postProduct).patch(patchProduct)

module.exports = router