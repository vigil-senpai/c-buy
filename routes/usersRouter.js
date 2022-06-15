const express = require('express')
const { getUser, getAllUsers } = require('../controllers/usersControllers')
const router = express.Router()

router.route('/:userID').get(getUser)
router.route('/').get(getAllUsers)

module.exports = router