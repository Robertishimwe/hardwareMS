const categoryController = require("../controllers/CategoryController")
// const categoryValidation = require('../validations/supplierValidation')
// const verify = require('../middleware/verify');
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/add", categoryController.createCategory);
router.get('/getAll', categoryController.getAllCategories);
router.patch('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory)
// router.post("/login", authController.login)

module.exports = router;