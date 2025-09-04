const jwt = require("jsonwebtoken");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");

const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;
      if (decoded.role === "buyer") {
        user = await Buyer.findById(decoded.id).select("-password");
      } else if (decoded.role === "seller") {
        user = await Seller.findById(decoded.id).select("-password");
      } else if (decoded.role === "admin") {
        user = await Admin.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // role-based protection
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      req.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  };
};

module.exports = { protect };
