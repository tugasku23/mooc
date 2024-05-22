const express = require('express')
const { getAllCcategories } = require('../controllers/category')

const router = express.Router()

router.get('/categories', getAllCcategories)

module.exports = router
