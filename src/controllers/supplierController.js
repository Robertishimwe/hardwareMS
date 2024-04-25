const SupplierService = require('../services/supplier.service')

const { createSupplier, updateSupplier, findSupplier, findSuppliers, checkSupplier } = SupplierService

class SupplierController {

    static createSupplier = async (req, res) => {
        try {
            const check = {
                supplierName: req.body.supplierName,
            };
            await checkSupplier(check);
            const supplier = await createSupplier({
                supplierName: req.body.supplierName,
                contact: req.body.contact,
            });
            return res.status(201).json({ message: "supplier was added successful", supplier: supplier })
        } catch (error) {
            if (error.message === 'Found') {
                return res.status(409).json({ error: 'supplier already exists' });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static getAllSuppliers = async (req, res) => {
        try {
            const suppliers = await findSuppliers()
            return res.status(200).json({ suppliers })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static getSupplier = async (req, res) => {
        try {
            const { id } = req.params
            const suppliers = await findSupplier({ id })
            return res.status(200).json({ suppliers })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static updateSupplier = async (req, res) => {
        try {
            const { id } = req.params;
            const Supplier = await findSupplier({ id });
      
            if (!Supplier) {
              return res.status(404).json({ error: "Supplier not found" });
            }
      
            const updatedSupplier = await updateSupplier(Supplier, req.body);
            return res
              .status(200)
              .json({ message: "Supplier updated successfully", updatedSupplier });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

}

module.exports = SupplierController;