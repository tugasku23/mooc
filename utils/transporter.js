const nodemailer = require('nodemailer')
require('dotenv').config()
const config = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: { rejectUnauthorized: false }
}
const transporter = nodemailer.createTransport(config)

module.exports = transporter
