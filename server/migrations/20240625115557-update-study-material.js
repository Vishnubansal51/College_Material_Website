'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StudyMaterials', 'fileUrl');
    // Add more changes if necessary
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StudyMaterials', 'fileUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // Revert other changes if necessary
  }
};
