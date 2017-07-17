'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
        username: 'johnwick',
        password: 'shelby',
        role: 'headmaster',
        createdAt: new Date(),
        updatedAt: new Date()
    },
      {
        username: 'harryp',
        password: 'hedwig',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
    },
      {
        username: 'daenerys',
        password: 'drogon',
        role: 'teacher',
        createdAt: new Date(),
        updatedAt: new Date()
    }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
