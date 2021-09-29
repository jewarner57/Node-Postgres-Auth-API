const express = require('express')
const isAuth = require('../middleware/isAuth')
const validateinput = require('../middleware/validateinput')

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/signin', validateinput, authController.signin)

router.post('/signup', validateinput, authController.signup)

router.post('/signout', isAuth, authController.signout)

module.exports = router
