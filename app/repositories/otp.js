const { OTP } = require('../models')

const createOtp = (argRequest) => {
  return OTP.create(argRequest)
}

const findOtp = (userId) => {
  return OTP.findOne({
    where: {
      userId
    }
  })
}

const updateOtp = (argRequest, userId) => {
  return OTP.update(argRequest, {
    where: { userId }
  })
}

module.exports = { findOtp, createOtp, updateOtp }
