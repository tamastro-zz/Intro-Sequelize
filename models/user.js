'use strict';

const random = require('../views/helper/randomizer')

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.TEXT,
    salt: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: function (models) {
        let salt = random.randomStr(8);
        let password = models.password
        models.password = random.hashish(password, salt);
        models.salt = salt;
      }
    }
  });
  return user;
};
