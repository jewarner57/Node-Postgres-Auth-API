const express = require('express')
const isAuth = require('../middleware/isAuth')
const validateinput = require('../middleware/validateinput')

const router = express.Router()

const mainController = require('../controllers/main')

router.get('/', mainController.home)

module.exports = router
