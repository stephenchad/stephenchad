import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import mongoose from "mongoose";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`ℹ️  Admin already exists: ${email}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    await User.create({
      name: "Stephen Chad Ethan",
      email,
      password,
      role: "admin",
      bio: "Senior Software Engineer (Full-Stack Dev)",
      socials: {
        github: "https://github.com/stephenchad",
      },
    });

    console.log(`✅ Admin created: ${email}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seed();