const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the property"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["land", "house", "apartment", "rental", "lease"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
    },
    size: {
      type: Number, // in sq ft or acres
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    images: [String], // image URLs
    verified: {
      type: Boolean,
      default: false, // verified by Admin
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented", "leased"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
