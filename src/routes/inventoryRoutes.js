const inventoryController = require("../controllers/inventoryController")
const stockValidation = require('../validations/inventoryValidation')

// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.patch("/add",stockValidation.verifyStockAddition, inventoryController.increment)
router.patch('/dedact',stockValidation.verifyStockDeduction, inventoryController.decrement)
// router.post("/login", authController.login)

module.exports = router;