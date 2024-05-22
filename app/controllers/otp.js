const { confimOtpServices, createOtpServices, updateOtpServices, findOtpCode } = require('../services/otp.js')
const { encryptedKode } = require('../services/auth.js')
const transporter = require('../../utils/transporter.js')
const Mailgen = require('mailgen')
require('dotenv').config()

const sendOtp = async (req, res) => {
  try {
    const otp = Math.floor(Math.random() * 900000) + 100000
    const expire_time = new Date().getTime() + 300000

    const { email, id, name } = req.user

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
    const currentOtPCode = await findOtpCode(id)

    if (currentOtPCode) {
      await updateOtpServices({ code: hashCode, expire_time }, id)
    } else {
      await createOtpServices({ id, code: hashCode, expire_time })
    }
    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({
            status: 'OK',
            message: 'Email sent'
          })
      })
      .catch((error) => {
        return res
          .status(500)
          .json({
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

const confirimCodeOtp = async (req, res) => {
  try {
    const userId = req.user.id
    await confimOtpServices(userId, req.body)
    res.status(200).json({
      status: 'OK',
      message: 'Confirm OTP code success'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = { sendOtp, confirimCodeOtp }
