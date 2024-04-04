'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Inventories',
      'buying_price',
      {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Inventories',
        'selling_price',
        {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0
        }
      );
    }).then(() => {
      return queryInterface.addColumn(
        'Inventories',
        'supplier_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Suppliers',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Inventories',
      'buying_price'
    ).then(() => {
      return queryInterface.removeColumn(
        'Inventories',
        'selling_price'
      );
    }).then(() => {
      return queryInterface.removeColumn(
        'Inventories',
        'supplier_id'
      );
    });
  }
};
