// Assuming you have Order and PaymentInvoice models already defined
const Order = require("../models/Order");
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

      const deliveryFeeRate = category.deliveryFeeRate || 0;
      const commissionRate = category.commissionRate || 0;

      const deliveryFee = productDetail.totalPrice * (deliveryFeeRate / 100);
      const commission = productDetail.totalPrice * (commissionRate / 100);

      let payout = productDetail.totalPrice - deliveryFee - commission;
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

    // Calculate the start and end dates for the filter
    const currentDate = new Date();
    const filterMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const filterYear = year ? parseInt(year) : currentDate.getFullYear();

    const startDate = new Date(filterYear, filterMonth, 1);
    const endDate = new Date(filterYear, filterMonth + 1, 0);

    const invoices = await PaymentInvoice.find({
      startDate: { $gte: startDate },
      dueDate: { $lte: endDate }
    })
      .populate({
        path: "vendor",
        model: "Vendor",
        select: "-sellerAccountInformation.password" // Exclude the password field
      })
      .populate({
        path: "order",
        populate: {
          path: "productDetails.productID",
          model: "Product"
        }
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
          isPaid: true
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
          salesRevenue
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: enhancedInvoices.length,
      data: enhancedInvoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
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

    let existingInvoices = await PaymentInvoice.find({ _id: { $in: ids } }, "_id");
    let existingOrderIds = existingInvoices.map((invoice) => invoice._id.toString());

    let missingOrderIds = ids.filter(
      (id) => !existingOrderIds.includes(id)
    );

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

exports.getInvoiceTotals = async (req, res) => {
  try {
    const totalPaid = await PaymentInvoice.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$payout" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalUnpaid = await PaymentInvoice.aggregate([
      { $match: { status: "unpaid" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$payout" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalDue = await PaymentInvoice.aggregate([
      {
        $match: {
          dueDate: {
            $lte: new Date(new Date().setDate(new Date().getDate() - 1)),
          },
          status: "unpaid",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$payout" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalInvoices = await PaymentInvoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$payout" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalPaid: totalPaid[0] ? { amount: totalPaid[0].totalAmount, count: totalPaid[0].count } : { amount: 0, count: 0 },
      totalUnpaid: totalUnpaid[0] ? { amount: totalUnpaid[0].totalAmount, count: totalUnpaid[0].count } : { amount: 0, count: 0 },
      totalDue: totalDue[0] ? { amount: totalDue[0].totalAmount, count: totalDue[0].count } : { amount: 0, count: 0 },
      totalInvoices: totalInvoices[0] ? { amount: totalInvoices[0].totalAmount, count: totalInvoices[0].count } : { amount: 0, count: 0 },
    });
  } catch (error) {
    console.error("Error fetching invoice totals:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get the current week number
const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
};
