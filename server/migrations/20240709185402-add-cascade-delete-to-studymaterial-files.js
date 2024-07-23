'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Files', 'studyMaterialId'); // Remove the existing foreign key constraint
    await queryInterface.addConstraint('Files', {
      fields: ['studyMaterialId'],
      type: 'foreign key',
      name: 'studyMaterialId_fk', // Custom constraint name
      references: {
        table: 'StudyMaterials',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Files', 'studyMaterialId_fk'); // Remove the CASCADE constraint
    await queryInterface.addConstraint('Files', {
      fields: ['studyMaterialId'],
      type: 'foreign key',
      name: 'studyMaterialId_fk', // Custom constraint name
      references: {
        table: 'StudyMaterials',
        field: 'id',
      },
      onDelete: 'SET NULL', // Revert to the previous behavior (or any other desired behavior)
      onUpdate: 'CASCADE',
    });
  }
};
