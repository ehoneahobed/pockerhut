const Rating = require("../models/Rating");
const Product = require("../models/Product");
const mongoose = require('mongoose');

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
      const ratings = await Rating.find({ product_id: productId });
  
      let totalRating = 0;
      let totalCount = ratings.length;
      for (const rating of ratings) {
        totalRating += rating.rating;
      }
      const avgRating = totalRating / totalCount;
  
      product.avgRating = avgRating;
      await product.save();
  
      res.status(201).json({
        status: "success",
        message: "Rating created successfully",
        rating,
      });
    } catch (error) {
      res.status(500).json({ status: "failed", error: error.message });
    }
  };
  
  

//   update existing rating document
exports.updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { ratingValue, comment } = req.body;

    const rating = await Rating.findById(ratingId);

    const product = await Product.findById(rating.product_id);

    product.total_rating = product.total_rating - rating.rating + ratingValue;
    product.average_rating = product.total_rating / product.rating_count;

    rating.rating = ratingValue;

    await Promise.all([product.save(), rating.save()]);

    res
      .status(200)
      .json({
        status: "success",
        message: "Rating updated successfully",
        rating,
      });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

//   List all ratings for a product
exports.getRatingsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ product_id: productId }).populate({
      path: "user_id",
      select: "-password -createdAt -updatedAt -billing_id",
    });

    res.status(200).json({ status: "success", ratings });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// List all ratings created by a user
exports.getRatingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ user_id: userId }).populate({
      path: "product_id",
    select: "-pricing",
    }
    );

    res.status(200).json({ status: "success", ratings });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
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

    // now update the avgRating field of the Products collection
      const ratings = await Rating.find({ product_id: productId });
  
      let totalRating = 0;
      let totalCount = ratings.length;
      for (const rating of ratings) {
        totalRating += rating.rating;
      }
      const avgRating = totalRating / totalCount;
  
      product.avgRating = avgRating;
      await product.save();

    res
      .status(200)
      .json({ status: "success", message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
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

    res
      .status(201)
      .json({
        status: "success",
        message: "Rating added successfully",
        rating,
      });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};


// get product rating stats
exports.getRatingStatsForProduct = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const ratingStats = await Rating.aggregate([
        { $match: { product_id: mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
            total: { $sum: { $multiply: ["$rating", 1] } }
          }
        },
        {
          $group: {
            _id: null,
            stats: {
              $push: {
                rating: "$_id",
                count: "$count"
              }
            },
            totalRatings: { $sum: "$count" },
            totalRatingValue: { $sum: "$total" }
          }
        },
        {
          $project: {
            _id: 0,
            stats: 1,
            totalRatings: 1,
            avgRating: {
              $cond: {
                if: { $eq: ["$totalRatings", 0] },
                then: 0,
                else: { $divide: ["$totalRatingValue", "$totalRatings"] }
              }
            }
          }
        }
      ]);
  
      res.status(200).json({ status: "success", ratingStats: ratingStats[0] });
    } catch (error) {
      res.status(500).json({ status: "failed", error: error.message });
    }
  };
  