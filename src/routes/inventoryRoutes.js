const inventoryController = require("../controllers/inventoryController")

// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.patch("/add", inventoryController.increment)
router.patch('/dedact', inventoryController.decrement)
// router.post("/login", authController.login)

module.exports = router;