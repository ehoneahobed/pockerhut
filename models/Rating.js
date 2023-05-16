const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create a unique compound index on product_id and user_id
ratingSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;