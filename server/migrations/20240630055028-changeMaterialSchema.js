'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('StudyMaterials', 'subject', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('StudyMaterials', 'branch', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('StudyMaterials', 'semester', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('StudyMaterials', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('StudyMaterials', 'subject', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('StudyMaterials', 'branch', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('StudyMaterials', 'semester', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('StudyMaterials', 'title', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
