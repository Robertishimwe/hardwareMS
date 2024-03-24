const productController = require("../controllers/productController")
const productValidation = require('../validations/productValidation')
const checkAdminOrManager = require('../middleware/checkAdminOrManager');
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create",checkAdminOrManager, productValidation.verifyProduct, productController.createProduct)
router.get('/getAll', productController.findProducts)
router.patch('/update/:productId',checkAdminOrManager, productController.updateProduct)
router.delete("/delete/:id",checkAdminOrManager, productController.HardDeleteProduct)

module.exports = router;