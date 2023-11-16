'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


      Product.belongsTo(models.UnitOfMeasurements, {
        foreignKey: 'unit_id', // Foreign key in the Product table referencing UnitOfMeasurements
        onDelete: 'CASCADE',
        as: 'unit' // Optional alias for more descriptive queries
      });


      Product.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id', // Foreign key in the Product table referencing UnitOfMeasurements
        onDelete: 'CASCADE',
        as: 'Supplier' // Optional alias for more descriptive queries
      });


      // Product.hasOne(models.Inventory, {
      //   foreignKey: 'productId',
      //   onDelete: 'CASCADE',
      //   as: 'inventory' // Optional, but can be used for more descriptive queries
      // });
      // define association here
    }
  }
  Product.init({
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    supplier_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};