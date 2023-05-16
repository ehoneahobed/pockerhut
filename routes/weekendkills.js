const express = require("express");
const router = express.Router();
const weekendKillsController = require("../controllers/weekendkills");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");


router.post("/", weekendKillsController.createWeekendKills);
router.delete(
  "/:id", verifyTokenAndAdmin, 
  weekendKillsController.deleteWeekendKills
);
router.patch(
  "/:id", 
  weekendKillsController.updateWeekendKills
);
router.get("/:id", verifyTokenAndAdmin, weekendKillsController.getWeekendKills);
router.get("/", verifyTokenAndAdmin, weekendKillsController.getAllWeekendKills);

module.exports = router;
