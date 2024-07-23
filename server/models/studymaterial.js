

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyMaterial extends Model {
    static associate(models) {
      StudyMaterial.belongsTo(models.User, { foreignKey: 'uploader_id', as: 'uploader' });
      StudyMaterial.hasMany(models.File, { foreignKey: 'studyMaterialId', as: 'files', onDelete: 'CASCADE' });
    }
  }
  StudyMaterial.init({
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'subject cannot be empty'
        }
      }
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'branch cannot be empty'
        }
      }
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'semester cannot be empty'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: DataTypes.TEXT,
    uploader_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'StudyMaterial',
  });
  return StudyMaterial;
};
