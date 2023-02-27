const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id, 'items.product': req.body.product },
      {
        $inc: { 'items.$.quantity': req.body.quantity },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
    if (cart) {
      return res.status(200).json(cart);
    }
    const newCart = await Cart.create({
      user: req.user._id,
      items: [{ product: req.body.product, quantity: req.body.quantity }],
    });
    return res.status(201).json(newCart);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id, 'items._id': req.params.itemId },
      {
        $set: { 'items.$.quantity': req.body.quantity, 'items.$.orderNotes': req.body.orderNotes, updatedAt: new Date() },
      },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { _id: req.params.itemId } }, $set: { updatedAt: new Date() } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [], updatedAt: new Date() } },
      { new: true }
    );
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
