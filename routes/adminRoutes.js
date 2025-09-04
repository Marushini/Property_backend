const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  verifyProperty,
  getAllSellers,
  getAllBuyers,
} = require("../controllers/adminController");

const router = express.Router();

// Only admin
router.put("/verify-property/:id", protect, verifyProperty);
router.get("/sellers", protect, getAllSellers);
router.get("/buyers", protect, getAllBuyers);

module.exports = router;
