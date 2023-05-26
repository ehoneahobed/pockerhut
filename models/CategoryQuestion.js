const mongoose = require("mongoose");

const categoryQuestionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("CategoryQuestion", categoryQuestionSchema);
