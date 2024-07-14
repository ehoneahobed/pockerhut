const request = require('request');

const Payment = require('../models/Payment');
const Order = require('../models/Order');
const {Product} = require('../models/Product');
const _ = require('lodash');
const { createPaymentInvoice } = require('../controllers/paymentInvoice');

const {initializePayment, verifyPayment, getBanks, getAccountDetails} = require('../utils/payment')(request);

class PaymentService{
    startPayment(data) {
        return new Promise(async (resolve, reject) => {
            try{
                const form = _.pick(data, ['amount', 'email', 'full_name', 'order_id', 'currency']);
                
                form.amount *= 100;

                form.metadata = {
                    full_name : form.full_name,
                    order: form.order_id,
                    amount: form.amount
                    }
                // form.callback_url= 'http://localhost:5000/api/pay/create';

                initializePayment(form, (error, body) => {
                if(error){
                    reject(error.message)
                }
                const response = JSON.parse(body);

                return resolve(response);

                });

            } catch(error){
                error.source = 'Start Payment Service';
                return reject(error);
            }
        })
    }

    // method for updating payment order status
    async updateOrderStatus(orderId, isPaid) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        // console.log(order)
        order.isPaid = isPaid;

        if (isPaid) {
            for (const productDetail of order.productDetails) {
                // console.log(productDetail)
                const product = await Product.findById(productDetail.productID);
                if (!product) {
                    throw new Error("Product not found");
                }

                if (productDetail.quantity > product.pricing.quantity) {
                    throw new Error("Insufficient product quantity");
                }

                product.pricing.quantity -= productDetail.quantity;
                await product.save();
            }
        }

        order.markModified('productDetails');
        return await order.save();
    }

    // createPayment(req){
    //     const ref = req.reference;
    //     console.log(req);
    //     if(ref==null){
    //         return reject({ code: 400, msg: 'No reference passed in query!' });
    //     }
    //     return new Promise(async (resolve, reject)=> {
    //         try{

    //             verifyPayment(ref, (error, body) =>{
    //                 if(error){
    //                     reject(error.message)
    //                 }
    //                 const response = JSON.parse(body);
    //                 const{ reference, amount, status} = response.data;
    //                 const{email} = response.data.customer;
    //                 const full_name = response.data.metadata.full_name;
    //                 const order = response.data.metadata.order;
    //                 const actual_amount_to_be_paid = response.data.metadata.amount;
    //                 // console.log(`full_name: ${full_name}`);
    //                 // console.log(`email: ${email}`);
    //                 // console.log(`order: ${order}`);
    //                 // console.log(`amount: ${amount}`);
    //                 // console.log(`status: ${status}`);

    //                 // check if the payment amount is the same as expected
    //                 // if (actual_amount_to_be_paid == amount)

    //                 // update the 'isPaid' status in the order record in the data to true
                    

    //                 // create the payment record in the database

    //                 const newPayment = {reference, amount, email, full_name, status, order}
    //                 const payment = Payment.create(newPayment);

    //                 return resolve(payment)
                
    //             })
    //         } catch(error){
    //             error.source = 'Create Payment Service';
    //             return reject(error)
    //         }

    //     });
    // }


    createPayment(req) {
        const ref = req.reference;
        // console.log(req);
        if(ref==null){
            throw new Error('No reference passed in query!');
        }
    
        return new Promise((resolve, reject) => {
            verifyPayment(ref, async (error, body) => {
                if (error) {
                    // console.log(error);
                    return reject(error);
                }
    
                try {
                    const response = JSON.parse(body);
                    const { reference, amount, status } = response.data;
                    const { email } = response.data.customer;
                    const full_name = response.data.metadata.full_name;
                    const order = response.data.metadata.order;
                    const actual_amount_to_be_paid = response.data.metadata.amount;
                    
                    
                    // Check if the payment amount is the same as expected
                    if (actual_amount_to_be_paid == amount.toString()) {
                        // console.log(order)
                        // console.log(actual_amount_to_be_paid)
                        // console.log(amount.toString())

                        const updatedOrder = await this.updateOrderStatus(order, true);
                        await createPaymentInvoice(order);
                        // console.log("Updated order:", updatedOrder);
                        const newPayment = { reference, amount, email, full_name, status, order: updatedOrder._id };
                        const payment = await Payment.create(newPayment);
    
                        return resolve(payment);
                    } else {
                        // console.log("not working")
                        // Handle the case where the paid amount doesn't match the expected amount
                        // You might want to reject or handle it differently
                        reject(new Error('Paid amount does not match the expected amount.'));
                    }
                } catch (innerError) {
                    return reject(innerError);
                }
            });
        });
    }
    

    paymentReciept(body){
        return new Promise(async (resolve, reject) => {
            try{
                const reference = body.reference;
                const transaction = Payment.findOne({reference: reference})
                return resolve(transaction);
            } catch(error){
                error.source = 'Payment Reciept';
                return reject(error)
            }
        })
    }

    listBanks() {
        return new Promise((resolve, reject) => {
            getBanks((error, body) => {
                if (error) {
                    reject(error.message);
                }
                const response = JSON.parse(body);
                return resolve(response.data);
            });
        });
    }

    // get user account details
    AccountDetails(accountNumber, bankCode) {
        return new Promise((resolve, reject) => {
            getAccountDetails(accountNumber, bankCode, (error, body) => {
                if (error) {
                    reject(error.message);
                }
                const response = JSON.parse(body);
                return resolve(response.data);
            });
        });
    }
}

module.exports = PaymentService