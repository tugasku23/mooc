const {
  createOrderRepo,
  findAllOrder,
  findAllOrderByUserId,
  findByIdOrder,
  findByUserAndCourseId,
  updateOrderRepo
} = require('../repositories/order.js')

const { createNotifRepo } = require('../repositories/notification.js')
const { create: createTracker } = require('../repositories/tracker.js')
const { ApplicationError } = require('../../error')

const createOrderServices = async (user_id, payload) => {
  try {
    const { course_id } = payload

    const isOrdered = await findByUserAndCourseId({ user_id, course_id })
    if (isOrdered) {
      throw new ApplicationError('Cant order the same course', 400)
    }

    const order = await createOrderRepo({ ...payload, user_id })
    return order
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const getAllOrderServices = async (filter, user_id) => {
  try {
    if (user_id) {
      const orders = await findAllOrderByUserId(user_id)
      return orders
    }

    const condition = (i) => {
      const statusCondition = !filter.status || i.status?.includes(filter.status)
      const orderMethodCondition = !filter.method || i.order_method?.includes(filter.method)

      return statusCondition && orderMethodCondition
    }

    const orders = await findAllOrder()
    const filteredOrders = orders.filter(condition)

    return filteredOrders
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailOrderServices = async (id) => {
  try {
    const order = await findByIdOrder(id)
    if (!order) {
      throw new ApplicationError('Order id not found', 404)
    }

    return order
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateOrderServices = async (user, order, payload) => {
  try {
    const { id, status: currentStatus, course: { id: course_id } } = order
    const { order_method } = payload

    const finishedOrder = currentStatus === 'SUDAH BAYAR'

    if (finishedOrder) {
      throw new ApplicationError('Order has been paid', 400)
    }

    if (!order_method) {
      throw new ApplicationError('Order method can\'t be null', 400)
    }

    const status = 'SUDAH BAYAR'
    const payment_date = new Date()

    // eslint-disable-next-line no-unused-vars
    const [_, updatedOrder] = await updateOrderRepo({ status, payment_date, ...payload }, id)

    if (updatedOrder) {
      const { id: user_id } = user
      const payload = { course_id }

      await createTracker({ user_id, ...payload })

      const title = 'Notifikasi'
      const message = 'Selamat pembelian course telah berhasil'

      await createNotifRepo({ user_id, title, message })
    }

    return updatedOrder
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

module.exports = {
  createOrderServices,
  getAllOrderServices,
  detailOrderServices,
  updateOrderServices
}
