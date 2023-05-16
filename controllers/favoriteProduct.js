// Import the necessary modules
const FavoriteProduct = require("../models/FavoriteProduct");

// Controller function to add a product to favorites
exports.addToFavorites = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const favoriteProduct = new FavoriteProduct({
      userId,
      productId,
    });

    await favoriteProduct.save();

    res.status(201).json({
      message: "Product added to favorites",
      favoriteProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to get all favorite products of a user
exports.getFavoritesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const favoriteProducts = await FavoriteProduct.find({ userId });

    res.status(200).json({
      favoriteProducts,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to remove a product from favorites
exports.removeFromFavorites = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    await FavoriteProduct.deleteOne({ userId, productId });

    res.status(200).json({
      message: "Product removed from favorites",
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to check if a product is in favorites
exports.checkIfFavorite = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const favoriteProduct = await FavoriteProduct.findOne({
      userId,
      productId,
    });

    res.status(200).json({
      isFavorite: !!favoriteProduct,
    });
  } catch (error) {
    next(error);
  }
};
