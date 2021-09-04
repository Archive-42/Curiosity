'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      { firstName: 'Demo', lastName: 'User', email: 'demo@example.com', hashedPassword: bcrypt.hashSync('password'), avatar: 'https://cdn.imgbin.com/25/0/7/imgbin-roblox-t-shirt-avatar-user-generated-content-t-shirt-ET3c921CxAUy8qavQZq99kXT2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'New', lastName: 'User', email: 'new@example.com', hashedPassword: bcrypt.hashSync('newuser'), createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Buddy', lastName: 'Hawkins', email: 'bhawkins@gmail.com', hashedPassword: bcrypt.hashSync('buddyman'), avatar: 'https://drive.google.com/file/d/1313_2WJGIQJXxlibmtqGHL2ZTDQOLQ6x/view?usp=drivesdk', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Beth', lastName: 'Anderson', email: 'bethandy@gmail.com', hashedPassword: bcrypt.hashSync('beffany'), avatar: 'https://drive.google.com/file/d/1LK5Gu5_Qv3VXiiOb_hMUFUM7ZDfQ56SR/view?usp=drivesdk', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Misa', lastName: 'Amane', email: 'misa.amane@yahoo.com', hashedPassword: bcrypt.hashSync('misamisa'), avatar: 'https://i.pinimg.com/564x/15/90/0b/15900bac49ac16441f908a4fb4d2d06a.jpg', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Mason', lastName: 'Spence', email: 'masondaman@gmail.com', hashedPassword: bcrypt.hashSync('bigman'), avatar: 'https://drive.google.com/file/d/1BlrVkrujn6kecV3Mq3NC9GZbx-3cDTFx/view?usp=drivesdk', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
