const UnitOfMeasurementsController = require("../controllers/unitofmeasurementsController")
const unitValidation = require('../validations/unitValidation')
// const verify = require("../middleware/authenticator")
const express = require("express");

const router = express.Router();

router.post("/create",unitValidation.verifyUnit, UnitOfMeasurementsController.createUnitOfMeasurement);
router.get('/getAll', UnitOfMeasurementsController.getAllUnitsOfMeasurement)
// router.post("/login", authController.login)

module.exports = router;