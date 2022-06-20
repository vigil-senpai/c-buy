const express = require('express')
const { getProducts, postProductChart, updateChartQty, deleteCartProduct } = require('../controllers/cartsControllers')
const router = express.Router()
const qtyValidator = require('../middleware/product-qty-validator')

router.route('/').get(getProducts)
router.route('/').post(qtyValidator, postProductChart)
router.route('/').patch(qtyValidator, updateChartQty)
router.route('/').delete(deleteCartProduct)

module.exports = router