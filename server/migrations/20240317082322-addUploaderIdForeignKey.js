'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('StudyMaterials', {
      fields: ['uploader_id'],
      type: 'foreign key',
      name: 'fk_study_materials_uploader_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('StudyMaterials', 'fk_study_materials_uploader_id');
  }
};
