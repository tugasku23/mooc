const express = require('express')
const { register, loginAdmin, loginUser, sendLinkPassword, resetPassword } = require('../controllers/user.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', loginUser)
router.post('/admin/login', loginAdmin)
router.post('/reset/password', sendLinkPassword)
router.put('/reset/password/:tokenResetPassword', resetPassword)

module.exports = router
