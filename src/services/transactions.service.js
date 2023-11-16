const { Transaction, Sequelize } = require("../database/models");

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
      const transactions = await Transaction.findAll({ where: searchParams });

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


}

module.exports = TransactionService;
