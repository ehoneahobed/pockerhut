const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating");

// Route to create a new rating
router.post("/create", ratingController.createRating);

// Route to update an existing rating
router.put("/update/:ratingId", ratingController.updateRating);

// Route to get all ratings for a product
router.get("/product/:productId", ratingController.getRatingsForProduct);

// Route to get all ratings by a user
router.get("/user/:userId", ratingController.getRatingsByUser);

// Route to delete a rating
router.delete("/:ratingId", ratingController.deleteRating);

// Route to add a new rating and update product's average rating
router.post("/add", ratingController.addRating);

// Route for getting rating stats for a product
router.get("/products/:productId/rating-stats", ratingController.getRatingStatsForProduct);


// Route for getting all rating details for a product
router.get("/products/:productId/details", ratingController.getProductRatingDetails);

module.exports = router;
