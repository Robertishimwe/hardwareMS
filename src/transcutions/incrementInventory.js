const { sequelize, Inventory, Transaction } = require("../database/models");

const incrementInventory = async (productId, amount, userId, buying_price, selling_price, supplier_id) => {

  // productId: DataTypes.INTEGER,
  // quantity: DataTypes.DECIMAL,
  // unitId: DataTypes.INTEGER,
  // minimumStockLevel: DataTypes.DECIMAL,
  // lastUpdatedBy: DataTypes.INTEGER,
  // lastRestockDate: DataTypes.DATE,
  // buying_price: DataTypes.DECIMAL, 
  // selling_price: DataTypes.DECIMAL, 
  // supplier_id: DataTypes.INTEGER,



  try {
    const updatedInventory = await sequelize.transaction(async (t) => {
      const inventory = await Inventory.findOne({
        where: { productId },
        transaction: t,
      });

      if (!inventory) {
        throw new Error('Inventory not found for the product');
      }

      // Increment the quantity in the inventory
      // const updatedQuantity = inventory.quantity + amount;
      const updatedQuantity = parseInt(inventory.quantity) + parseInt(amount);
      inventory.quantity = updatedQuantity;
      inventory.lastUpdatedBy = userId
      inventory.buying_price = buying_price
      inventory.selling_price = selling_price
      inventory.supplier_id = supplier_id
      await inventory.save({ transaction: t });

      // Record the transaction in the Transaction table
      await Transaction.create(
        {
          inventory_id: inventory.id,
          user_id: userId,
          product_id: productId,
          quantity_sold: amount,
          price: amount * inventory.buying_price,
          transaction_type:'IN',
          transaction_date: new Date(),
          supplier_id: inventory.supplier_id

        },
        { transaction: t }
      );

      return inventory;
    });

    console.log('Inventory incremented:', updatedInventory.toJSON());
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error(`Transaction failed: ${error}`);
  }
};

module.exports = incrementInventory;
