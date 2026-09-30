import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s instead of 30s
      socketTimeoutMS: 45000,
      family: 4, // force IPv4 — bypasses some DNS/IPv6 issues on Windows
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB error: ${error.message}`);
    process.exit(1);
  }
};