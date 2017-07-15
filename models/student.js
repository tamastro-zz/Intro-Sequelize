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
      }
    },
    SubjectId: DataTypes.INTEGER
  })
  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
      through: `Bridge`,
      foreignKey: `StudentId`
    })
  };
  return Student;
};
