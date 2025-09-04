const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAvailableProperties,
  getLiveAuctions,
  getMyBids,
} = require("../controllers/buyerController");

const router = express.Router();

router.get("/properties", protect, getAvailableProperties);
router.get("/auctions", protect, getLiveAuctions);
router.get("/my-bids", protect, getMyBids);

module.exports = router;
