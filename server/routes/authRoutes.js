const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerParent,
  registerStudent,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile
} = require("../controllers/authController");

router.post("/register-parent", registerParent);
router.post("/register-student", registerStudent);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;