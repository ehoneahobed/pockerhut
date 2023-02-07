const express = require('express');
const router = express.Router();
const weekendKillsController = require('../controllers/weekendkills');

router.post('/createWeekendKills', weekendKillsController.createWeekendKills);
router.delete('/deleteWeekendKills/:id', weekendKillsController.deleteWeekendKills);
router.put('/updateWeekendKills/:id', weekendKillsController.updateWeekendKills);
router.get('/getWeekendKills/:id', weekendKillsController.getWeekendKills);
router.get('/getAllWeekendKills', weekendKillsController.getAllWeekendKills);

module.exports = router;
