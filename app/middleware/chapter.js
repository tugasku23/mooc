const { findChapterServices } = require('../services/chapter')

const isChapterExist = async (req, res, next) => {
  try {
    const { id } = req.params
    const chapter = await findChapterServices(id)

    req.chapter = chapter
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const isChapterExistInPayload = async (req, res, next) => {
  try {
    const { chapter_id: id } = req.body
    await findChapterServices(id)

    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isChapterExist,
  isChapterExistInPayload
}
