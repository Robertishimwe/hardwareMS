const UnitOfMeasurementsController = require("../controllers/unitofmeasurementsController")
// const UserValidation = require('../validations/userValidatin')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create", UnitOfMeasurementsController.createUnitOfMeasurement);
router.use('/getAll', UnitOfMeasurementsController.getAllUnitsOfMeasurement)
// router.post("/login", authController.login)

module.exports = router;