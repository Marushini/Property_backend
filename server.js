// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());
//app.use(mongoSanitize());
app.use(hpp());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const authRoutes = require("./routes/authRoutes");

// Routes
app.use("/api/auth", authRoutes);
const propertyRoutes = require("./routes/propertyRoutes");

// Routes
app.use("/api/properties", propertyRoutes);
const auctionRoutes = require("./routes/auctionRoutes");

// Routes
app.use("/api/auctions", auctionRoutes);
const calculatorRoutes = require("./routes/calculatorRoutes");

app.use("/api/calculators", calculatorRoutes);
const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/buyer", buyerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://property-backend-o26n.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
