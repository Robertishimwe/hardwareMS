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
        }
      });

      let totalSales = 0;
      for (const transaction of transactions) {
        totalSales += transaction.quantity_sold;
      }

      return totalSales;
    } catch (error) {
      throw new Error(`Error calculating total sales: ${error.message}`);
    }
  }
}

module.exports = dashboardService;
