'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Suppliers', key: 'id' },
      },
      unit_id: {
        type: Sequelize.INTEGER,
        references: { model: 'UnitOfMeasurements', key: 'id' },
        onDelete: 'cascade',
      },
      price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};