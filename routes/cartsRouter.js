const express = require('express')
const { getProducts } = require('../controllers/cartsControllers')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/addProduct').post()

module.exports = router