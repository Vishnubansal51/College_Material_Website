'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    });

    await queryInterface.changeColumn('Users', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
      validate: {}
    });

    await queryInterface.changeColumn('Users', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {}
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {}
    });
  }
};
