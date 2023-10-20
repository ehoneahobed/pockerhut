const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

// Create a new order
router.post("/", orderController.createOrder);

// Update the order status
router.put("/:id/status", orderController.updateOrderStatus);

// Update the isPaid status
router.put("/:id/isPaid", orderController.updateIsPaidStatus);

// Update the billing information for an order
router.put("/:id/billingInfo", orderController.updateBillingInfo);

// Update the details of a specific product within an order
router.put("/:id/productDetails", orderController.updateProductDetails);

// Update the quantity of a specific product within an order
router.put("/:id/productQuantity", orderController.updateProductQuantity);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

// Get orders belonging to a particular customer
router.get("/customer/:customerId", orderController.getOrdersByCustomer);

// Get orders belonging to a particular vendor
router.get("/vendor/:vendorId", orderController.getOrdersByVendor);

// Get all orders
router.get("/", orderController.getAllOrders);

module.exports = router;
