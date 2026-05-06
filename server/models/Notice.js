const mongoose =
  require("mongoose");

const noticeSchema =
  new mongoose.Schema(
    {
      text: String
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Notice",
    noticeSchema
  );