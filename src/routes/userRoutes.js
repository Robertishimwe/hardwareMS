const usersController = require("../controllers/userController")
const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();


router.get("/getAll", usersController.getAllUsers)
router.get("/:id", usersController.getUser)
router.patch("/update/:id", usersController.updateUserProfile)
// router.delete("/delete/:id", authController.createUser)

module.exports = router;