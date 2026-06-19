const express =
  require("express");

const router =
  express.Router();

const {
  addPerformance,
  getPerformance,
  updatePerformance,
  deletePerformance
} = require(
  "../controllers/performanceController"
);

router.post(
  "/",
  addPerformance
);

router.get(
  "/",
  getPerformance
);

router.put(
  "/:id",
  updatePerformance
);

router.delete(
  "/:id",
  deletePerformance
);

module.exports =
  router;