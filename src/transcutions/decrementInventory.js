const { sequelize, Inventory, Transaction } = require("../database/models");

const decrementInventory = async (productId, amount, userId) => {
  try {
    const updatedInventory = await sequelize.transaction(async (t) => {
      const inventory = await Inventory.findOne({
        where: { productId },
        transaction: t,
      });

      if (!inventory) {
        throw new Error('Inventory not found for the product');
      }

      // Ensure there's enough quantity to deduct
      if (inventory.quantity < amount) {
        throw new Error('Insufficient quantity in inventory');
      }

      // Deduct the quantity from the inventory
      const updatedQuantity = inventory.quantity - amount;
      inventory.quantity = updatedQuantity;
      inventory.lastUpdatedBy = userId
      await inventory.save({ transaction: t });

      // Record the transaction in the Transaction table (negative quantity_sold for deduction)
      const transaction = await Transaction.create(
        {
          inventory_id: inventory.id,
          user_id: userId,
          product_id: productId,
          transaction_type:'OUT',
          quantity_sold: -amount, // Negative value for deduction
          transaction_date: new Date(),
        },
        { transaction: t }
      );

      return inventory;
    });

    console.log('Inventory decremented:', updatedInventory.toJSON());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = decrementInventory;
