const TransactionController = require("../controllers/transactionController");

const express = require("express");

const router = express.Router();

const { getAall, getAallForCurrentUser, getAllByProduct, getOneById } = TransactionController;

router.get("/getAll", getAall);
router.get("/getAllForCurrentUser", getAallForCurrentUser);
router.get("/getAllForProduct/:id", getAllByProduct);
router.get("/getOne/:id", getOneById);

module.exports = router;
