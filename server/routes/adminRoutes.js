const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getPendingParents,
  getPendingStudents,
  approveParent,
  approveStudent,
  rejectParent,
  rejectStudent,
  getApprovedUsers
} = require("../controllers/adminController");

// Check if user is Admin
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

// All admin routes are protected and require admin check
router.use(authMiddleware);
router.use(adminCheck);

router.get("/pending-parents", getPendingParents);
router.get("/pending-students", getPendingStudents);
router.put("/approve-parent/:id", approveParent);
router.put("/approve-student/:id", approveStudent);
router.delete("/reject-parent/:id", rejectParent);
router.delete("/reject-student/:id", rejectStudent);
router.get("/approved-users", getApprovedUsers);

module.exports = router;
