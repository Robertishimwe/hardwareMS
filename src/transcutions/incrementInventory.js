const { sequelize, Inventory, Transaction } = require("../database/models");

const incrementInventory = async (productId, amount, userId) => {
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
      await inventory.save({ transaction: t });

      // Record the transaction in the Transaction table
      const transaction = await Transaction.create(
        {
          inventory_id: inventory.id,
          user_id: userId,
          product_id: productId,
          quantity_sold: amount,
          transaction_date: new Date(),
        },
        { transaction: t }
      );

      return inventory;
    });

    console.log('Inventory incremented:', updatedInventory.toJSON());
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

module.exports = incrementInventory;