const incrementInventory = require("../transcutions/incrementInventory");
const decrementInventory = require("../transcutions/decrementInventory");
const InventoryService = require("../services/inventory.service")

class InventoryController {
  static async increment(req, res) {
    const { productId, amount } = req.body;
    const { id }= req.user

    console.log('<<<<<<<<<id>>>>>',id)
    try {
      const result = await incrementInventory(productId, amount, id);
      return res.status(200).json({ message: "stock was added", result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "action not completed successful", error: error.message });
    }
  }

  static async decrement(req, res) {
    const { productId, amount } = req.body;
    const { id }= req.user
    try {
      const result = await decrementInventory(productId, amount, id);
      return res.status(200).json({ message: "stock was dedacted", result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "action not completed successful", error:error.message });
    }
  }

  static async getAllStock(res, res){
    try {
      const allStock = await InventoryService.findAllStock()
      return res.status(200).json({message:"stock fetched successful", stock: allStock})
    } catch (error) {
      return res.status(500).json({error: error.message})
      
    }

  }
}

module.exports = InventoryController;
