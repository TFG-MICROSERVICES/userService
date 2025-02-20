'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'country', 'autonomous_region');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'autonomous_region', 'country');
    },
};
