// Assuming you have Order and PaymentInvoice models already defined
const Order = require("../models/Order");
const mongoose = require("mongoose");
const PaymentInvoice = require("../models/PaymentInvoice");
const Vendor = require("../models/Vendor");
const { Category } = require("../models/Categories");

// Function to create a payment invoice
exports.createPaymentInvoice = async (order) => {
  try {
    const orders = await Order.findById(order).populate(
      "productDetails.productID"
    );
    if (!orders) {
      throw new Error("Order not found");
    }
    for (const productDetail of orders.productDetails) {
      const vendorId = productDetail.vendor;
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        throw new Error(`Vendor not found for ID: ${vendorId}`);
      }

      const product = productDetail.productID;
      const category = await Category.findById(product.information.category);
      if (!category) {
        throw new Error(`Category not found for product: ${product._id}`);
      }

      // const deliveryFeeRate = category.deliveryFeeRate || 0;
      const commissionRate = category.commissionRate || 0;

      // const deliveryFee = productDetail.totalPrice * (deliveryFeeRate / 100);
      const commission = productDetail.totalPrice * (commissionRate / 100);

      let payout = orders.subtotal - commission;
      payout = Math.floor(payout);
      const startDate = orders.orderDate;
      const dueDate = new Date(new Date().setDate(new Date().getDate() + 15));

      // Check for existing invoices within the date range for the vendor
      let existingInvoice = await PaymentInvoice.findOne({
        vendor: vendor._id,
        startDate: { $lte: dueDate },
        dueDate: { $gte: startDate },
      });

      if (existingInvoice) {
        existingInvoice.payout += payout;
        existingInvoice.salesRevenue += productDetail.totalPrice;
        existingInvoice.order.push(order);
        await existingInvoice.save();
        console.log("Existing Payment Invoice updated successfully");
      } else {
        // Create a new invoice for the vendor
        const newInvoice = new PaymentInvoice({
          vendor: vendor._id,
          payout: payout,
          salesRevenue: productDetail.totalPrice,
          status: "unpaid",
          startDate: startDate,
          dueDate: dueDate,
          currentWeek: getCurrentWeek(),
          order: order,
          charges: productDetail.totalPrice - payout,
          refundOnFees: 0,
        });

        await newInvoice.save();
        console.log("New Payment Invoice created successfully");
      }
    }
  } catch (error) {
    console.error("Error creating or updating payment invoice:", error);
  }
};

