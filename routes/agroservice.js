const express = require('express');
const agroserviceController = require('../controllers/agroservice');

const router = express.Router();

router.post('/agroservice', agroserviceController.createAgroservice);
router.delete('/agroservice/:id', agroserviceController.deleteAgroservice);
router.put('/agroservice/:id', agroserviceController.updateAgroservice);
router.get('/agroservice/:id', agroserviceController.getAgroservice);
router.get('/agroservices', agroserviceController.getAllAgroservices);

module.exports = router;
