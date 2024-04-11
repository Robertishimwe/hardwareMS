const DashboardController = require("../controllers/dashboardController")
const express = require("express");
const moment = require('moment'); // Add this line to import moment.js

const router = express.Router();

router.get('/getSalesByDate', function(req, res, next) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if(!startDate || !endDate) {
        return res.status(400).json({ error: "Both startDate and endDate are required" });
    }

    if(!moment(startDate, 'YYYY-MM-DD', true).isValid() || !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ error: "Invalid date format. Expected format is 'YYYY-MM-DD'" });
    }

    DashboardController.getTotalSallesByDateController(req, res, next);
});

router.get('/mostSellingProduct', DashboardController.getMostSellingProductController)

module.exports = router;
