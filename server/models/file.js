'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.StudyMaterial, { foreignKey: 'studyMaterialId' });
    }
  }
  File.init({
    studyMaterialId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'StudyMaterials', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      allowNull: false,
    },
    fileUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
