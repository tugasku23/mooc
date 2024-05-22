require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { ApplicationError } = require('../../error')

const encryptedKode = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const kodeEncrypted = await bcrypt.hash(password, salt)
    return kodeEncrypted
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const comparePassword = async (pasword, hashPassowrd) => {
  try {
    const matchPassowrd = await bcrypt.compare(pasword, hashPassowrd)
    return matchPassowrd
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const createAccessToken = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN)
    return accessToken
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const verifyToken = (token, env) => {
  try {
    const decoded = jwt.verify(token, env, (error, payload) => {
      if (error) {
        throw new ApplicationError('unauthorized', 401)
      }
      return payload
    })
    return decoded
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { encryptedKode, comparePassword, createAccessToken, verifyToken }
