'use strict';
module.exports = function (sequelize, DataTypes) {
  var Bridge = sequelize.define('Bridge', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  })
  Bridge.associate = (models) => {
    Bridge.belongsTo(models.Subject)
    Bridge.belongsTo(models.Student)
  };;
  return Bridge;
};
