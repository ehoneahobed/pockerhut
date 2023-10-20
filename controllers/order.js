const Order = require("../models/Order");
const Product = require("../models/Product");

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

// update the orderStatus of a given order
exports.updateOrderStatus = async (req, res) => {
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
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the isPaid status
        order.isPaid = isPaid;

        if (isPaid) {
            // Iterate through productDetails to decrease product quantities
            for (const productDetail of order.productDetails) {
                // console.log(productDetail)
                const product = await Product.findById(productDetail.productID);
                console.log(product)
                if (!product) {
                    return res.status(404).json({ success: false, message: "Product not found" });
                }

                if (productDetail.quantity > product.pricing.quantity) {
                    return res.status(400).json({ success: false, message: "Insufficient product quantity" });
                }

                // Decrease product quantity
                product.pricing.quantity -= productDetail.quantity;

                // Save the updated product quantity
                await product.save();
            }
        }

        // Mark the order and product(s) as modified
        order.markModified('productDetails');

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
        let order = await Order.findByIdAndUpdate(req.params.id, { billingInformation }, { new: true });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

// Update a specific product's details within an order
exports.updateProductDetails = async (req, res) => {
    const { productIndex, quantity, price, totalPrice } = req.body;
    try {
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the specified product details
        if (order.productDetails && order.productDetails[productIndex]) {
            order.productDetails[productIndex].quantity = quantity;
            order.productDetails[productIndex].price = price;
            order.productDetails[productIndex].totalPrice = totalPrice;
            order.markModified('productDetails'); // Mark the array as modified
            const updatedOrder = await order.save();
            res.status(200).json({ success: true, order: updatedOrder });
        } else {
            res.status(404).json({ success: false, message: "Product not found in the order" });
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
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the quantity of the specified product
        if (order.productDetails && order.productDetails[productIndex]) {
            order.productDetails[productIndex].quantity = quantity;
            order.markModified('productDetails'); // Mark the array as modified
            const updatedOrder = await order.save();
            res.status(200).json({ success: true, order: updatedOrder });
        } else {
            res.status(404).json({ success: false, message: "Product not found in the order" });
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
        }).populate("customer productDetails.productID productDetails.vendor billingInformation");

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
