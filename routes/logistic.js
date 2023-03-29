const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logistic');

// Get all logistics companies
router.get('/', logisticsController.getAllLogistics);

// Get logistics company by ID
router.get('/:id', logisticsController.getLogisticsById);

// Create new logistics company
router.post('/', logisticsController.createLogistics);

// Update logistics company by ID
router.put('/:logisticsId', logisticsController.updateLogisticsById);

// Delete logistics company by ID
router.delete('/:logisticsId', logisticsController.deleteLogisticsById);

module.exports = router;
