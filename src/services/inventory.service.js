
const { Inventory } = require('../database/models');
const product = require('../database/models/product');

class InventoryService {


  static async findAllStock(searchParams) {
    try {
      const inventories = await Inventory.findAll({ where: searchParams, include: [{ model: product }] });
      return inventories;
    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = InventoryService;
