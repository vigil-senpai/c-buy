const express = require('express')
const { getProducts } = require('../controllers/productsControllers')
const paginate = require('../middleware/paginate')
const router = express.Router()

router.route('/:page').get(paginate, getProducts)

module.exports = router