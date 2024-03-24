const authController = require("../controllers/authController")
const UserValidation = require('../validations/userValidatin')
const checkAdminOrManager = require('../middleware/checkAdminOrManager');
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/register",checkAdminOrManager, UserValidation.verifyUser, authController.createUser)
router.post("/login", authController.login)

module.exports = router;