const productController = require("../controllers/productController")
const productValidation = require('../validations/productValidation')
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create", productValidation.verifyProduct, productController.createProduct)
router.get('/getAll', productController.findProducts)
// router.post("/login", authController.login)

module.exports = router;