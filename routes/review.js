const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");

// Create a new review
router.post("/reviews", reviewController.createReview);

// Retrieve all reviews
router.get("/reviews", reviewController.getAllReviews);

// Retrieve a single review with reviewId
router.get("/reviews/:reviewId", reviewController.getReviewById);

// Update a review with reviewId
router.put("/reviews/:reviewId", reviewController.updateReview);

// Delete a review with reviewId
router.delete("/reviews/:reviewId", reviewController.deleteReview);

module.exports = router;
