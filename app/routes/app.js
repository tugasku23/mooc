const express = require('express')
const router = express.Router()

const { getRoot, notFound } = require('../controllers/app')

router.get('/api', getRoot)
router.use('*', notFound)

module.exports = router
