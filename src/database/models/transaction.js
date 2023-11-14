'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Inventory, {
        foreignKey: 'inventoryId',
        onDelete: 'CASCADE',
        as: 'inventory', // for descriptive queries
      });
      // define association here
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER,
    quantity_sold: DataTypes.DECIMAL,
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};