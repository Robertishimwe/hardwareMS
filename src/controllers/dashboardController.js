const dashboardService = require("../services/dashboard.service");

const {
  getTotalSalesByDate,
 getMostSellingProduct
} = dashboardService;

class DashboardController {
  static getTotalSallesByDateController = async (req, res) => {

    // function to get start and end date of this current month in this format 2024-01-01
    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth() + 1;
    // const currentYear = currentDate.getFullYear();
    // const startDate = `${currentYear}-${currentMonth}-01`;
    // const endDate = `${currentYear}-${currentMonth}-31`;

    // const startDate = '2024-01-01'; // Example start date
    // const endDate = '2024-09-29'; // Example end date

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {

        const sales = await getTotalSalesByDate(startDate, endDate)
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
