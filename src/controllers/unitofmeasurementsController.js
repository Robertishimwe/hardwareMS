const UnitOfMeasurementsService = require('../services/unitofmeasurements.service')

const { createUnitOfMeasurement, updateUnitOfMeasurement, findUnitsOfMeasurement, findUnitOfMeasurement, checkUnitOfMeasurement } = UnitOfMeasurementsService

class UnitOfMeasurementsController {

    static createUnitOfMeasurement = async (req, res) => {
        try {
            const check = {
                unit_name: req.body.unit_name,
            };
            await checkUnitOfMeasurement(check);
            const Unit = await createUnitOfMeasurement(check);
            return res.status(201).json({ message: "UnitOfMeasurements was added successful", Unit: Unit })
        } catch (error) {
            if (error.message === 'Found') {
                return res.status(409).json({ error: 'UnitOfMeasurements already exists' });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static getAllUnitsOfMeasurement = async (req, res) => {
        try {
            const units = await findUnitsOfMeasurement()
            return res.status(200).json({ units })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static getUnitOfMeasurement = async (req, res) => {
        try {
            const { id } = req.params
            const unit = await findUnitOfMeasurement({ id })
            return res.status(200).json({ unit })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

}

module.exports = UnitOfMeasurementsController;