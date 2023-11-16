'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' },
        onDelete: 'cascade',
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      unitId: {
        type: Sequelize.INTEGER,
        references: { model: 'UnitOfMeasurements', key: 'id' }
      },
      lastUpdatedBy:{
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      lastRestockDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Inventories');
  }
};