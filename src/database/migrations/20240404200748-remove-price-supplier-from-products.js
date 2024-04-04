'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'price');
    await queryInterface.removeColumn('Products', 'supplier_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'price', {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn('Products', 'supplier_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Suppliers', key: 'id' },
    });
  }
};
