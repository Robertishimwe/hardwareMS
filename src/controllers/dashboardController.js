const dashboardService = require("../services/dashboard.service");

const {
 getTotalSales
} = dashboardService;

class DashboardController {
  static getTotalSallesController = async (req, res) => {

    try {

        const sales = await getTotalSales()
        return res
        .status(201)
        .json({ message: "total sales", sales });
        
    } catch (error) {

        return res.status(500).json({error: error.message})
    }

  }
}

module.exports = DashboardController;
