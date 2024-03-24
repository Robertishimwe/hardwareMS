const UnitOfMeasurementsController = require("../controllers/unitofmeasurementsController")
const unitValidation = require('../validations/unitValidation')
const checkAdminOrManager = require('../middleware/checkAdminOrManager');

const express = require("express");

const router = express.Router();

router.post("/create",checkAdminOrManager,unitValidation.verifyUnit, UnitOfMeasurementsController.createUnitOfMeasurement);
router.get('/getAll', UnitOfMeasurementsController.getAllUnitsOfMeasurement)

module.exports = router;