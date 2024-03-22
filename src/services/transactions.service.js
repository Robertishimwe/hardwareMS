const { Transaction, User, Product, Sequelize } = require("../database/models");

class TransactionService {
  static async findTransaction(searchParams) {
    try {
      const transaction = await Transaction.findOne({ where: searchParams });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      return transaction;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findTransactions(searchParams) {
    try {
      const transactions = await Transaction.findAll({ where: searchParams, include: [
        { model: Product, as: 'product',
        attributes: {
          exclude: [
            "id",
            "unit_id",
            "createdAt",
            "updatedAt",
            "supplier_id",
          ], // Exclude unnecessary fields from Product
        }, },

        { model: User, as: 'User',
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "phone",
            "role",
            "id",
          ], // Exclude sensitive fields from User
        }, },
        { model: UnitOfMeasurements, as: 'unit' },
      ], });

      // if (!transactions || transactions.length === 0) {
      //   throw new Error("Transactions not found");
      // }

      return transactions;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findTransactionsByKeyword(keyword) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Sequelize.Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("user_id")),
              "LIKE",
              `%${keyword.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("product_id")),
              "LIKE",
              `%${keyword.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("inventory_id")),
              "LIKE",
              `%${keyword.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("quantity_sold")),
              "LIKE",
              `%${keyword.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("transaction_date")),
              "LIKE",
              `%${keyword.toLowerCase()}%`
            ),
          ],
        },
      });

      if (!transactions || transactions.length === 0) {
        throw new Error("Transactions not found for the provided keyword");
      }

      return transactions;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteTransaction(searchParams) {
    try {
      const transaction = await Transaction.findOne({ where: searchParams });
  
      if (!transaction) {
        throw new Error("Transaction not found");
      }
  
      await transaction.destroy();
  
      return { message: "Transaction deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = TransactionService;
