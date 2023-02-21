const Review = require('../models/review');

// create a new review
// exports.createReview = async (req, res) => {
//   const { user, rating, comment, product } = req.body;

//   try {
//     const newReview = await Review.create({ user, rating, comment, product });
//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

exports.createReview = async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const review = new Review({
        user: req.user._id,
        rating,
        comment,
        product: product._id,
      });
      const createdReview = await review.save();
      product.reviews.push(createdReview._id);
      await product.save();
      res.status(201).json({ message: "Review created successfully", review: createdReview });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating review" });
    }
  };

// get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get a single review by ID
exports.getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// update a review
exports.updateReview = async (req, res) => {
  const { user, rating, comment, product } = req.body;
  const { reviewId } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { user, rating, comment, product },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// delete a review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(deletedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
