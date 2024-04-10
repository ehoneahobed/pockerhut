const mongoose = require("mongoose");

const weekendKillsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeekendKills", weekendKillsSchema);
