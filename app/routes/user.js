const express = require('express')
const { authorization } = require('../middleware/auth.js')
const { detailUserMid } = require('../middleware/user.js')
const { updatePassword, updateUser, currentUser } = require('../controllers/user.js')
const { uploadStorage, uploadToCloudinary } = require('../middleware/uploadImage.js')

const router = express.Router()

router.get('/user', authorization, detailUserMid, currentUser)
router.put('/user', authorization, detailUserMid, uploadStorage, uploadToCloudinary, updateUser)
router.put('/user/password', authorization, updatePassword)

module.exports = router
