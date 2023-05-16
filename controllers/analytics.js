// I need to export all the functions created here before using them


const Order = require('../models/Order');
const Refund = require('../models/Refund');
const AdminRevenue = require('../models/AdminRevenue');
const Payout = require('../models/Payout');

// get total revenue by day
async function getTotalRevenueByDay(startDate, endDate) {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          status: 'completed',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' },
            day: { $dayOfMonth: '$orderDate' },
          },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);
    return totalRevenue;
  } catch (err) {
    console.error(err);
  }
}

// get total revenue by product
async function getTotalRevenueByProduct(startDate, endDate) {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          status: 'completed',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$productDetails.productName',
          totalRevenue: { $sum: '$productDetails.totalPrice' },
        },
      },
    ]);
    return totalRevenue;
  } catch (err) {
    console.error(err);
  }
}

// get total sales by vendor
async function getTotalSalesByVendor(startDate, endDate) {
  try {
    const totalSales = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          status: 'completed',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$productDetails.vendor',
          totalSales: { $sum: '$productDetails.quantity' },
        },
      },
    ]);
    return totalSales;
  } catch (err) {
    console.error(err);
  }
}

// get total revenue by vendor
async function getTotalRevenueByVendor(startDate, endDate) {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          status: 'completed',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$productDetails.vendor',
          totalRevenue: { $sum: '$productDetails.totalPrice' },
        },
      },
    ]);
    return totalRevenue;
  } catch (err) {
    console.error(err);
  }
}

async function getTotalRefundsByDay(req, res, next) {
  try {
    const { startDate, endDate } = req.params;

    const refunds = await Refund.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const refundsByDay = {};
    refunds.forEach(refund => {
      const date = refund.createdAt.toISOString().split('T')[0];
      if (refundsByDay[date]) {
        refundsByDay[date] += refund.amount;
      } else {
        refundsByDay[date] = refund.amount;
      }
    });

    return res.json(refundsByDay);
  } catch (err) {
    return next(err);
  }
}

async function getTotalRefundsByProduct(req, res, next) {
  try {
    const { startDate, endDate } = req.params;

    const refunds = await Refund.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('product');

    const refundsByProduct = {};
    refunds.forEach(refund => {
      const productName = refund.product.productName;
      if (refundsByProduct[productName]) {
        refundsByProduct[productName] += refund.amount;
      } else {
        refundsByProduct[productName] = refund.amount;
      }
    });

    return res.json(refundsByProduct);
  } catch (err) {
    return next(err);
  }
}

async function getTotalRefundsByVendor(req, res, next) {
  try {
    const { startDate, endDate } = req.params;

    const refunds = await Refund.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('vendor');

    const refundsByVendor = {};
    refunds.forEach(refund => {
      const vendorName = refund.vendor.vendorName;
      if (refundsByVendor[vendorName]) {
        refundsByVendor[vendorName] += refund.amount;
      } else {
        refundsByVendor[vendorName] = refund.amount;
      }
    });

    return res.json(refundsByVendor);
  } catch (err) {
    return next(err);
  }
}


// getNetRevenue controller function
const getNetRevenue = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const orders = await Order.find({
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        status: "completed",
      });
      const refunds = await Refund.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        status: "completed",
      });
      const adminRevenues = await AdminRevenue.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
      const totalOrderAmount = orders.reduce(
        (acc, order) => acc + order.totalAmount,
        0
      );
      const totalRefundAmount = refunds.reduce(
        (acc, refund) => acc + refund.refundAmount,
        0
      );
      const totalAdminRevenue = adminRevenues.reduce(
        (acc, revenue) => acc + revenue.amountEarned,
        0
      );
      const netRevenue = totalOrderAmount - totalRefundAmount - totalAdminRevenue;
      res.status(200).json({
        netRevenue,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  
  // getCommissionEarned controller function
  const getCommissionEarned = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const orders = await Order.find({
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        status: "completed",
      }).populate("productDetails.productName");
      const totalCommissionEarned = orders.reduce((acc, order) => {
        const commissionEarned = order.productDetails.reduce(
          (orderCommission, product) =>
            orderCommission +
            product.productName.commissionRate * product.totalPrice,
          0
        );
        return acc + commissionEarned;
      }, 0);
      res.status(200).json({
        totalCommissionEarned,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  
  // getPayoutsMade controller function
  const getPayoutsMade = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const payouts = await Payout.find({
        payoutDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }).populate("vendor");
      const totalPayouts = payouts.reduce(
        (acc, payout) => acc + payout.amount,
        0
      );
      res.status(200).json({
        totalPayouts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  

//   Analytics for Orders
exports.getOrderAnalytics = async function(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
  
      // Total orders for a specific duration 
      const totalOrders = await Order.countDocuments({
        orderDate: { $gte: startDate, $lte: endDate }
      });
  
      // Average daily orders for that duration
      const numDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
      const avgDailyOrders = Math.round(totalOrders / numDays);
  
      // Pending orders
      const pendingOrders = await Order.countDocuments({
        orderDate: { $gte: startDate, $lte: endDate },
        status: 'pending'
      });
  
      // Fulfilled orders
      const fulfilledOrders = await Order.countDocuments({
        orderDate: { $gte: startDate, $lte: endDate },
        status: 'fulfilled'
      });
  
      // Failed orders
      const failedOrders = await Order.countDocuments({
        orderDate: { $gte: startDate, $lte: endDate },
        status: 'failed'
      });
  
      // Processed orders
      const processedOrders = await Refund.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'processed'
      });
  
      const data = {
        totalOrders,
        avgDailyOrders,
        pendingOrders,
        fulfilledOrders,
        failedOrders,
        processedOrders
      };
  
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
  