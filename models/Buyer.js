const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
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
    kycVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "buyer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);
