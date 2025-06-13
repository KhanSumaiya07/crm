// 📁 /lib/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};
