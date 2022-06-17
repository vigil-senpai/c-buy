const express = require('express')
const { getProducts, postProductChart } = require('../controllers/cartsControllers')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/').post(postProductChart)

module.exports = router