const { Transaction, User, Product, Sequelize } = require("../database/models");

class dashboardService {
  static async getTotalSalesByDate(startDate, endDate) {
    try {
      // const today = new Date();
      // const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
      const transactions = await Transaction.findAll({
        where: {
          transaction_date: {
            [Sequelize.Op.between]: [startDate, endDate]
          },
          transaction_type: 'OUT'
        }
      });
  
      let totalSales = 0;
      for (const transaction of transactions) {
        const quantitySold = parseInt(transaction.quantity_sold);
        const price = parseFloat(transaction.price);
  
        if (!isNaN(quantitySold) && !isNaN(price)) {
          totalSales += quantitySold * price;
        } else {
          console.log(`Invalid quantity or price for transaction ID: ${transaction.id}`);
        }
      }
  
      return totalSales;
    } catch (error) {
      throw new Error(`Error calculating today's sales: ${error.message}`);
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
        order: [[Sequelize.literal('total_sold'), 'DESC']],
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
