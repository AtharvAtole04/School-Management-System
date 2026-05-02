const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },
    amount: Number,
    method: String,
    transactionId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);