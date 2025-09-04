const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/Property");
const Seller = require("./models/Seller");
const Buyer = require("./models/Buyer");
const Auction = require("./models/Auction");

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await Property.deleteMany();
    await Seller.deleteMany();
    await Buyer.deleteMany();
    await Auction.deleteMany();

    // Create sample sellers
    const seller1 = await Seller.create({ name: "Alice Seller", email: "alice@sell.com", password: "123456" });
    const seller2 = await Seller.create({ name: "Bob Seller", email: "bob@sell.com", password: "123456" });

    // Create sample buyers
    const buyer1 = await Buyer.create({ name: "Charlie Buyer", email: "charlie@buy.com", password: "123456" });
    const buyer2 = await Buyer.create({ name: "Daisy Buyer", email: "daisy@buy.com", password: "123456" });

    // Create properties
    const property1 = await Property.create({
      title: "5 Acre Farm Land",
      description: "Beautiful farmland with water access",
      type: "land",
      price: 500000,
      location: { city: "Chennai", state: "TN", country: "India" },
      size: 217800,
      seller: seller1._id,
      verified: true,
    });

    const property2 = await Property.create({
      title: "Luxury Apartment",
      description: "3BHK apartment in city center",
      type: "apartment",
      price: 7500000,
      location: { city: "Bangalore", state: "KA", country: "India" },
      size: 1800,
      seller: seller2._id,
      verified: false,
    });

    // Create an auction for property1
    await Auction.create({
      property: property1._id,
      seller: seller1._id,
      startingPrice: 400000,
      startTime: new Date(Date.now() + 1000 * 60 * 5), // starts in 5 min
      endTime: new Date(Date.now() + 1000 * 60 * 60), // ends in 1 hr
      status: "upcoming",
    });

    console.log("✅ Data Seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
