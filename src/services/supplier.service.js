// Import necessary modules
const { Supplier } = require("../database/models");

// Create SupplierService class
class SupplierService {
  // Create a new supplier
  static createSupplier = async (data) => {
    const supplier = await Supplier.create(data);
    return supplier;
  };

  // Update an existing supplier
  static async updateSupplier(supplier, param) {
    const updatedSupplier = await supplier.update(param);
    return updatedSupplier;
  }

  // Find a single supplier by search parameters
  static findSupplier = async (searchParams) => {
    const supplier = await Supplier.findOne({ where: searchParams });

    if (!supplier) {
      throw new Error("Supplier not found");
    }

    return supplier;
  };

  // Find multiple suppliers by search parameters
  static findSuppliers = async (searchParams) => {
    const suppliers = await Supplier.findAll({ where: searchParams });

    // if (!suppliers || suppliers.length === 0) {
    //   throw new Error('Suppliers not found');
    // }

    return suppliers;
  };

  // Check if a supplier exists based on parameters
  static checkSupplier = async (params) => {
    const supplier = await Supplier.findOne({ where: params });

    if (supplier) {
      throw new Error("Supplier found");
    }

    return supplier;
  };

  // Delete an existing supplier
  static async deleteSupplier(supplier) {
    const deletedSupplier = await supplier.destroy();

    if (!deletedSupplier) {
      throw new Error("Failed to delete supplier");
    }

    return deletedSupplier;
  }
}

// Export the SupplierService
module.exports = SupplierService;
