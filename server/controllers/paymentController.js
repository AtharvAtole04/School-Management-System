const Payment = require("../models/Payment");
const Student = require("../models/Student");
const User = require("../models/User");
const PDFDocument = require("pdfkit");

const makePayment = async (req, res) => {
  try {
    const { studentId, amount, method } = req.body;

    const payment = await Payment.create({
      studentId,
      amount,
      method,
      transactionId: "TXN" + Date.now()
    });

    const student = await Student.findById(studentId);

    student.paidFees += Number(amount);
    await student.save();

    res.json(payment);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const payments = await Payment.find({
      studentId: user.studentId
    }).populate("studentId");

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate("studentId");

  res.json(payments);
};

const generateReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(
      req.params.id
    ).populate("studentId");

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${payment._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text(
      "School Fee Receipt",
      { align: "center" }
    );

    doc.moveDown();

    doc.fontSize(14).text(
      `Student Name: ${payment.studentId.fullName}`
    );

    doc.text(
      `Class: ${payment.studentId.className}`
    );

    doc.text(
      `Amount Paid: ₹${payment.amount}`
    );

    doc.text(
      `Method: ${payment.method}`
    );

    doc.text(
      `Transaction ID: ${payment.transactionId}`
    );

    doc.text(
      `Date: ${new Date(
        payment.createdAt
      ).toLocaleString()}`
    );

    doc.moveDown();
    doc.text("Thank you for payment.");

    doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  makePayment,
  getMyPayments,
  getPayments,
  generateReceipt
};