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

// Get all orders belonging to a particular vendor
router.get("/vendor/:vendorId", orderController.getOrdersByVendor);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get details of a specific order
router.get("/:id", orderController.getOrderById);

// Get products by a specific vendor in a given order
router.get("/:orderId/vendor/:vendorId/products", orderController.getProductsByVendorInOrder);


// Get aggregated order data for a specific user
router.get("/aggregate/user/:userId", orderController.getAggregatedOrdersByUser);

// Get aggregated order data for all users
router.get("/aggregate/users", orderController.getAggregatedOrdersByAllUsers);

// Get aggregated order data for a specific vendor
router.get("/aggregate/vendor/:vendorId", orderController.getAggregatedDataForVendor);

// Get aggregated order data for all vendors
router.get("/aggregate/vendors", orderController.getAggregatedDataForAllVendors );

// getting aggregated data for admin dashboard overview page

// Admin dashboard overview route
router.get("/admin/overview/:startDate/:endDate", orderController.getAdminOverview);

// Weekly sales overview route
router.get("/admin/weekly-sales/:startDate/:endDate", orderController.getWeeklySalesOverview);

module.exports = router;
