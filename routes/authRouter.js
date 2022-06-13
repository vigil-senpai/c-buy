const express = require('express')
const router = express.Router()

const {registerUser, registerStore, loginAsUser, loginAsStore} = require('../controllers/authController')

router.route('/register/user').post(registerUser)
router.route('/register/store').post(registerStore)
router.route('/login/user').post(loginAsUser)
router.route('/login/store').post(loginAsStore)

module.exports = router