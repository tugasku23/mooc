const express = require('express')
// eslint-disable-next-line no-unused-vars
const {
  createOrder,
  getAllOrder,
  getAllOrderByUser,
  detailOrder,
  updateOrder
} = require('../controllers/order.js')
const { isOrderExist } = require('../middleware/order.js')
const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/orders', authorization, createOrder)
router.get('/orders', authorization, getAllOrderByUser)
router.put('/orders/:id', authorization, isOrderExist, updateOrder)

router.get('/admin/orders', authorization, onlyAdmin, getAllOrder)
router.get('/admin/orders/:id', authorization, onlyAdmin, isOrderExist, detailOrder)

module.exports = router
