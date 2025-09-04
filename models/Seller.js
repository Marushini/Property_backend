const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your full name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    phone: {
      type: String,
    },
    businessName: {
      type: String,
    },
    kycVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "seller",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
