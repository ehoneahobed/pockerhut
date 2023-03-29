const express = require('express');
const router = express.Router();
const vendorNotificationSettingsController = require('../controllers/notificationSetting');

router.post('/', vendorNotificationSettingsController.createVendorNotificationSetting);
router.get('/', vendorNotificationSettingsController.getVendorNotificationSettings);
router.get('/:id', vendorNotificationSettingsController.getVendorNotificationSettingById);
router.put('/:id', vendorNotificationSettingsController.updateVendorNotificationSetting);
router.delete('/:id', vendorNotificationSettingsController.deleteVendorNotificationSetting);

module.exports = router;
