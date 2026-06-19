const mongoose =
  require("mongoose");

const performanceSchema =
  new mongoose.Schema(
    {
      studentName: String,
      rollNo: String,
      className: String,

      english: Number,
      marathi: Number,
      hindi: Number,
      sanskrit: Number,
      maths: Number,
      science: Number,
      history: Number,
      geography: Number,
      civics: Number
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Performance",
    performanceSchema
  );