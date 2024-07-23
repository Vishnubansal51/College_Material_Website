'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Files', 'studyMaterialId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'StudyMaterials',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Files', 'studyMaterialId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'StudyMaterials',
        key: 'id'
      },
      onDelete: null,
      allowNull: false
    });
  }
};
