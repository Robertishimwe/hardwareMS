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
            as: 'product'
          }
        ],
        attributes: ['product_id', [Sequelize.fn('SUM', Sequelize.col('quantity_sold')), 'total_sold']],
        group: ['product_id'],
        order: [[Sequelize.literal('total_sold'), 'ASC']],
        limit: 4
      });
  
      if (transactions.length > 0) {
        return transactions;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error getting most selling product: ${error.message}`);
    }
  }
  
}

module.exports = dashboardService;
