const TransactionController = require("../controllers/transactionController");
const checkAdminOrManager = require('../middleware/checkAdminOrManager');

const express = require("express");

const router = express.Router();

const { getAall, getAallForCurrentUser, getAllByProduct, getOneById, deleteTransuction } = TransactionController;

router.get("/getAll",checkAdminOrManager, getAall);
router.get("/getAllForCurrentUser", getAallForCurrentUser);
router.get("/getAllForProduct/:id", getAllByProduct);
router.get("/getOne/:id", getOneById);
router.delete("/delete/:id",checkAdminOrManager, deleteTransuction)

module.exports = router;
