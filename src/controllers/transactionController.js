const TransactionService = require("../services/transactions.service");
const ProductService = require('../services/product.service');

const { findTransaction, findTransactions } = TransactionService;

class TransactionController {
  static async getAall(req, res) {
    try {
      const transactions = await findTransactions();
      return res
        .status(200)
        .send({ message: "transactions fetched successful", transactions });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Error while fetching transactions", error });
    }
  }

  static async getOneById(req, res) {
    const { id } = req.params;
    try {
      const transaction = await findTransaction({id:id});
      return res
        .status(200)
        .send({ message: "transaction fetched successful", transaction });
    } catch (error) {
      console.log(error.message);
      return res
        .status(400)
        .send({ message: "Error while fetching transaction", error });
    }
  }

  static async getAllByProduct(req, res) {
    const { id } = req.params;
    try {
    await ProductService.findProduct({id:id})
      const transactions = await findTransactions({ product_id: id });
      return res
        .status(200)
        .send({ message: "transactions fetched successful", transactions });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Error while fetching transactions", error: error.toString() });
    }
  }

  static async getAallForCurrentUser(req, res) {
    const { id } = req.user;
    try {
      const transaction = await findTransactions({user_id:id});
      return res
        .status(200)
        .send({ message: "transaction fetched successful", transaction });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Error while fetching transaction", error });
    }
  }
}

module.exports = TransactionController;
