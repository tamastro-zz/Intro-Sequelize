'use strict';
module.exports = function (sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    StudentId: DataTypes.INTEGER
  })
  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {
      through: `Bridge`,
      foreignKey: `SubjectId`
    })
  };
  return Subject;
};
