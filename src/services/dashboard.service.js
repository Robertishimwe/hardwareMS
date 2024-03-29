const { Transaction, User, Product, Sequelize } = require("../database/models");

class dashboardService {
  static async getTotalSales(startDate, endDate) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          transaction_date: {
            [Sequelize.Op.between]: [startDate, endDate]
          },
          transaction_type: 'OUT'
        },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['price'] 
          }
        ]
      });

      let totalSales = 0;
      for (const transaction of transactions) {
        const quantitySold = parseInt(transaction.quantity_sold);
        const price = parseFloat(transaction.product.price); // Accessing the price of the associated product

        if (!isNaN(quantitySold) && !isNaN(price)) {
          totalSales += quantitySold * price * -1; // Multiply quantity sold with price and add to totalSales
        } else {
          console.log(`Invalid quantity or price for transaction ID: ${transaction.id}`);
        }
      }

      return totalSales;
    } catch (error) {
      throw new Error(`Error calculating total sales: ${error.message}`);
    }
  }

  static async getMostSellingProduct(startDate, endDate) {
    try {
      const mostSellingProduct = await Transaction.findOne({
        attributes: [
          [sequelize.literal('COUNT(`product_id`)'), 'total_sales'], // Count occurrences of product_id
          'product_id'
        ],
        where: {
          transaction_date: {
            [Sequelize.Op.between]: [startDate, endDate]
          },
          transaction_type: 'OUT'
        },
        group: ['product_id'], // Group by product_id
        order: [[sequelize.literal('total_sales'), 'DESC']], // Order by total_sales in descending order
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name'] // Include product id and name for reference
          }
        ]
      });

      return mostSellingProduct;
    } catch (error) {
      throw new Error(`Error finding most selling product: ${error.message}`);
    }
  }
}

module.exports = dashboardService;
