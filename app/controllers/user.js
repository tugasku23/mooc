require('dotenv').config()

const {
  registeService,
  loginUserSevices,
  loginAdminSevices,
  updateUserServices,
  updatePasswordServices,
  updateTokenPasswordServices,
  resetPasswordServices,
  findUserByEmailServices
} = require('../services/user.js')

const crypto = require('crypto')
const Mailgen = require('mailgen')

const transporter = require('../../utils/transporter.js')
const { createAccessToken } = require('../services/auth.js')
const { encryptedKode } = require('../services/auth.js')
const { createOtpServices } = require('../services/otp.js')

const register = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body
    const otp = Math.floor(Math.random() * 900000) + 100000
    const expire_time = new Date().getTime() + 300000

    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Dev Academy',
        link: 'https://mailgen.js/'
      }
    })

    const response = {
      body: {
        name,
        intro: 'OTP Verification',
        action: {
          button: {
            color: '#22BC66',
            text: otp
          }
        },
        outro: 'Verification code is only valid for 5 minutes'
      }
    }

    const mail = MailGenerator.generate(response)
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verifcation OTP',
      html: mail
    }

    const hashCode = await encryptedKode(otp.toString())
    const user = await registeService({ name, email, phone_number, password })

    const accessToken = createAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })

    await createOtpServices({ userId: user.id, code: hashCode, expire_time })
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          status: 'OK',
          message: 'Email sent',
          data: { accessToken }
        })
      })
      .catch((error) => {
        return res.status(500).json({
          status: 'FAIL',
          message: error.message
        })
      })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const response = await loginUserSevices(req.body)
    const { id, name, email, role } = response

    const accessToken = createAccessToken({ id, name, email, role })

    res.status(200).json({
      status: 'OK',
      message: 'Login Success',
      data: {
        accessToken
      }
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const loginAdmin = async (req, res) => {
  try {
    const response = await loginAdminSevices(req.body)
    const { id, name, email, role } = response

    const accessToken = createAccessToken({ id, name, email, role })
    res.status(200).json({
      status: 'OK',
      message: 'Login Success',
      data: {
        accessToken
      }
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const currentUser = async (req, res) => {
  try {
    const response = req.detailUser
    res.status(200).json({
      status: 'OK',
      message: 'Get user information success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.user.id
    const photo = req.photo

    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updateUserServices({ ...req.body, photo }, id)

    res.status(201).json({
      status: 'OK',
      message: 'Update user success',
      data: response[0]
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updatePassword = async (req, res) => {
  try {
    const id = req.user.id
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updatePasswordServices(req.body, id)

    res.status(201).json({
      status: 'OK',
      message: 'Update password success',
      data: response[0]
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const sendLinkPassword = async (req, res) => {
  try {
    const email = req.body.email
    const tokenResetPassword = crypto.randomBytes(10).toString('hex')
    const currentUser = await findUserByEmailServices(email)
    await updateTokenPasswordServices({ tokenResetPassword }, email)

    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Dev Academy',
        link: 'https://mailgen.js/'
      }
    })

    const response = {
      body: {
        name: currentUser.name,
        intro: 'Reset Password',
        action: {
          instructions: 'Clik button to page reset password',
          button: {
            color: '#22BC66',
            text: 'Click this to reset password',
            link: `https://devacademy.vercel.app/reset/password/${tokenResetPassword}`
          }
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help."
      }
    }

    const mail = MailGenerator.generate(response)
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      html: mail
    }

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          status: 'OK',
          message: 'Email Sent'
        })
      })
      .catch((error) => {
        res.status(500).json({
          status: 'FAIL',
          message: error.message
        })
      })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const tokenResetPassword = req.params.tokenResetPassword
    await resetPasswordServices(req.body, tokenResetPassword)

    res.status(200).json({
      status: 'OK',
      message: 'Reset Password Success'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  register,
  loginUser,
  loginAdmin,
  currentUser,
  updateUser,
  updatePassword,
  sendLinkPassword,
  resetPassword
}
