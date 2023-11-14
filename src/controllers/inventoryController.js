const incrementInventory = require("../transcutions/incrementInventory");
const decrementInventory = require("../transcutions/decrementInventory");

class InventoryController {
  static async increment(req, res) {
    const { productId, amount } = req.body;
    try {
      const result = await incrementInventory(productId, amount, 1);
      return res.status(200).json({ message: "stock was added", result });
    } catch (error) {
      console.log(error);
    }
  }

  static async decrement(req, res) {
    const { productId, amount } = req.body;
    try {
      const result = await decrementInventory(productId, amount, 1);
      return res.status(200).json({ message: "stock was dedacted", result });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = InventoryController;
