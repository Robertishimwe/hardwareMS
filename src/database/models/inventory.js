'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        as: 'product' // for descriptive queries
      });

      Inventory.belongsTo(models.UnitOfMeasurements, {
        foreignKey: 'unitId',
        onDelete: 'CASCADE',
        as: 'unit' // for descriptive queries
      });

      // Inventory.hasOne(models.Transaction, {
      //   foreignKey: 'inventoryId',
      //   onDelete: 'CASCADE',
      //   as: 'transaction', // for descriptive queries
      // });

      Inventory.belongsTo(models.User, {
        foreignKey: 'lastUpdatedBy',
        onDelete: 'CASCADE',
        as: 'User' // for descriptive queries
      });
      // define association here
    }
  }
  Inventory.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unitId: DataTypes.INTEGER,
    minimumStockLevel: DataTypes.DECIMAL,
    lastUpdatedBy: DataTypes.INTEGER,
    lastRestockDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};