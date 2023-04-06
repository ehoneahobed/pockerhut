const Rating = require("../models/Rating");
const Product = require("../models/Product");

// create new rating document
exports.createRating = async (req, res) => {
  try {
    const { productId, userId, ratingValue, comment } = req.body;

    const rating = await Rating.create({
      product_id: productId,
      user_id: userId,
      rating: ratingValue,
      comment: comment,
    });

    const product = await Product.findById(productId);

    product.rating_count++;
    product.total_rating += ratingValue;
    product.average_rating = product.total_rating / product.rating_count;

    await product.save();

    res.status(201).json({ message: "Rating created successfully", rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   update existing rating document
exports.updateRating = async (req, res) => {
  try {
    const { ratingId, ratingValue } = req.body;

    const rating = await Rating.findById(ratingId);

    const product = await Product.findById(rating.product_id);

    product.total_rating = product.total_rating - rating.rating + ratingValue;
    product.average_rating = product.total_rating / product.rating_count;

    rating.rating = ratingValue;

    await Promise.all([product.save(), rating.save()]);

    res.status(200).json({ message: "Rating updated successfully", rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   List all ratings for a product
exports.getRatingsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ product_id: productId }).populate(
      "user_id"
    );

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all ratings created by a user
exports.getRatingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ user_id: userId }).populate(
      "product_id"
    );

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   delete a rating document
exports.deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findByIdAndDelete(ratingId);

    const product = await Product.findById(rating.product_id);

    product.rating_count--;
    product.total_rating -= rating.rating;
    product.average_rating = product.total_rating / product.rating_count;

    await product.save();

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*  This function takes in a product ID, user ID, and rating value, and 
adds a new rating document to the Ratings collection for that product 
and user. It then calculates the average rating for the product by 
querying the Ratings collection, and updates the averageRating field 
in the Products collection with the new value.
*/
exports.addRating = async (req, res) => {
  try {
    const { productId, userId, ratingValue } = req.body;

    const rating = await Rating.create({
      product_id: productId,
      user_id: userId,
      rating: ratingValue,
    });

    const product = await Product.findById(productId);

    const ratings = await Rating.find({ product_id: productId });

    let total_rating = 0;
    for (let i = 0; i < ratings.length; i++) {
      total_rating += ratings[i].rating;
    }

    product.total_rating = total_rating;
    product.average_rating = total_rating / ratings.length;

    await product.save();

    res.status(201).json({ message: "Rating added successfully", rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
