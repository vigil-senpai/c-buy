const express = require('express')
const { getProducts, postProductChart, updateChartQty, deleteCartProduct } = require('../controllers/cartsControllers')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/').post(postProductChart)
router.route('/').patch(updateChartQty)
router.route('/').delete(deleteCartProduct)

module.exports = router