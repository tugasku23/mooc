'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataCategory = [
      {
        category: 'Android',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790473/android_pfk0yg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Data Science',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790499/data_science_rqfyt9.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'UI/UX',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790472/ui_ux_wal75a.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Product Manager',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790472/pm_zq2xbg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Web Development',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790472/web_dev_fqanff.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'IOS',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1701790472/ios_rpmrsu.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Categories', dataCategory, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
