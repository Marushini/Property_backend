const Property = require("../models/Property");
const Auction = require("../models/Auction");

// Buyer sees all available properties
exports.getAvailableProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ verified: true })
      .populate("seller", "name email");
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// Buyer sees live auctions
exports.getLiveAuctions = async (req, res, next) => {
  try {
    const auctions = await Auction.find({ status: "live" })
      .populate("property seller highestBidder");
    res.json(auctions);
  } catch (err) {
    next(err);
  }
};

// Buyer sees his bids
exports.getMyBids = async (req, res, next) => {
  try {
    const auctions = await Auction.find({ "bids.buyer": req.user.id })
      .populate("property seller");
    res.json(auctions);
  } catch (err) {
    next(err);
  }
};
