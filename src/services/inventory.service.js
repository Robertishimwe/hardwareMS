
const { Inventory } = require('../database/models');

class InventoryService {


  static async findAllStock(searchParams) {
    try {
      const products = await Product.findAll({ where: searchParams });
      return products;
    } catch (error) {
      throw new Error('Error getting stock');
    }
  }

}

module.exports = InventoryService;
