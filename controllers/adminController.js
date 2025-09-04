const Property = require("../models/Property");
const Seller = require("../models/Seller");
const Buyer = require("../models/Buyer");

// Verify property
exports.verifyProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.verified = true;
    await property.save();
    res.json({ message: "Property verified", property });
  } catch (err) {
    next(err);
  }
};

// Get all sellers
exports.getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    next(err);
  }
};

// Get all buyers
exports.getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    next(err);
  }
};
