const {
  createUserTrackerService,
  getTrackerByUserServices,
  countTotalDataServices,
  updateUserTrackerServices
} = require('../services/tracker')

const createUserTracker = async (req, res) => {
  try {
    const { id: user_id } = req.user
    const payload = req.body

    const newUserTracker = await createUserTrackerService(user_id, payload)

    res.status(201).json({
      status: 'OK',
      message: 'Create user tracker data success',
      data: newUserTracker
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getUserTracker = async (req, res) => {
  try {
    const { id: user_id } = req.user
    const filter = req.query
    const userTracker = await getTrackerByUserServices(user_id, filter)

    res.status(200).json({
      status: 'OK',
      message: 'Get user tracker data success',
      data: userTracker
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getUserTrackerDetail = async (req, res) => {
  try {
    const { course_id, ...tracker } = req.userTracker.dataValues

    res.status(200).json({
      status: 'OK',
      message: 'Get user tracker detail success',
      data: tracker
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getTotalData = async (req, res) => {
  try {
    const totalData = await countTotalDataServices()

    res.status(200).json({
      status: 'OK',
      message: 'Get total data success',
      data: totalData
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateUserTracker = async (req, res) => {
  try {
    const tracker = req.userTracker
    const { course_id } = req.userTracker

    const { id: user_id } = req.user
    const payload = req.body

    const updatedUserTracker = await updateUserTrackerServices({ user_id, course_id, ...payload }, tracker)

    res.status(201).json({
      status: 'OK',
      message: 'Update user tracker success',
      data: updatedUserTracker
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createUserTracker,
  getUserTracker,
  getUserTrackerDetail,
  getTotalData,
  updateUserTracker
}
