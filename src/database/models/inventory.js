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

      Inventory.belongsTo(models.Supplier, {
        foreignKey: 'supplierId',
        onDelete: 'CASCADE',
        as: 'Supplier' // for descriptive queries
      });

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
    lastRestockDate: DataTypes.DATE,
    buyingPrice: DataTypes.DECIMAL, // add the new buying price field
    sellingPrice: DataTypes.DECIMAL, // add the new selling price field
    supplierId: DataTypes.INTEGER, // add the new supplier ID field
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};
