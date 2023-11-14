const productController = require("../controllers/productController")
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create", productController.createProduct)
router.get('/getAll', productController.findProducts)
// router.post("/login", authController.login)

module.exports = router;