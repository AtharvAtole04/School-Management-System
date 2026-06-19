const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  className: String,
  section: String,
  rollNo: String,
  parentName: String,
  mobile: String,
  totalFees: Number,
  paidFees: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);