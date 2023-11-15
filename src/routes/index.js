const express = require("express");

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const unitsRoutes = require('./unitofmeasurementsRoutes');
const SupplierRoutes = require('./supplierRoutes');
const stockRoutes = require('./inventoryRoutes');
const userRoutes = require('./userRoutes');

const verify = require('../middleware/verify');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product',verify, productRoutes);
router.use('/units',verify, unitsRoutes);
router.use('/supplier',verify, SupplierRoutes);
router.use('/stock',verify, stockRoutes);
router.use('/user',verify, userRoutes);


module.exports = router;