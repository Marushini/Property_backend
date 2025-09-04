const express = require("express");
const {
  createAuction,
  getLiveAuctions,
  placeBid,
  updateAuctionStatus,
} = require("../controllers/auctionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public - view all live auctions
router.get("/live", getLiveAuctions);

// Seller - create auction
router.post("/", protect(["seller"]), createAuction);

// Buyer - place bid
router.post("/:id/bid", protect(["buyer"]), placeBid);

// Admin - manually update status
router.put("/:id/status", protect(["admin"]), updateAuctionStatus);

module.exports = router;
