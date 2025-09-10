const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const { payment } = require('../controllers/stripe')
const router = express.Router()

router.post('/user/create-checkout-session', authCheck, payment)

module.exports = router