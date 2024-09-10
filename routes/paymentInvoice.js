const express = require('express');
const { getAllPaymentInvoices, getInvoiceTotals, updateMultipleStatuses, getVendorPaymentInvoices, getVendorStatementTotals, getPaymentTracker, updateRefundOnFees} = require('../controllers/paymentInvoice');


const router = express.Router()

router.get("/", getAllPaymentInvoices);
router.get('/totals',getInvoiceTotals);
router.get('/totals/:vendorId',getVendorStatementTotals);
router.put('/multiple', updateMultipleStatuses)
router.get('/paymentTracker', getPaymentTracker);
router.get("/:vendorId", getVendorPaymentInvoices)
router.put("/refund/:id", updateRefundOnFees)

module.exports = router;