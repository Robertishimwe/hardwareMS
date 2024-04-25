const SupplierController = require("../controllers/supplierController")
const supplierValidation = require('../validations/supplierValidation')
const checkAdminOrManager = require('../middleware/checkAdminOrManager');

const express = require("express");

const router = express.Router();

router.post("/create",checkAdminOrManager,supplierValidation.verifySupplier, SupplierController.createSupplier);
router.get('/getAll', SupplierController.getAllSuppliers);
router.patch("/:id/update", SupplierController.updateSupplier)
// router.post("/login", authController.login)

module.exports = router;