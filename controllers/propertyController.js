const Property = require("../models/Property");

// Seller creates property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      seller: req.user._id, // seller comes from authMiddleware
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available properties (for Buyers)
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "available", verified: true })
      .populate("seller", "name email");
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seller gets their own properties
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update property (only seller who created it)
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id,
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin verify property
const verifyProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin reject property
const rejectProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: false, status: "rejected" },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getMyProperties,
  updateProperty,
  deleteProperty,
  verifyProperty,
  rejectProperty,
};
