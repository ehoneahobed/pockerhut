const Order = require("../models/Order");

// create new order
exports.createOrder = async (req, res) => {
    const { customer, productDetails, subtotal, deliveryFee, tax, totalAmount, billingInformation } = req.body;
    try {
        let order = new Order({
            customer,
            productDetails,
            subtotal,
            deliveryFee,
            tax,
            totalAmount,
            billingInformation
        });
        order = await order.save();
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

// update a given order
exports.updateOrder = async (req, res) => {
    const { status } = req.body;
    try {
        let order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, order });
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

// get orders belong to a particular customer
exports.getOrdersByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await Order.find({ customer: customerId });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get orders belonging to a particular vendor
exports.getOrdersByVendor = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        const orders = await Order.find({
            "productDetails.vendor": vendorId
        }).populate("customer productDetails.productName productDetails.vendor billingInformation");

        if (!orders) {
            return res.status(404).send({
                message: "Orders not found for the given vendor"
            });
        }

        return res.status(200).send({
            orders
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

//   get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};
