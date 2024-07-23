'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StudyMaterials', 'fileUrl', {
      type: Sequelize.STRING,
      allowNull: true // or false, depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StudyMaterials', 'fileUrl');
  }
};
