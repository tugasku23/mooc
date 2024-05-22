const { getUserTrackerServices } = require('../services/tracker')

const isUserTrackerExist = async (req, res, next) => {
  try {
    const { id: user_id } = req.user
    const { id: course_id } = req.params

    const userTracker = await getUserTrackerServices(user_id, course_id)

    userTracker.course_id = course_id
    req.userTracker = userTracker
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = { isUserTrackerExist }
