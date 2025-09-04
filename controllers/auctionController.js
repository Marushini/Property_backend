const Auction = require("../models/Auction");
const Property = require("../models/Property");

// Seller creates an auction
const createAuction = async (req, res) => {
  try {
    const { propertyId, startingPrice, startTime, endTime } = req.body;

    // check property exists & belongs to seller
    const property = await Property.findOne({
      _id: propertyId,
      seller: req.user._id,
      verified: true,
    });

    if (!property) {
      return res.status(400).json({ message: "Property not found or not verified" });
    }

    const auction = await Auction.create({
      property: propertyId,
      seller: req.user._id,
      startingPrice,
      currentBid: startingPrice,
      startTime,
      endTime,
    });

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all live auctions (for Buyers)
const getLiveAuctions = async (req, res) => {
  try {
    const now = new Date();
    const auctions = await Auction.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
      status: "live",
    }).populate("property").populate("seller", "name email");

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buyer places a bid
const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction) return res.status(404).json({ message: "Auction not found" });

    const now = new Date();
    if (auction.startTime > now || auction.endTime < now || auction.status !== "live") {
      return res.status(400).json({ message: "Auction is not active" });
    }

    if (amount <= auction.currentBid) {
      return res.status(400).json({ message: "Bid must be higher than current bid" });
    }

    // update auction
    auction.currentBid = amount;
    auction.highestBidder = req.user._id;
    auction.bids.push({ buyer: req.user._id, amount });

    await auction.save();

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin or system updates status manually (for testing)
const updateAuctionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuction,
  getLiveAuctions,
  placeBid,
  updateAuctionStatus,
};
