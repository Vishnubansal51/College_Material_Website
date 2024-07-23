'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the studyMaterialId column to include the onDelete: 'CASCADE' constraint
    await queryInterface.changeColumn('Files', 'studyMaterialId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'StudyMaterials',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the change by removing the onDelete: 'CASCADE' constraint
    await queryInterface.changeColumn('Files', 'studyMaterialId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'StudyMaterials',
        key: 'id',
      },
      onDelete: null,
      allowNull: false,
    });
  }
};
