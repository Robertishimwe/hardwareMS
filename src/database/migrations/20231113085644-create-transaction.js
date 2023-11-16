
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' }
      },
      inventory_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Inventories', key: 'id' }
      },
      quantity_sold: {
        type: Sequelize.DECIMAL
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      transaction_date: {
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
    await queryInterface.dropTable('Transactions');
  }
};