exports.getAllPaymentInvoices = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentDate = new Date();
    const filterMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const filterYear = year ? parseInt(year) : currentDate.getFullYear();

    const startDate = new Date(filterYear, filterMonth, 1);
    const endDate = new Date(filterYear, filterMonth + 1, 0, 23, 59, 59, 999); // Adjust to include entire last day

    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);

    const invoices = await PaymentInvoice.find({
      startDate: { $lte: new Date() },
      dueDate: { $gte: new Date() },
    })
      .populate({
        path: "vendor",
        model: "Vendor",
        select: "-sellerAccountInformation.password", // Exclude the password field
      })
      .populate({
        path: "order",
        populate: {
          path: "productDetails.productID",
          model: "Product",
        },
      });
    // Enhance invoices with total orders and sales revenue for the range
    const enhancedInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const invoiceStartDate = invoice.startDate;
        const invoiceEndDate = invoice.dueDate;

        console.log(`Invoice vendor: ${invoice.vendor._id}`);

        // Find orders within the date range
        const ordersInRange = await Order.find({
          vendor: invoice.vendor._id,
          orderDate: { $gte: invoiceStartDate, $lte: invoiceEndDate },
          isPaid: true,
        });
        const salesRevenue = ordersInRange.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );
        // Calculate total orders and sales revenue
        const totalOrders = ordersInRange.length;
        return {
          ...invoice._doc,
          totalOrders,
          salesRevenue,
          charges: salesRevenue - (invoice.payout + invoice.refundOnFees || 0),
        };
      })
    );
    return res.status(200).json({
      success: true,
      count: enhancedInvoices.length,
      data: enhancedInvoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.getVendorPaymentInvoices = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { month, year } = req.query;

    if (!vendorId) {
      return res
        .status(400)
        .json({ success: false, error: "Vendor ID is required" });
    }
    const vendor = await Vendor.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }

    // Calculate the start and end dates for the filter
    const currentDate = new Date();
    const filterMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const filterYear = year ? parseInt(year) : currentDate.getFullYear();

    const startDate = new Date(filterYear, filterMonth, 1);
    const endDate = new Date(filterYear, filterMonth + 1, 0);

    const invoices = await PaymentInvoice.find({
      vendor: vendorId,
      startDate: { $gte: startDate },
      dueDate: { $lte: endDate },
    })
      .populate({
        path: "vendor",
        model: "Vendor",
        select: "-sellerAccountInformation.password", // Exclude the password field
      })
      .populate({
        path: "order",
        populate: {
          path: "productDetails.productID",
          model: "Product",
        },
      });
    // Enhance invoices with total orders and sales revenue for the range
    const enhancedInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const invoiceStartDate = invoice.startDate;
        const invoiceEndDate = invoice.dueDate;

        // Find orders within the date range
        const ordersInRange = await Order.find({
          vendor: invoice.vendor._id,
          orderDate: { $gte: invoiceStartDate, $lte: invoiceEndDate },
          isPaid: true,
        });

        const salesRevenue = ordersInRange.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        // Calculate total orders and sales revenue
        const totalOrders = ordersInRange.length;
        return {
          ...invoice._doc,
          totalOrders,
          salesRevenue,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: enhancedInvoices.length,
      data: enhancedInvoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.getVendorStatementTotals = async (req, res) => {
  try {
    const { vendorId } = req.params;

    if (!vendorId) {
      return res
        .status(400)
        .json({ success: false, error: "Vendor ID is required" });
    }
    const vendor = await Vendor.findOne({
      _id: vendorId,
    });
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }

    const vendorObjectId = mongoose.Types.ObjectId(vendorId);
    const invoices = await PaymentInvoice.aggregate([
      { $match: { vendor: vendorObjectId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalPaidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, "$payout", 0],
            },
          },
          totalUnpaidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "unpaid"] }, "$payout", 0],
            },
          },
          totalDueAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "overdue"] }, "$payout", 0],
            },
          },
          paidCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, 1, 0],
            },
          },
          unpaidCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "unpaid"] }, 1, 0],
            },
          },
          dueCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "overdue"] }, 1, 0],
            }
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    const openStatementInvoices = await PaymentInvoice.find({
      vendor: vendorObjectId,
      status: { $ne: "paid" },
      dueDate: { $gte: new Date() },
    })
      .populate({
        path: "vendor",
        model: "Vendor",
        select: "-sellerAccountInformation.password", // Exclude the password field
      })
      .populate({
        path: "order",
        populate: {
          path: "productDetails.productID",
          model: "Product",
        },
      });

    const openStatementAmount = openStatementInvoices.reduce(
      (sum, invoice) => sum + invoice.salesRevenue,
      0
    );

    const result = invoices.map((invoice) => ({
      totalPaid: {
        amount: invoice.totalPaidAmount || 0,
        count: invoice.paidCount || 0,
      },
      totalDueAndUnpaid: {
        amount: invoice.totalDueAmount + invoice.totalUnpaidAmount || 0,
        count: invoice.dueCount + invoice.unpaidCount || 0,
      },
      createdAt: invoice.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: result,
      openStatement: {
        amount: openStatementAmount,
        invoices: openStatementInvoices,
      },
    });
  } catch (error) {
    console.error("Error fetching statement totals:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const invoice = await PaymentInvoice.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }
    const updatedInvoice = await PaymentInvoice.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.updateMultipleStatuses = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !status) {
      return res.status(400).json({
        success: false,
        message: "IDs and status are required",
      });
    }

    let existingInvoices = await PaymentInvoice.find(
      { _id: { $in: ids } },
      "_id"
    );
    let existingOrderIds = existingInvoices.map((invoice) =>
      invoice._id.toString()
    );

    let missingOrderIds = ids.filter((id) => !existingOrderIds.includes(id));

    if (missingOrderIds.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Some invoices not found",
        missingOrderIds,
      });
    }

    const updatedInvoices = await PaymentInvoice.updateMany(
      { _id: { $in: ids } },
      { $set: { status } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Invoices updated successfully",
      data: updatedInvoices,
    });
  } catch (error) {
    console.error("Error updating invoice statuses:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.updateRefundOnFees = async (req, res) => {
  try {
    const { id } = req.params;
    const { refundOnFees } = req.body;

    // Validate the refundOnFees value
    if (typeof refundOnFees !== 'number' || refundOnFees < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid refundOnFees value",
      });
    }

    const invoice = await PaymentInvoice.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }
    if (invoice.status !== "unpaid") {
      return res.status(400).json({
        success: false,
        error: "Refund can only be applied to unpaid invoices",
      });
    }
    invoice.refundOnFees = refundOnFees;
    invoice.charges = invoice.salesRevenue - invoice.payout;
    invoice.payout = invoice.payout - refundOnFees;
    invoice.charges += refundOnFees;
    const savedInvoice = await invoice.save();
    return res.status(200).json({
      success: true,
      data: savedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



exports.getPaymentTracker = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentDate = new Date();
    const filterMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const filterYear = year ? parseInt(year) : currentDate.getFullYear();

    const invoices = await PaymentInvoice.find({
      startDate: { $lte: new Date() },
      dueDate: { $gte: new Date() },
    })
      .populate({
        path: "vendor",
        model: "Vendor",
        select: "-sellerAccountInformation.password",
      })
      .populate({
        path: "order",
        match: { status: "completed" },
        populate: [
          {
            path: "productDetails.productID",
            model: "Product",
            populate: {
              path: "information.category",
              model: "Category",
            },
          },
          {
            path: "billingInformation",
            model: "Billing",
          },
        ],
      });

    // Enhance invoices with total orders, returned orders, and sales revenue for the range
    const enhancedInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const invoiceStartDate = invoice.startDate;
        const invoiceEndDate = invoice.dueDate;

        // Find orders within the date range
        const ordersInRange = await Order.find({
          vendor: invoice.vendor._id,
          orderDate: { $gte: invoiceStartDate, $lte: invoiceEndDate },
          status: "completed",
          isPaid: true,
        });

        // const salesRevenue = ordersInRange.reduce(
        //   (sum, order) => sum + order.totalAmount,
        //   0
        // );

        const payouts = invoice.payout;
        const salesRevenue = invoice.salesRevenue;
        const refundOnFees = invoice.refundOnFees || 0;
        const charges = salesRevenue - (payouts + refundOnFees);
        // Calculate total orders and returned orders
        const totalOrders = ordersInRange.length;
        const returnedOrders = ordersInRange.filter(
          (order) => order.status === "returned"
        ).length;

        return {
          vendorName: invoice.vendor.vendorName,
          storeName: invoice.vendor.storeName,
          period: invoice,
          totalOrders,
          returned: returnedOrders,
          charges,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: enhancedInvoices.length,
      data: enhancedInvoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getInvoiceTotals = async (req, res) => {
  try {
    const totalInvoices = await PaymentInvoice.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalPaidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, "$payout", 0],
            },
          },
          totalUnpaidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "unpaid"] }, "$payout", 0],
            },
          },
          totalDueAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "overdue"] }, "$payout", 0],
            },
          },
          paidCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, 1, 0],
            },
          },
          unpaidCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "unpaid"] }, 1, 0],
            },
          },
          dueCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "overdue"] }, 1, 0],
            },
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const result = totalInvoices.map((invoice) => ({
      totalPaid: {
        amount: invoice.totalPaidAmount || 0,
        count: invoice.paidCount || 0,
      },
      totalUnpaid: {
        amount: invoice.totalUnpaidAmount || 0,
        count: invoice.unpaidCount || 0,
      },
      totalDue: {
        amount: invoice.totalDueAmount || 0,
        count: invoice.dueCount || 0,
      },
      totalInvoices: {
        amount:
          (invoice.totalPaidAmount || 0) + (invoice.totalUnpaidAmount || 0),
        count: (invoice.paidCount || 0) + (invoice.unpaidCount || 0),
      },
      createdAt: invoice.createdAt,
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching invoice totals:", error);
    res.status(500).json({ message: "2Server error" });
  }
};
const updateOverdueInvoices = async () => {
  try {
    const currentDate = new Date();
    const overdueInvoices = await PaymentInvoice.find({
      dueDate: { $lt: currentDate },
      status: { $ne: "overdue" },
    });

    for (let invoice of overdueInvoices) {
      invoice.status = "overdue";
      await invoice.save();
    }

    console.log(
      `Updated ${overdueInvoices.length} invoices to overdue status.`
    );
  } catch (error) {
    console.error("Error updating overdue invoices:", error);
  }
};

// Schedule the update function to run periodically
const schedule = require("node-schedule");
schedule.scheduleJob("0 0 * * *", updateOverdueInvoices); // Runs every day at midnight

// Function to get the current week number
const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
};
