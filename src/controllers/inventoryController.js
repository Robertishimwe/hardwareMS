const incrementInventory = require("../transcutions/incrementInventory");
const decrementInventory = require("../transcutions/decrementInventory");
const InventoryService = require("../services/inventory.service");

class InventoryController {
  static async increment(req, res) {
    const product = req.body;
    const { productId, amount, buying_price, selling_price, supplier_id } = product[0];
    const { id } = req.user;

    try {
      const result = await incrementInventory(productId, amount, id, buying_price, selling_price, supplier_id);
      return res.status(200).json({ message: "stock was added", result });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          message: "action not completed successful",
          error: error.message,
        });
    }
  }

  static async decrement(req, res) {
    const transactions = req.body;
    const { id } = req.user;
    try {
      const result = await decrementInventory(transactions, id);
      return res.status(200).json({ message: "stock was dedacted", result });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({
          message: "action not completed successful",
          error: error.message,
        });
    }
  }
  /* new which accepts many products at once */

  static async getAllStock(req, res) {
    try {
      const allStock = await InventoryService.findAllStock();
      return res
        .status(200)
        .json({ message: "stock fetched successful", stock: allStock });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = InventoryController;
