const express = require('express')
const { getProducts, postProductChart, updateChartQty } = require('../controllers/cartsControllers')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/').post(postProductChart)
router.route('/').patch(updateChartQty)

module.exports = router