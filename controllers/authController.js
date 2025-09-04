const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");

// generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let Model;
    if (role === "buyer") Model = Buyer;
    else if (role === "seller") Model = Seller;
    else if (role === "admin") Model = Admin;
    else return res.status(400).json({ message: "Invalid role" });

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Model.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let Model;
    if (role === "buyer") Model = Buyer;
    else if (role === "seller") Model = Seller;
    else if (role === "admin") Model = Admin;
    else return res.status(400).json({ message: "Invalid role" });

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
