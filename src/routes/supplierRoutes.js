const SupplierController = require("../controllers/supplierController")
const supplierValidation = require('../validations/supplierValidation')
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create",supplierValidation.verifySupplier, SupplierController.createSupplier);
router.get('/getAll', SupplierController.getAllSuppliers);
// router.post("/login", authController.login)

module.exports = router;