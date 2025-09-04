const express = require("express");
const {
  createProperty,
  getProperties,
  getMyProperties,
  updateProperty,
  deleteProperty,
  verifyProperty,
  rejectProperty,
} = require("../controllers/propertyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public - anyone can view verified properties
router.get("/", getProperties);

// Seller routes
router.post("/", protect(["seller"]), createProperty);
router.get("/my", protect(["seller"]), getMyProperties);
router.put("/:id", protect(["seller"]), updateProperty);
router.delete("/:id", protect(["seller"]), deleteProperty);

// Admin routes
router.put("/:id/verify", protect(["admin"]), verifyProperty);
router.put("/:id/reject", protect(["admin"]), rejectProperty);

module.exports = router;
