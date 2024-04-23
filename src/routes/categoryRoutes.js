const categoryController = require("../controllers/CategoryController")
const checkAdminOrManager = require('../middleware/checkAdminOrManager');
const verify = require('../middleware/verify');
// const categoryValidation = require('../validations/supplierValidation')
// const verify = require('../middleware/verify');
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/add",checkAdminOrManager, categoryController.createCategory);
router.get('/getAll', categoryController.getAllCategories);
router.patch('/:id/update',checkAdminOrManager, categoryController.updateCategory);
router.delete('/:id/delete',checkAdminOrManager, categoryController.deleteCategory)
// router.post("/login", authController.login)

module.exports = router;