const express = require("express");

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const unitsRoutes = require('./unitofmeasurementsRoutes');
const SupplierRoutes = require('./supplierRoutes');
const stockRoutes = require('./inventoryRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/units', unitsRoutes);
router.use('/supplier', SupplierRoutes);
router.use('/stock', stockRoutes);
router.use('/user', userRoutes);


module.exports = router;