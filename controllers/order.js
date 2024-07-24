const Order = require("../models/Order");
const { Product } = require("../models/Product");
const { Category } = require("../models/Categories");
const mongoose = require("mongoose");

// create new order
// exports.createOrder = async (req, res) => {
//     const { customer, productDetails, subtotal, deliveryFee, tax, totalAmount, billingInformation } = req.body;
//     try {
//         let order = new Order({
//             customer,
//             productDetails,
//             subtotal,
//             deliveryFee,
//             tax,
//             totalAmount,
//             billingInformation
//         });
//         order = await order.save();
//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// };

// create new order
exports.createOrder = async (req, res) => {
  const {
    customer,
    productDetails,
    subtotal,
    deliveryFee,
    totalAmount,
    billingInformation,
    orderNotes,
  } = req.body;

  // Validate product details
  if (!productDetails || productDetails.length === 0) {
    return res.status(400).send({ message: "Product details are required" });
  }

  const productIds = productDetails.map((pd) => pd.productID);
  const products = await Product.find({ _id: { $in: productIds } });
  const categoryIds = products.map((product) => product.information?.category);

  if (categoryIds.length === 0 || categoryIds.includes(undefined)) {
    return res.status(400).send({ message: "Product category is required" });
  }

  const categories = await Category.find({ _id: { $in: categoryIds } });

  let totalCommission = 0;
  // let totalDeliveryFee = 0;

  // Calculate total commission and delivery fees using a for loop
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const category = categories.find(
      (cat) => cat._id.equals(product.information?.category)
    );

    if (category) {
      const commissionRate = category.commissionRate || 0;
      totalCommission += (commissionRate / 100) * subtotal;
      // const deliveryFeeRate = category.deliveryFeeRate || 0;
      // totalDeliveryFee += (deliveryFeeRate / 100) * subtotal;
    }
  }

  console.log(`Total Commission: ${totalCommission}`);

  try {
    let order = new Order({
      customer,
      productDetails: productDetails.map((pd) => ({
        ...pd,
        deliveryOption: pd.deliveryOption,
        pickupAddress:
          pd.deliveryOption === "pickup" ? pd.pickupAddress : undefined,
        orderNotes: pd.orderNotes,
      })),
      subtotal,
      deliveryFee,
      totalAmount: totalAmount + Math.floor(totalCommission),
      billingInformation,
    });

    order = await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status, reason } = req.body;
  try {
    // Check if the order exists
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (order.isPaid === false) {
      return res
        .status(404)
        .json({ success: false, message: "Order is not paid" });
    }
    // Validate the status change
    if (order.status === "cancelled" && status === "cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Order is already cancelled" });
    }

    // Create an update object
    let updateFields = { status };

    // If the status is "canceled", ensure the reason is provided
    if (status === "cancelled") {
      if (!reason) {
        return res.status(400).json({
          success: false,
          message: "Reason is required when canceling an order",
        });
      }
      updateFields.reason = reason;
    }

    // Update the order
    order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateMultipleOrderStatuses = async (req, res) => {
  const { orderIds, status, reason } = req.body;

  console.log(req.body);

  try {
    let existingOrders = await Order.find({ _id: { $in: orderIds } }, "_id");
    let existingOrderIds = existingOrders.map((order) => order._id.toString());

    // Find order IDs that do not exist
    let missingOrderIds = orderIds.filter(
      (id) => !existingOrderIds.includes(id)
    );

    if (missingOrderIds.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Some orders not found",
        missingOrderIds,
      });
    }
    // Prepare the update fields
    let updateFields = { status };
    if (status === "canceled") {
      updateFields.reason = reason;
    }

    // Update orders
    let orders = await Order.updateMany(
      { _id: { $in: orderIds } },
      { $set: updateFields }
    );

    if (orders.nModified === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found to update" });
    }

    res
      .status(200)
      .json({ success: true, message: "orders updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update the isPaid status of an order
// exports.updateIsPaidStatus = async (req, res) => {
//     const { isPaid } = req.body;
//     try {
//         let order = await Order.findByIdAndUpdate(req.params.id, { isPaid }, { new: true });
//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// };

// Update the isPaid status and decrease product quantities
exports.updateIsPaidStatus = async (req, res) => {
  const { isPaid } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update the isPaid status
    order.isPaid = isPaid;

    if (isPaid) {
      // Iterate through productDetails to decrease product quantities
      for (const productDetail of order.productDetails) {
        // console.log(productDetail)
        const product = await Product.findById(productDetail.productID);
        console.log(product);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }

        if (productDetail.quantity > product.pricing.quantity) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient product quantity" });
        }

        // Decrease product quantity
        product.pricing.quantity -= productDetail.quantity;

        // Save the updated product quantity
        await product.save();
      }
    }

    // Mark the order and product(s) as modified
    order.markModified("productDetails");

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update billing information for an order
exports.updateBillingInfo = async (req, res) => {
  const { billingInformation } = req.body;
  try {
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { billingInformation },
      { new: true }
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// // Update a specific product's details within an order
// exports.updateProductDetails = async (req, res) => {
//     const { productIndex, quantity, price, totalPrice } = req.body;
//     try {
//         let order = await Order.findById(req.params.id);
//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         // Update the specified product details
//         if (order.productDetails && order.productDetails[productIndex]) {
//             order.productDetails[productIndex].quantity = quantity;
//             order.productDetails[productIndex].price = price;
//             order.productDetails[productIndex].totalPrice = totalPrice;
//             order.markModified('productDetails'); // Mark the array as modified
//             const updatedOrder = await order.save();
//             res.status(200).json({ success: true, order: updatedOrder });
//         } else {
//             res.status(404).json({ success: false, message: "Product not found in the order" });
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// };

// Update a specific product's details within an order
exports.updateProductDetails = async (req, res) => {
  const {
    productIndex,
    quantity,
    price,
    totalPrice,
    deliveryOption,
    pickupAddress,
  } = req.body;
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update the specified product details
    if (order.productDetails && order.productDetails[productIndex]) {
      order.productDetails[productIndex].quantity = quantity;
      order.productDetails[productIndex].price = price;
      order.productDetails[productIndex].totalPrice = totalPrice;
      order.productDetails[productIndex].deliveryOption = deliveryOption;

      // Conditionally update pickup address
      if (deliveryOption === "pickup") {
        order.productDetails[productIndex].pickupAddress = pickupAddress;
      } else {
        order.productDetails[productIndex].pickupAddress = undefined;
      }

      order.markModified("productDetails"); // Mark the array as modified
      const updatedOrder = await order.save();
      res.status(200).json({ success: true, order: updatedOrder });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product not found in the order" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update the quantity of a specific product within an order
exports.updateProductQuantity = async (req, res) => {
  const { productIndex, quantity } = req.body;
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update the quantity of the specified product
    if (order.productDetails && order.productDetails[productIndex]) {
      order.productDetails[productIndex].quantity = quantity;
      order.markModified("productDetails"); // Mark the array as modified
      const updatedOrder = await order.save();
      res.status(200).json({ success: true, order: updatedOrder });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product not found in the order" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting the order" });
  }
};

// get orders belonging to a particular customer
// exports.getOrdersByCustomer = async (req, res) => {
//     try {
//         const customerId = req.params.customerId;
//         const orders = await Order.find({ customer: customerId });
//         res.status(200).json({ success: true, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orders = await Order.find({ customer: customerId })
      .populate({
        path: "productDetails.productID",
        model: "Product",
        select: "information.productName images",
      })
      .populate({
        path: "productDetails.vendor",
        model: "Vendor",
        select:
          "sellerAccountInformation.shopName businessInformation.address1 businessInformation.city businessInformation.country",
      });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all orders belonging to a particular vendor
// exports.getOrdersByVendor = async (req, res) => {
//     try {
//         const vendorId = req.params.vendorId;
//         const orders = await Order.find({
//             "productDetails.vendor": vendorId
//         }).populate("customer productDetails.productID productDetails.vendor billingInformation");

//         if (!orders) {
//             return res.status(404).send({
//                 message: "Orders not found for the given vendor"
//             });
//         }

//         return res.status(200).send({
//             orders
//         });
//     } catch (error) {
//         return res.status(500).send({
//             error: error.message
//         });
//     }
// };

// // get all orders belonging to a particular vendor
// exports.getOrdersByVendor = async (req, res) => {
//     try {
//         const vendorId = req.params.vendorId;
//         let orders = await Order.find({ "productDetails.vendor": vendorId })
//                                 .populate({
//                                     path: 'customer',
//                                     select: '-password'
//                                 })
//                                 .populate("productDetails.productID productDetails.vendor billingInformation");

//         if (orders.length === 0) {
//             return res.status(404).send({
//                 message: "Orders not found for the given vendor"
//             });
//         }

//         // Filter productDetails to only include products from this vendor
//         orders = orders.map(order => {
//             const filteredProductDetails = order.productDetails.filter(pd => pd.vendor.toString() === vendorId);

//             // Mapping to include only relevant fields
//             const modifiedProductDetails = filteredProductDetails.map(pd => ({
//                 ...pd.toObject(),
//                 // Include other product fields as needed
//                 deliveryOption: pd.deliveryOption,
//                 pickupAddress: pd.pickupAddress
//             }));

//             return { ...order.toObject(), productDetails: modifiedProductDetails };
//         });

//         return res.status(200).send({ orders });
//     } catch (error) {
//         return res.status(500).send({
//             error: error.message
//         });
//     }
// };

exports.getOrdersByVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    let orders = await Order.find({ "productDetails.vendor": vendorId })
      .populate({
        path: "customer",
        select: "-password",
      })
      .populate({
        path: "productDetails.productID", // Assuming this is the correct reference to the Product model
        populate: [
          {
            path: "information.category", // Assuming 'information' contains 'category'
            model: "Category",
          },
          {
            path: "information.subcategory",
            model: "Subcategory",
          },
          {
            path: "vendor",
            select: "name email", // Adjust according to what details you need from the vendor
          },
        ],
      })
      .populate("billingInformation"); // Assuming this is correctly referring to a separate document

    if (orders.length === 0) {
      return res.status(404).send({
        message: "Orders not found for the given vendor",
      });
    }

    // Since product details are already included through population, there's no need to filter or map unless you're modifying or adding to the populated data
    return res.status(200).send({ orders });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

//   get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "productDetails.productID", // Populates product information in productDetails
        populate: {
          path: "vendor", // Further populates vendor information within each product
          model: "Vendor", // Specify the model for vendor population
        },
      })
      .populate("productDetails.vendor", "Vendor"); // Populates vendor information directly referenced in productDetails

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// get products (with all details) by a specific vendor in a given order
exports.getProductsByVendorInOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const vendorId = req.params.vendorId;

  try {
    const order = await Order.findById(orderId).populate({
      path: "productDetails.productID",
      match: { vendor: vendorId },
      populate: { path: "vendor" }, // Populate other fields as needed
    });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Filter productDetails to include only products from the specified vendor
    const filteredProductDetails = order.productDetails.filter(
      (pd) => pd.productID && pd.productID.vendor.toString() === vendorId
    );

    if (filteredProductDetails.length === 0) {
      return res.status(404).send({
        message: "No products found for the given vendor in this order",
      });
    }

    return res.status(200).send({ products: filteredProductDetails });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Get a specific order by its ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate(
      "customer productDetails.productID productDetails.vendor billingInformation"
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({ order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Server Error" });
  }
};

// get aggregated order data for a specific user
exports.getAggregatedOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const aggregation = await Order.aggregate([
      { $match: { customer: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { customer: "$customer", status: "$status", isPaid: "$isPaid" },
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $group: {
          _id: "$_id.customer",
          totalOrders: { $sum: "$count" },
          ordersByStatus: {
            $push: {
              status: "$_id.status",
              count: "$count",
              isPaid: "$_id.isPaid",
            },
          },
          totalAmountSpent: {
            $sum: {
              $cond: [{ $eq: ["$_id.isPaid", true] }, "$totalAmount", 0],
            },
          },
          totalPaidOrders: {
            $sum: {
              $cond: [{ $eq: ["$_id.isPaid", true] }, "$count", 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $project: {
          totalOrders: 1,
          ordersByStatus: 1,
          totalAmountSpent: 1,
          totalPaidOrders: 1,
          userData: {
            firstName: 1,
            lastName: 1,
            email: 1,
            createdAt: 1,
            updatedAt: 1,
            role: 1,
            isAccessRevoked: 1, // Include isAccessRevoked field
          },
        },
      },
    ]);

    if (!aggregation || aggregation.length === 0) {
      return res
        .status(404)
        .json({ message: "No order data found for the specified user." });
    }

    res.json(aggregation[0]);
  } catch (error) {
    console.error("Error fetching aggregated order data:", error);
    res.status(500).json({
      message: "Server error occurred while fetching aggregated order data.",
    });
  }
};

// Get aggregated order data for all users
exports.getAggregatedOrdersByAllUsers = async (req, res) => {
  try {
    const aggregation = await Order.aggregate([
      {
        $group: {
          _id: { customer: "$customer", status: "$status", isPaid: "$isPaid" },
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $group: {
          _id: "$_id.customer",
          totalOrders: { $sum: "$count" },
          ordersByStatus: {
            $push: {
              status: "$_id.status",
              count: "$count",
              isPaid: "$_id.isPaid",
            },
          },
          totalAmountSpent: {
            $sum: {
              $cond: [{ $eq: ["$_id.isPaid", true] }, "$totalAmount", 0],
            },
          },
          totalPaidOrders: {
            $sum: {
              $cond: [{ $eq: ["$_id.isPaid", true] }, "$count", 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $project: {
          totalOrders: 1,
          ordersByStatus: 1,
          totalAmountSpent: 1,
          totalPaidOrders: 1,
          userData: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            status: 1,
            lastLogin: 1,
            phoneNumber: 1,
            email: 1,
            createdAt: 1,
            updatedAt: 1,
            role: 1,
            isAccessRevoked: 1, // Include isAccessRevoked field
          },
        },
      },
    ]);

    if (aggregation.length === 0) {
      return res.status(404).json({ message: "No aggregated data found." });
    }

    res.json(aggregation);
  } catch (error) {
    console.error("Error fetching aggregated order data for all users:", error);
    res.status(500).json({
      message:
        "Server error occurred while fetching aggregated data for all users.",
    });
  }
};

// agggregated order data for a single vendor
exports.getAggregatedDataForVendor = async (req, res) => {
  const vendorId = mongoose.Types.ObjectId(req.params.vendorId);

  try {
    const aggregation = await Order.aggregate([
      { $unwind: "$productDetails" },
      { $match: { "productDetails.vendor": vendorId } },
      {
        $group: {
          _id: {
            status: "$status",
            isPaid: "$isPaid",
            vendor: "$productDetails.vendor",
          },
          count: { $sum: 1 },
          totalSalesAmount: { $sum: "$productDetails.totalPrice" },
        },
      },
      {
        $group: {
          _id: "$_id.vendor",
          ordersDetails: {
            $push: {
              status: "$_id.status",
              isPaid: "$_id.isPaid",
              count: "$count",
              totalSalesAmount: "$totalSalesAmount",
            },
          },
          totalOrders: { $sum: "$count" },
          totalSalesAmount: { $sum: "$totalSalesAmount" },
        },
      },
      {
        $lookup: {
          from: "vendors", // Ensure this matches your actual vendors collection name
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      { $unwind: "$vendorDetails" }, // Assuming each order will have one matching vendor
      {
        $project: {
          totalOrders: 1,
          totalSalesAmount: 1,
          ordersDetails: 1,
          vendorDetails: {
            "sellerAccountInformation.shopName": 1,
            "sellerAccountInformation.entityType": 1,
            "sellerAccountInformation.accountOwnersName": 1,
            "sellerAccountInformation.email": 1,
            "sellerAccountInformation.phoneNumber": 1,
            "sellerAccountInformation.additionalPhoneNumber": 1,
            // Notice how we simply don't mention the password field at all
            // "businessInformation": 1,
            storeStatus: 1,
            vendorBankAccount: 1,
            profilePhoto: 1,
            pickupAddresses: 1,
          },
        },
      },
    ]);

    if (aggregation.length === 0) {
      return res.status(404).json({
        message: "No aggregated data found for the specified vendor.",
      });
    }

    res.json(aggregation[0]); // Assuming there's at least one document returned
  } catch (error) {
    console.error("Error fetching aggregated data for vendor:", error);
    res.status(500).json({
      message:
        "Server error occurred while fetching aggregated data for vendor.",
    });
  }
};

// Aggregated order data for all vendors
exports.getAggregatedDataForAllVendors = async (req, res) => {
  try {
    const aggregation = await Order.aggregate([
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: {
            status: "$status",
            isPaid: "$isPaid",
            vendor: "$productDetails.vendor",
          },
          count: { $sum: 1 },
          totalSalesAmount: { $sum: "$productDetails.totalPrice" },
        },
      },
      {
        $group: {
          _id: "$_id.vendor",
          ordersDetails: {
            $push: {
              status: "$_id.status",
              isPaid: "$_id.isPaid",
              count: "$count",
              totalSalesAmount: "$totalSalesAmount",
            },
          },
          totalOrders: { $sum: "$count" },
          totalSalesAmount: { $sum: "$totalSalesAmount" },
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      { $unwind: "$vendorDetails" },
      {
        $project: {
          totalOrders: 1,
          totalSalesAmount: 1,
          ordersDetails: 1,
          vendorDetails: {
            "sellerAccountInformation.shopName": 1,
            "sellerAccountInformation.entityType": 1,
            "sellerAccountInformation.accountOwnersName": 1,
            "sellerAccountInformation.email": 1,
            "sellerAccountInformation.phoneNumber": 1,
            "sellerAccountInformation.additionalPhoneNumber": 1,
            storeStatus: 1,
            vendorBankAccount: 1,
            profilePhoto: 1,
            pickupAddresses: 1,
            createdAt: 1, // Include createdAt
            updatedAt: 1,
          },
        },
      },
    ]);

    if (aggregation.length === 0) {
      return res.status(404).json({ message: "No aggregated data found." });
    }

    res.json(aggregation); // Return data for all vendors
  } catch (error) {
    console.error("Error fetching aggregated data for all vendors:", error);
    res.status(500).json({
      message:
        "Server error occurred while fetching aggregated data for all vendors.",
    });
  }
};

// getting aggregated data for admin overview page
exports.getAdminOverview = async (req, res) => {
  const { startDate, endDate } = req.params;

  // Calculate the difference in days for averaging
  const diffInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24) + 1; // +1 to include end date

  const matchStage = {
    $match: {
      orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    },
  };

  const groupStage = {
    $group: {
      _id: null,
      totalSales: { $sum: "$totalAmount" },
      totalItemsSold: { $sum: { $size: "$productDetails" } },
      averageOrderValue: { $avg: "$totalAmount" },
      totalOrders: { $sum: 1 },
      totalPendingOrders: {
        $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
      },
      totalFulfilledOrders: {
        $sum: { $cond: [{ $eq: ["$status", "fulfilled"] }, 1, 0] },
      },
      totalFailedOrders: {
        $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
      },
      totalReadyToGoOrders: {
        $sum: { $cond: [{ $eq: ["$status", "readyToGo"] }, 1, 0] },
      },
      totalCompletedOrders: {
        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
      },
      totalReturnedOrders: {
        $sum: { $cond: [{ $eq: ["$status", "returned"] }, 1, 0] },
      },
    },
  };

  const projectStage = {
    $project: {
      _id: 0,
      totalSales: 1,
      totalItemsSold: 1,
      averageOrderValue: 1,
      totalOrders: 1,
      averageDailyRevenues: { $divide: ["$totalSales", diffInDays] },
      averageDailyOrders: { $divide: ["$totalOrders", diffInDays] },
      totalPendingOrders: 1,
      totalFulfilledOrders: 1,
      totalFailedOrders: 1,
      totalReadyToGoOrders: 1,
      totalCompletedOrders: 1,
      totalReturnedOrders: 1,
    },
  };

  try {
    const ordersOverview = await Order.aggregate([
      matchStage,
      groupStage,
      projectStage,
    ]);
    if (ordersOverview.length > 0) {
      res.json(ordersOverview[0]);
    } else {
      res
        .status(404)
        .json({ message: "No orders found in the given date range." });
    }
  } catch (error) {
    console.error("Error fetching admin overview data:", error);
    res.status(500).json({
      message: "Server error occurred while fetching admin overview data.",
    });
  }
};

// getting aggregated data for admin overview page
exports.getAllAdminOverview = async (req, res) => {
  let { startDate, endDate } = req.query;

  // Set default values for startDate and endDate if not provided
  endDate = endDate || new Date(); // Defaults to the current date if endDate is not provided
  startDate =
    startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Defaults to 365 days before the current date

  // Calculate the difference in days for averaging
  const diffInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24) + 1; // +1 to include end date

  try {
    const matchStage = {
      $match: {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        isPaid: true,
      },
    };

    const groupStage = {
      $group: {
        _id: {
          year: { $year: "$orderDate" },
          month: { $month: "$orderDate" },
        },
        overViewDate: { $first: "$orderDate" },
        totalSales: { $sum: "$totalAmount" },
        totalItemsSold: { $sum: { $size: "$productDetails" } },
        averageOrderValue: { $avg: "$totalAmount" },
        totalOrders: { $sum: 1 },
        totalPendingOrders: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
        totalFulfilledOrders: {
          $sum: { $cond: [{ $eq: ["$status", "fulfilled"] }, 1, 0] },
        },
        totalFailedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
        },
        totalReadyToGoOrders: {
          $sum: { $cond: [{ $eq: ["$status", "readyToGo"] }, 1, 0] },
        },
        totalCompletedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        totalReturnedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "returned"] }, 1, 0] },
        },
        productDetails: { $push: "$productDetails" },
      },
    };
    const unwindStage = {
      $unwind: "$productDetails",
    };
    const lookupStage = {
      $lookup: {
        from: "products", // replace with your actual Product collection name
        localField: "productDetails.productID",
        foreignField: "_id",
        as: "productDetails.productInfo",
      },
    };

    const sortStage = {
      $sort: {
        overViewDate: -1, // Use 1 for ascending order or -1 for descending order
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        totalSales: 1,
        totalItemsSold: 1,
        averageOrderValue: 1,
        totalOrders: 1,
        averageDailyRevenues: { $divide: ["$totalSales", diffInDays] },
        averageDailyOrders: { $divide: ["$totalOrders", diffInDays] },
        totalPendingOrders: 1,
        totalFulfilledOrders: 1,
        totalFailedOrders: 1,
        totalReadyToGoOrders: 1,
        totalCompletedOrders: 1,
        totalReturnedOrders: 1,
        productDetails: 1,
        overViewDate: {
          $dateToString: { format: "%Y-%m", date: "$overViewDate" }, // Formatting to Year-Month
        },
      },
    };

    const ordersOverview = await Order.aggregate([
      matchStage,
      groupStage,
      sortStage,
      unwindStage,
      lookupStage,
      projectStage,
    ]);

    // console.log(ordersOverview);

    if (ordersOverview.length > 0) {
      res.json(ordersOverview);
    } else {
      res
        .status(404)
        .json({ message: "No orders found in the given date range." });
    }
  } catch (error) {
    console.error("Error fetching admin overview data:", error);
    res.status(500).json({
      message: "Server error occurred while fetching admin overview data.",
    });
  }
};
// Adjust the path as necessary

exports.getTopProducts = async (req, res) => {
  let { startDate, endDate } = req.query;

  // Set default values for startDate and endDate if not provided
  endDate = endDate || new Date(); // Defaults to the current date if endDate is not provided
  startDate =
    startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Defaults to 365 days before the current date

  try {
    const matchStage = {
      $match: {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        isPaid: true,
      },
    };

    const unwindStage = {
      $unwind: "$productDetails",
    };

    const groupStage = {
      $group: {
        _id: "$productDetails.productID",
        totalItemsSold: { $sum: "$productDetails.quantity" },
        totalSales: {
          $sum: {
            $multiply: ["$productDetails.quantity", "$productDetails.price"],
          },
        }, // Calculate total sales
        productInfo: { $first: "$productDetails" },
      },
    };

    const sortStage = {
      $sort: { totalItemsSold: -1 },
    };

    const lookupStage = {
      $lookup: {
        from: "products", // replace with your actual Product collection name
        localField: "_id",
        foreignField: "_id",
        as: "productInfo",
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        productID: "$_id",
        totalItemsSold: 1,
        totalSales: 1,
        productInfo: { $arrayElemAt: ["$productInfo", 0] },
      },
    };

    const topProducts = await Order.aggregate([
      matchStage,
      unwindStage,
      groupStage,
      sortStage,
      lookupStage,
      projectStage,
    ]);

    if (topProducts.length > 0) {
      res.json(topProducts);
    } else {
      res
        .status(404)
        .json({ message: "No products found in the given date range." });
    }
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({
      message: "Server error occurred while fetching top products.",
    });
  }
};

exports.getProductAnalytics = async (req, res) => {
  let { startDate, endDate } = req.query;

  // Set default values for startDate and endDate if not provided
  endDate = endDate || new Date(); // Defaults to the current date if endDate is not provided
  startDate =
    startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Defaults to 365 days before the current date

  // Calculate the difference in days for averaging
  const diffInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24) + 1; // +1 to include end date

  try {
    const matchStage = {
      $match: {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        isPaid: true,
      },
    };

    const unwindStage = {
      $unwind: "$productDetails",
    };

    const groupStage = {
      $group: {
        _id: "$productDetails.productID",
        totalSales: { $sum: "$productDetails.totalPrice" },
        totalItemsSold: { $sum: "$productDetails.quantity" },
        averageOrderValue: { $avg: "$productDetails.totalPrice" },
        totalOrders: { $sum: 1 },
        totalPendingOrders: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
        totalFulfilledOrders: {
          $sum: { $cond: [{ $eq: ["$status", "fulfilled"] }, 1, 0] },
        },
        totalFailedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
        },
        totalReadyToGoOrders: {
          $sum: { $cond: [{ $eq: ["$status", "readyToGo"] }, 1, 0] },
        },
        totalCompletedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        totalReturnedOrders: {
          $sum: { $cond: [{ $eq: ["$status", "returned"] }, 1, 0] },
        },
        productDetails: { $first: "$productDetails" },
      },
    };

    const lookupStage = {
      $lookup: {
        from: "products", // replace with your actual Product collection name
        localField: "_id",
        foreignField: "_id",
        as: "productInfo",
      },
    };

    const sortStage = {
      $sort: {
        totalSales: -1, // Sorting by total sales in descending order
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        productID: "$_id",
        productInfo: { $arrayElemAt: ["$productInfo", 0] }, // Unwrap the product info
        totalSales: 1,
        totalItemsSold: 1,
        averageOrderValue: 1,
        totalOrders: 1,
        averageDailyRevenues: { $divide: ["$totalSales", diffInDays] },
        averageDailyOrders: { $divide: ["$totalOrders", diffInDays] },
        totalPendingOrders: 1,
        totalFulfilledOrders: 1,
        totalFailedOrders: 1,
        totalReadyToGoOrders: 1,
        totalCompletedOrders: 1,
        totalReturnedOrders: 1,
      },
    };

    const productAnalytics = await Order.aggregate([
      matchStage,
      unwindStage,
      groupStage,
      lookupStage,
      sortStage,
      projectStage,
    ]);

    if (productAnalytics.length > 0) {
      res.json(productAnalytics);
    } else {
      res.status(404).json({
        message: "No product sales data found in the given date range.",
      });
    }
  } catch (error) {
    console.error("Error fetching product analytics data:", error);
    res.status(500).json({
      message: "Server error occurred while fetching product analytics data.",
    });
  }
};

exports.getTopProductsBySales = async (req, res) => {
  let { startDate, endDate } = req.query;

  // Set default values for startDate and endDate if not provided
  endDate = endDate || new Date(); // Defaults to the current date if endDate is not provided
  startDate =
    startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Defaults to 365 days before the current date

  try {
    const matchStage = {
      $match: {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        isPaid: true,
      },
    };

    const unwindStage = {
      $unwind: "$productDetails",
    };

    const groupStage = {
      $group: {
        _id: "$productDetails.productID",
        totalQuantity: { $sum: "$productDetails.quantity" },
        totalSales: { $sum: "$productDetails.totalPrice" },
      },
    };

    const sortStage = {
      $sort: { totalSales: -1 }, // Sort by total sales in descending order
    };

    const lookupStage = {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        productID: "$_id",
        totalQuantity: 1,
        totalSales: 1,
        productDetails: { $arrayElemAt: ["$productDetails", 0] }, // Get the first (and only) product detail
      },
    };

    const topProducts = await Order.aggregate([
      matchStage,
      unwindStage,
      groupStage,
      sortStage,
      lookupStage,
      projectStage,
    ]);

    if (topProducts.length > 0) {
      res.json(topProducts);
    } else {
      res
        .status(404)
        .json({ message: "No products found in the given date range." });
    }
  } catch (error) {
    console.error("Error fetching top products by sales:", error);
    res.status(500).json({
      message: "Server error occurred while fetching top products by sales.",
    });
  }
};

exports.getWeeklySalesOverview = async (req, res) => {
  const { startDate, endDate } = req.params;

  // Match orders within the specified date range
  const matchStage = {
    $match: {
      orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    },
  };

  // Group by day of week to calculate daily sales and counts
  const dailyGroupStage = {
    $group: {
      _id: { $dayOfWeek: "$orderDate" },
      dailySalesPaid: { $sum: { $cond: ["$isPaid", "$totalAmount", 0] } },
      countPaid: { $sum: { $cond: ["$isPaid", 1, 0] } },
      dailySalesNotPaid: {
        $sum: { $cond: [{ $not: "$isPaid" }, "$totalAmount", 0] },
      },
      countNotPaid: { $sum: { $cond: [{ $not: "$isPaid" }, 1, 0] } },
    },
  };

  // Sort by day of the week
  const sortStage = { $sort: { _id: 1 } };

  // Project the final structure for daily overview
  const dailyProjectStage = {
    $project: {
      _id: 0,
      dayOfWeek: {
        $arrayElemAt: [
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          { $subtract: ["$_id", 1] },
        ],
      },
      dailySalesPaid: 1,
      countPaid: 1,
      dailySalesNotPaid: 1,
      countNotPaid: 1,
    },
  };

  // Facet to separate daily overview and summary
  const facetStage = {
    $facet: {
      dailyOverview: [dailyProjectStage], // Use the projected daily overview structure
      summary: [
        // Calculate the summary
        {
          $group: {
            _id: null,
            totalOrders: { $sum: { $add: ["$countPaid", "$countNotPaid"] } },
            totalPaidOrders: { $sum: "$countPaid" },
            totalUnpaidOrders: { $sum: "$countNotPaid" },
            totalSalesPaid: { $sum: "$dailySalesPaid" },
            totalSalesNotPaid: { $sum: "$dailySalesNotPaid" },
          },
        },
        { $project: { _id: 0 } },
      ],
    },
  };

  try {
    const [result] = await Order.aggregate([
      matchStage,
      dailyGroupStage,
      sortStage,
      facetStage,
    ]);
    // Combine daily overview and summary for response
    const response = {
      dailyOverview: result.dailyOverview,
      summary: result.summary[0],
    };
    res.json({ weeklySalesOverview: response });
  } catch (error) {
    console.error("Error fetching weekly sales overview:", error);
    res.status(500).json({
      message: "Server error occurred while fetching weekly sales overview.",
    });
  }
};
