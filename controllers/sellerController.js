const Property = require("../models/Property");
const Auction = require("../models/Auction");

// Seller sees his properties
exports.getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ seller: req.user.id });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// Seller sees his auctions
exports.getMyAuctions = async (req, res, next) => {
  try {
    const auctions = await Auction.find({ seller: req.user.id })
      .populate("property highestBidder");
    res.json(auctions);
  } catch (err) {
    next(err);
  }
};
