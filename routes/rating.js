const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating");

// Route to create a new rating
router.post("/create", ratingController.createRating);

// Route to update an existing rating
router.put("/update/:id", ratingController.updateRating);

// Route to get all ratings for a product
router.get("/product/:productId", ratingController.getRatingsForProduct);

// Route to get all ratings by a user
router.get("/user/:id", ratingController.getRatingsByUser);

// Route to delete a rating
router.delete("/:id", ratingController.deleteRating);

// Route to add a new rating and update product's average rating
router.post("/add", ratingController.addRating);

module.exports = router;
