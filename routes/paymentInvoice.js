const express = require('express');
const { getAllPaymentInvoices, getInvoiceTotals, updateMultipleStatuses, getVendorPaymentInvoices, getVendorStatementTotals} = require('../controllers/paymentInvoice');


const router = express.Router()


router.get("/", getAllPaymentInvoices);
router.get('/totals',getInvoiceTotals);
router.get('/totals/:vendorId',getVendorStatementTotals);
router.put('/multiple', updateMultipleStatuses)
router.get("/:vendorId", getVendorPaymentInvoices)

module.exports = router;