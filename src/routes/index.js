const express = require("express");

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const unitsRoutes = require('./unitofmeasurementsRoutes')
const SupplierRoutes = require('./supplierRoutes')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/units', unitsRoutes);
router.use('/Supplier', SupplierRoutes)


module.exports = router;