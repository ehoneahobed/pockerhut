const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");

// Create a new review
router.post("/", reviewController.createReview);

// Retrieve all reviews
router.get("/", reviewController.getAllReviews);

// Retrieve a single review with reviewId
router.get("/:reviewId", reviewController.getReviewById);

// Update a review with reviewId
router.put("/:reviewId", reviewController.updateReview);

// Delete a review with reviewId
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;
