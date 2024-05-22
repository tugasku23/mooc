const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next, options) =>
    res.status(options.statusCode).json({
      status: 'FAIL',
      message: 'Too many requests, please try again later'
    })
})

module.exports = { limiter }
