const dashboardService = require("../services/dashboard.service");

const {
 getTotalSales,
 getMostSellingProduct
} = dashboardService;

class DashboardController {
  static getTotalSallesController = async (req, res) => {

    const startDate = '2024-01-01'; // Example start date
    const endDate = '2024-09-29'; // Example end date

    try {

        const sales = await getTotalSales(startDate, endDate)
        return res
        .status(201)
        .json({ message: "total sales", sales });
        
    } catch (error) {

        return res.status(500).json({error: error.message})
    }

  }

  static getMostSellingProductController = async (req, res) => {

    const startDate = '2024-01-01'; // Example start date
    const endDate = '2024-09-29'; // Example end date

    try {

        const mostSellingProduct = await getMostSellingProduct(startDate, endDate)
        return res
        .status(201)
        .json({ message: "Most selling products", mostSellingProduct });
        
    } catch (error) {
        
    }
  }
}

module.exports = DashboardController;
