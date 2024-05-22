const { findOtp, createOtp, updateOtp } = require('../repositories/otp.js')
const { ApplicationError } = require('../../error')
const bcrypt = require('bcrypt')

const createOtpServices = async (argRequest) => {
  try {
    const otp = await createOtp(argRequest)
    return otp
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const confimOtpServices = async (userId, requestBody) => {
  try {
    const { code1, code2, code3, code4, code5, code6 } = requestBody
    const codes = `${code1}${code2}${code3}${code4}${code5}${code6}`

    const codeOtp = await findOtp(userId)
    const compareCode = await bcrypt.compare(codes, codeOtp.code)

    if (!compareCode) {
      throw new ApplicationError('Wrong OTP code', 400)
    }

    if (codeOtp.expire_time < new Date().getTime()) {
      throw new ApplicationError('OTP code is not valid', 400)
    }

    await updateOtp({ is_verified: true }, userId)
    return codeOtp
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateOtpServices = async (argRequest, userId) => {
  try {
    const codeOtp = await updateOtp(argRequest, userId)
    return codeOtp
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const findOtpCode = async (userId) => {
  try {
    const otpCode = await findOtp(userId)
    return otpCode
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { confimOtpServices, createOtpServices, updateOtpServices, findOtpCode }
