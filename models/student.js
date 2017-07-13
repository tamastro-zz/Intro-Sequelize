'use strict';
module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "tau nulis email ga ?"
        }
        // unique: {
        //   args: true,
        //   msg: 'Email address already in use!'
        // }
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};
