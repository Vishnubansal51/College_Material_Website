'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'upload_date' column from the 'StudyMaterials' table
    await queryInterface.removeColumn('StudyMaterials', 'upload_date');
  },

  down: async (queryInterface, Sequelize) => {
    // Add back the 'upload_date' column to the 'StudyMaterials' table
    await queryInterface.addColumn('StudyMaterials', 'upload_date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  }
};

