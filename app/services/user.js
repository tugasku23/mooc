/* eslint-disable no-multiple-empty-lines */
const {
  create,
  findByEmail,
  findByPk,
  findByPkAdmin,
  updateUser,
  updateResetTokenPasswordRepo,
  resetPasswordRepo,
  findByPhoneNumber,
  findByPkWithPW
} = require('../repositories/user.js')
const { createNotifRepo } = require('../repositories/notification.js')
const { encryptedKode, comparePassword } = require('./auth.js')
const { ApplicationError } = require('../../error')

const registeService = async (argRequest) => {
  try {
    const { name, email, phone_number, password } = argRequest
    const role = 'member'
    const user = await findByEmail(email)

    if (user) {
      throw new ApplicationError('Email has been registered', 400)
    }

    if (password.length < 8) {
      throw new ApplicationError('Password must be at least 8 character', 400)
    }

    const hashPassword = await encryptedKode(password)
    const newUser = await create({
      name,
      email,
      phone_number: `+62${phone_number}`,
      password: hashPassword,
      role
    })

    return newUser
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const loginUserSevices = async (argRequest) => {
  try {
    const { emailOrPhone, password } = argRequest
    let user
    if (emailOrPhone.includes('@')) {
      user = await findByEmail(emailOrPhone)
    } else {
      user = await findByPhoneNumber(emailOrPhone)
    }

    if (!user) {
      throw new ApplicationError('User not found', 404)
    }

    const matchPassword = await comparePassword(password, user.password)
    if (!matchPassword) {
      throw new ApplicationError('Wrong passwrod', 400)
    }
    return user
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const loginAdminSevices = async (argRequest) => {
  try {
    const { id, password } = argRequest
    const user = await findByPkAdmin(id)
    if (id !== user.id) {
      throw new ApplicationError('Id not found', 404)
    }

    const matchPassword = await comparePassword(password, user.password)
    if (!matchPassword) {
      throw new ApplicationError('Wrong password', 400)
    }
    return user
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const detailUserServices = async (id) => {
  try {
    const user = await findByPk(id)
    if (!user) {
      throw new ApplicationError('User not found', 404)
    }

    return user
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateUserServices = async (argRequest, id) => {
  try {
    const newUser = await updateUser(argRequest, id)

    if (newUser) {
      const title = 'Notifikasi'
      const message = 'Profile telah berhasil di ubah'


      await createNotifRepo({ user_id: id, title, message })
    }

    return newUser
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, 500)
  }
}

const updatePasswordServices = async (argRequest, id) => {
  try {
    const { old_password, new_password, confirm_password } = argRequest

    const currentUser = await findByPkWithPW(id)
    const currentPassword = currentUser.password

    const matchPassword = await comparePassword(old_password, currentPassword)

    if (!matchPassword) {
      throw new ApplicationError('Old password wrong', 400)
    }

    if (new_password !== confirm_password) {
      throw new ApplicationError('New password wrong', 400)
    }

    const hashNew_password = await encryptedKode(new_password)
    const updateUserPassword = await updateUser({ password: hashNew_password }, id)

    if (updateUserPassword) {
      const title = 'Notifikasi'
      const message = 'Password telah berhasil di ubah'


      await createNotifRepo({ user_id: id, title, message })
    }

    return updateUserPassword
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateTokenPasswordServices = async (argRequest, email) => {
  try {
    const resetTokenPassword = updateResetTokenPasswordRepo(argRequest, email)
    return resetTokenPassword
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const resetPasswordServices = async (argRequest, tokenResetPassword) => {
  try {
    const { new_password, confirm_password } = argRequest

    if (new_password !== confirm_password) {
      throw new ApplicationError('Wrong password', 400)
    }

    const hashPassword = await encryptedKode(new_password)
    const passwords = await resetPasswordRepo(
      { password: hashPassword },
      tokenResetPassword
    )

    return passwords
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const findUserByEmailServices = async (email) => {
  try {
    const user = await findByEmail(email)
    if (!user) {
      throw new ApplicationError('Email not Found', 404)
    }
    return user
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

module.exports = {
  registeService,
  loginUserSevices,
  loginAdminSevices,
  detailUserServices,
  updateUserServices,
  updatePasswordServices,
  updateTokenPasswordServices,
  resetPasswordServices,
  findUserByEmailServices
}
