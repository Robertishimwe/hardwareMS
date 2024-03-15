'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Inventories', 'minimumStockLevel', {
      type: Sequelize.DECIMAL,
      allowNull: false // or true, depending on your needs
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Inventories', 'minimumStockLevel');
  }
};
