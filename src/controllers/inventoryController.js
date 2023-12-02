const incrementInventory = require("../transcutions/incrementInventory");
const decrementInventory = require("../transcutions/decrementInventory");
const InventoryService = require("../services/inventory.service")

class InventoryController {
  static async increment(req, res) {
    const product = req.body;
    const { productId, amount } = product[0];
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
/////// commented out for now 
  // static async decrement(req, res) {
  //   const { productId, amount } = req.body;
  //   const { id }= req.user
  //   try {
  //     const result = await decrementInventory(productId, amount, id);
  //     return res.status(200).json({ message: "stock was dedacted", result });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "action not completed successful", error:error.message });
  //   }
  // }

///// commented out for now
/* new which accepts many products at once */
static async decrement(req, res) {
  const transactions = req.body;
  const { id }= req.user
  try {
    const result = await decrementInventory(transactions, id);
    return res.status(200).json({ message: "stock was dedacted", result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "action not completed successful", error:error.message });
  }
}
/* new which accepts many products at once */

  static async getAllStock(req, res){
    try {
      const allStock = await InventoryService.findAllStock()
      return res.status(200).json({message:"stock fetched successful", stock: allStock})
    } catch (error) {
      return res.status(500).json({error: error.message})
      
    }

  }
}

module.exports = InventoryController;
