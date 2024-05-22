const express = require('express')
const { authorization } = require('../middleware/auth.js')
const { sendOtp, confirimCodeOtp } = require('../controllers/otp.js')

const router = express.Router()

router.get('/otp', authorization, sendOtp)
router.post('/otp', authorization, confirimCodeOtp)

module.exports = router
