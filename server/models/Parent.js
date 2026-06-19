const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    childName: {
      type: String,
      required: true
    },
    childRollNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", parentSchema);
