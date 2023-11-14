// Import necessary modules
const { UnitOfMeasurements } = require('../database/models');

// Create UnitOfMeasurementsService class
class UnitOfMeasurementsService {
  // Create a new unit of measurement
  static createUnitOfMeasurement = async (data) => {
    const unitOfMeasurement = await UnitOfMeasurements.create(data);
    return unitOfMeasurement;
  };

  // Update an existing unit of measurement
  static async updateUnitOfMeasurement(unitOfMeasurement, param) {
    const updatedUnitOfMeasurement = await unitOfMeasurement.update(param);
    return updatedUnitOfMeasurement;
  }

  // Find a single unit of measurement by search parameters
  static findUnitOfMeasurement = async (searchParams) => {
    const unitOfMeasurement = await UnitOfMeasurements.findOne({ where: searchParams });

    if (!unitOfMeasurement) {
      throw new Error('Unit of measurement not found');
    }

    return unitOfMeasurement;
  };

  // Find multiple units of measurement by search parameters
  static findUnitsOfMeasurement = async (searchParams) => {
    const unitsOfMeasurement = await UnitOfMeasurements.findAll({ where: searchParams });

    if (!unitsOfMeasurement || unitsOfMeasurement.length === 0) {
      throw new Error('Units of measurement not found');
    }

    return unitsOfMeasurement;
  };

  // Check if a unit of measurement exists based on parameters
  static checkUnitOfMeasurement = async (params) => {
    const unitOfMeasurement = await UnitOfMeasurements.findOne({ where: params });

    if (unitOfMeasurement) {
      throw new Error('Unit of measurement found');
    }

    return unitOfMeasurement;
  };
}

// Export the UnitOfMeasurementsService
module.exports = UnitOfMeasurementsService;
