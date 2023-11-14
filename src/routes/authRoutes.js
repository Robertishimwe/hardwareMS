const authController = require("../controllers/authController")
const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/register", UserValidation.verifyUser, authController.createUser)
router.post("/login", authController.login)

module.exports = router;