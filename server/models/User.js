const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "parent", "student"],
      default: "student"
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      default: null
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isApproved: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    verificationToken: {
      type: String,
      default: null
    },

    verificationExpiry: {
      type: Date,
      default: null
    },

    resetToken: {
      type: String,
      default: null
    },

    resetTokenExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);