const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  makePayment,
  getPayments,
  getMyPayments,
  generateReceipt
} = require("../controllers/paymentController");

router.post("/pay", makePayment);

router.get("/", getPayments);

router.get("/my-payments", authMiddleware, getMyPayments);

router.get("/receipt/:id", generateReceipt);

module.exports = router;