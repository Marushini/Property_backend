const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getMyProperties,
  getMyAuctions,
} = require("../controllers/sellerController");

const router = express.Router();

router.get("/my-properties", protect, getMyProperties);
router.get("/my-auctions", protect, getMyAuctions);

module.exports = router;
