const DashboardController = require("../controllers/dashboardController")
// const checkAdminOrManager = require('../middleware/checkAdminOrManager');
// const verify = require('../middleware/verify');
// const categoryValidation = require('../validations/supplierValidation')
// const verify = require('../middleware/verify');
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.get('/', DashboardController.getTotalSallesController);
router.get('/mostSellingProduct', DashboardController.getMostSellingProductController)

module.exports = router;