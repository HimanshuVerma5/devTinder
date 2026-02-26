const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://NamasteNodejs:namaste123@namastenode.od9z6bd.mongodb.net/?appName=NamasteNode");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;






