const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Register (buyer/seller/admin)
router.post("/register", registerUser);

// Login (buyer/seller/admin)
router.post("/login", loginUser);

module.exports = router;
