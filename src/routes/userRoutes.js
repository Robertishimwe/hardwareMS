const authController = require("../controllers/authController")
const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();


router.get("/all", authController.createUser)
router.delete("/delete/:id", authController.createUser)

module.exports = router;