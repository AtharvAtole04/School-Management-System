const express =
  require("express");

const router =
  express.Router();

const {
  addNotice,
  getNotices,
  updateNotice,
  deleteNotice
} = require(
  "../controllers/noticeController"
);

router.post(
  "/",
  addNotice
);

router.get(
  "/",
  getNotices
);

router.put(
  "/:id",
  updateNotice
);

router.delete(
  "/:id",
  deleteNotice
);

module.exports =
  router;