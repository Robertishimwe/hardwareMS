const inventoryController = require("../controllers/inventoryController")
const stockValidation = require('../validations/inventoryValidation')
const verify = require('../middleware/verify');

// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.patch("/add",verify,stockValidation.verifyStockAddition, inventoryController.increment)
router.patch('/dedact',verify, stockValidation.verifyStockDeduction, inventoryController.decrement)
router.get("/getAllStock", verify, inventoryController.getAllStock)
// router.post("/login", authController.login)

module.exports = router;