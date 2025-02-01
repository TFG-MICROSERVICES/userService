'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      main_sport_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        max: 255,
      },
      image_profile: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        max: 20,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
      },
      autonomous_region: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
