const inventoryController = require("../controllers/inventoryController")
const stockValidation = require('../validations/inventoryValidation')
const checkAdminOrManager = require('../middleware/checkAdminOrManager');

const express = require("express");

const router = express.Router();

// router.patch("/add",checkAdminOrManager, stockValidation.verifyStockAddition, inventoryController.increment)
router.patch("/add",checkAdminOrManager, inventoryController.increment)
router.patch('/dedact', stockValidation.verifyStockDeduction, inventoryController.decrement)
router.get("/getAllStock",  inventoryController.getAllStock)
// router.post("/login", authController.login)

module.exports = router;